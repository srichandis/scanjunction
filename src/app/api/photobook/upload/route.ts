import { NextRequest, NextResponse } from "next/server";
import { createUploadFolder, uploadFileToFolder } from "@/lib/google-drive";
import { resend } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get("name") as string | null;
    const email = formData.get("email") as string | null;
    const phone = formData.get("phone") as string | null;
    const files = formData.getAll("photos") as File[];

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: "Name, email, and phone are required" },
        { status: 400 }
      );
    }

    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, error: "At least one photo is required" },
        { status: 400 }
      );
    }

    // Validate file types (images only)
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/heic",
      "image/heif",
      "image/tiff",
      "image/bmp",
    ];

    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          {
            success: false,
            error: `Unsupported file type: ${file.type}. Only images are allowed.`,
          },
          { status: 400 }
        );
      }
    }

    // Validate file size (max 50MB per file)
    const maxSize = 50 * 1024 * 1024;
    for (const file of files) {
      if (file.size > maxSize) {
        return NextResponse.json(
          {
            success: false,
            error: `File "${file.name}" exceeds the 50MB size limit.`,
          },
          { status: 400 }
        );
      }
    }

    // Create a folder in Google Drive for this upload
    const sanitizedName = name.replace(/[^a-zA-Z0-9\s-]/g, "").trim();
    const folderId = await createUploadFolder(sanitizedName, email, phone);

    // Upload each file to the folder
    const uploadResults: { fileName: string; success: boolean; error?: string }[] = [];
    for (const file of files) {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const fileId = await uploadFileToFolder(
          folderId,
          file.name,
          file.type,
          buffer
        );
        uploadResults.push({ fileName: file.name, success: true });
        console.log(`✅ Uploaded ${file.name} → ${fileId}`);
      } catch (uploadErr) {
        const errorMsg =
          uploadErr instanceof Error
            ? `${uploadErr.name}: ${uploadErr.message}`
            : String(uploadErr);
        console.error(`❌ Failed to upload ${file.name}:`, errorMsg);
        uploadResults.push({ fileName: file.name, success: false, error: errorMsg });
      }
    }

    const successCount = uploadResults.filter((r) => r.success).length;
    const failCount = uploadResults.filter((r) => !r.success).length;

    // If ALL files failed, return a 500 so the frontend shows the error state
    if (successCount === 0) {
      const errors = uploadResults.map((r) => r.error).filter(Boolean).join("; ");
      return NextResponse.json(
        {
          success: false,
          error: `Failed to upload any files. ${errors ? `Errors: ${errors}` : "Check server logs for details."}`,
          uploadResults,
        },
        { status: 500 }
      );
    }

    // Send email notification to scanjunction@gmail.com
    try {
      const fileListHtml = uploadResults
        .map(
          (r) =>
            `<li style="color:${r.success ? "#22c55e" : "#ef4444"}">${r.fileName} — ${r.success ? "✅ Uploaded" : "❌ Failed"}</li>`
        )
        .join("");

      await resend.emails.send({
        from: "ScanJunction Website <onboarding@resend.dev>",
        to: ["scanjunction@gmail.com"],
        subject: `📸 PhotoBook Upload from ${name} — ${successCount} photos`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8f9fa; margin: 0; padding: 24px; }
              .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
              .header { background: linear-gradient(135deg, #0f2e3d, #1a4a5e); padding: 32px 24px; text-align: center; }
              .header h1 { color: #ffffff; margin: 0; font-size: 22px; }
              .header p { color: #f97316; margin: 8px 0 0; font-size: 14px; }
              .body { padding: 24px; }
              .field { margin-bottom: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 12px; }
              .field:last-child { border-bottom: none; }
              .label { font-size: 11px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
              .value { font-size: 15px; color: #1e293b; font-weight: 500; }
              .footer { background: #f1f5f9; padding: 16px 24px; text-align: center; font-size: 12px; color: #94a3b8; }
              ul { padding-left: 20px; }
              li { margin-bottom: 4px; font-size: 13px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📸 New PhotoBook Upload Received</h1>
                <p>${successCount} photos uploaded successfully</p>
              </div>
              <div class="body">
                <div class="field">
                  <div class="label">Name</div>
                  <div class="value">${name}</div>
                </div>
                <div class="field">
                  <div class="label">Email</div>
                  <div class="value"><a href="mailto:${email}" style="color:#f97316;text-decoration:none;">${email}</a></div>
                </div>
                <div class="field">
                  <div class="label">Phone</div>
                  <div class="value"><a href="tel:${phone}" style="color:#f97316;text-decoration:none;">${phone}</a></div>
                </div>
                <div class="field">
                  <div class="label">Files Uploaded (${files.length})</div>
                  <ul>${fileListHtml}</ul>
                </div>
              </div>
              <div class="footer">
                Sent via ScanJunction PhotoBook Upload &bull; Files stored in Google Drive
              </div>
            </div>
          </body>
          </html>
        `,
        replyTo: email,
      });
    } catch (emailErr) {
      console.error("Email notification error:", emailErr);
      // Email failure is non-blocking
    }

    return NextResponse.json({
      success: true,
      message: `${successCount} of ${files.length} photos uploaded successfully.`,
      folderId,
      uploadResults,
    });
  } catch (err) {
    console.error("PhotoBook upload API error:", err);
    const errorMessage =
      err instanceof Error ? err.message : "Failed to process upload";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
