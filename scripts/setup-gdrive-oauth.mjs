#!/usr/bin/env node

/**
 * Google Drive OAuth Setup Script
 *
 * Run this ONCE to get a refresh token for scanjunction@gmail.com.
 * The refresh token never expires (unless revoked) and will be used
 * server-side to upload files to your Google Drive.
 *
 * Prerequisites:
 *   1. Go to https://console.cloud.google.com/apis/credentials
 *   2. Create OAuth 2.0 Client ID → "Desktop application"
 *   3. Add "http://localhost" to Authorized redirect URIs
 *   4. Copy the Client ID and Client Secret
 *
 * Usage:
 *   GOOGLE_OAUTH_CLIENT_ID=xxx GOOGLE_OAUTH_CLIENT_SECRET=yyy node scripts/setup-gdrive-oauth.mjs
 */

import { google } from "googleapis";
import { createInterface } from "readline";
import { randomBytes } from "crypto";

const CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
const SCOPES = ["https://www.googleapis.com/auth/drive.file"];
const REDIRECT_URI = "urn:ietf:wg:oauth:2.0:oob";

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("❌ Missing required environment variables:");
  console.error("   GOOGLE_OAUTH_CLIENT_ID=your_client_id");
  console.error("   GOOGLE_OAUTH_CLIENT_SECRET=your_client_secret");
  process.exit(1);
}

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
);

// Generate a unique state parameter to prevent CSRF
const state = randomBytes(16).toString("hex");

const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: SCOPES,
  state,
  // Force re-consent to ensure we get a refresh token
  prompt: "consent",
});

console.log("\n" + "=".repeat(60));
console.log("  Google Drive OAuth — One-Time Setup");
console.log("=".repeat(60));
console.log("\n1. Open this URL in your browser (logged in as scanjunction@gmail.com):\n");
console.log(`   ${authUrl}\n`);
console.log("2. Grant the requested permissions.");
console.log("3. You'll see a code — copy it and paste it below.\n");

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("   Authorization code: ", async (code) => {
  try {
    const { tokens } = await oauth2Client.getToken(code.trim());

    if (tokens.refresh_token) {
      console.log("\n" + "=".repeat(60));
      console.log("  ✅ Success! Add these to your .env.local:\n");
      console.log(`  GOOGLE_OAUTH_CLIENT_ID=${CLIENT_ID}`);
      console.log(`  GOOGLE_OAUTH_CLIENT_SECRET=${CLIENT_SECRET}`);
      console.log(`  GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);
      console.log(`  GOOGLE_DRIVE_PARENT_FOLDER_ID=your_folder_id_here`);
      console.log("\n" + "-".repeat(60));
      console.log("  📁 Also make sure GOOGLE_DRIVE_PARENT_FOLDER_ID is set");
      console.log("  to the ID of the folder where uploads should go.\n");
    } else {
      console.error("\n❌ No refresh token received.");
      console.error("   This usually means the app is still in 'Testing' mode.");
      console.error("   Either:\n");
      console.error("   1. Add your email as a test user in Google Cloud Console → OAuth consent screen, OR");
      console.error("   2. Publish the app (set to 'In production')\n");
      process.exit(1);
    }
  } catch (err) {
    console.error("\n❌ Failed to exchange authorization code for tokens:", err.message);
    process.exit(1);
  }

  rl.close();
});
