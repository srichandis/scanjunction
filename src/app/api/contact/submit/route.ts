import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { resend } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, service, quantity, address, message } = body;

    // Validate required fields
    if (!name || !phone || !email || !address) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const serviceList = Array.isArray(service) && service.length > 0
      ? service.join(", ")
      : "Not specified";

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
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
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📬 New Sample Request Received</h1>
            <p>ScanJunction Contact Form</p>
          </div>
          <div class="body">
            <div class="field">
              <div class="label">Name</div>
              <div class="value">${name}</div>
            </div>
            <div class="field">
              <div class="label">Phone</div>
              <div class="value"><a href="tel:${phone}" style="color:#f97316;text-decoration:none;">${phone}</a></div>
            </div>
            <div class="field">
              <div class="label">Email</div>
              <div class="value"><a href="mailto:${email}" style="color:#f97316;text-decoration:none;">${email}</a></div>
            </div>
            <div class="field">
              <div class="label">Services Requested</div>
              <div class="value">${serviceList}</div>
            </div>
            <div class="field">
              <div class="label">Estimated Quantity</div>
              <div class="value">${quantity.toLocaleString()}+ items</div>
            </div>
            <div class="field">
              <div class="label">Pickup Location</div>
              <div class="value">${address}</div>
            </div>
            ${message ? `
            <div class="field">
              <div class="label">Additional Details</div>
              <div class="value" style="white-space:pre-wrap;">${message}</div>
            </div>
            ` : ""}
          </div>
          <div class="footer">
            Sent via ScanJunction contact form &bull; Reply to reach the customer
          </div>
        </div>
      </body>
      </html>
    `;

    // Save to Neon database
    try {
      await sql`
        INSERT INTO contact_submissions (name, phone, email, service, quantity, address, message)
        VALUES (${name}, ${phone}, ${email}, ${service}, ${quantity}, ${address}, ${message})
      `;
    } catch (dbErr) {
      console.error("Database insert error:", dbErr);
      return NextResponse.json(
        { success: false, error: "Failed to save submission" },
        { status: 500 }
      );
    }

    // Send email notification
    try {
      const { error } = await resend.emails.send({
        from: "ScanJunction Website <onboarding@resend.dev>",
        to: ["scanjunction@gmail.com"],
        subject: `📬 New Sample Request from ${name} — ${serviceList}`,
        html: emailHtml,
        replyTo: email,
      });

      if (error) {
        console.error("Email send error:", error);
      }
    } catch (emailErr) {
      console.error("Email send error:", emailErr);
      // Email failure is non-blocking — data is already saved
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form API error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to process submission" },
      { status: 500 }
    );
  }
}
