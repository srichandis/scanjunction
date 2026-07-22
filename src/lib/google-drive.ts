import { google } from "googleapis";
import { PassThrough } from "stream";

const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

const COMMON_PARAMS = {
  supportsAllDrives: true,
} as const;

function getAuth() {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error(
      "Missing one or more Google OAuth environment variables:\n" +
        "  GOOGLE_OAUTH_CLIENT_ID\n" +
        "  GOOGLE_OAUTH_CLIENT_SECRET\n" +
        "  GOOGLE_REFRESH_TOKEN\n" +
        "Run `node scripts/setup-gdrive-oauth.mjs` to generate these."
    );
  }

  const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    "urn:ietf:wg:oauth:2.0:oob"
  );

  oauth2Client.setCredentials({
    refresh_token: refreshToken,
  });

  return oauth2Client;
}

function getDriveClient() {
  const auth = getAuth();
  return google.drive({ version: "v3", auth });
}

/**
 * Creates a folder inside the parent folder for a given upload session.
 * Returns the folder ID.
 */
export async function createUploadFolder(
  name: string,
  email: string,
  phone: string
): Promise<string> {
  const drive = getDriveClient();
  const parentFolderId = process.env.GOOGLE_DRIVE_PARENT_FOLDER_ID;
  if (!parentFolderId) {
    throw new Error("Missing GOOGLE_DRIVE_PARENT_FOLDER_ID environment variable");
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const folderName = `PhotoBook Upload — ${name} — ${timestamp}`;

  const response = await drive.files.create({
    requestBody: {
      name: folderName,
      mimeType: "application/vnd.google-apps.folder",
      parents: [parentFolderId],
      description: `Uploaded by ${name} (${email}, ${phone})`,
    },
    fields: "id",
    ...COMMON_PARAMS,
  });

  if (!response.data.id) {
    throw new Error("Failed to create Google Drive folder");
  }

  return response.data.id;
}

/**
 * Uploads a single file buffer to the given folder.
 * Returns the file ID on success.
 */
export async function uploadFileToFolder(
  folderId: string,
  fileName: string,
  mimeType: string,
  buffer: Buffer
): Promise<string> {
  const drive = getDriveClient();

  const readable = new PassThrough();
  readable.end(buffer);

  const response = await drive.files.create({
    requestBody: {
      name: fileName,
      parents: [folderId],
    },
    media: {
      mimeType,
      body: readable,
    },
    fields: "id",
    ...COMMON_PARAMS,
  });

  if (!response.data.id) {
    throw new Error(`Google Drive returned no ID for file: ${fileName}`);
  }

  return response.data.id;
}
