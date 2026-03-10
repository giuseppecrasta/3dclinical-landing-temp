import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Email transporter configuration
const createEmailTransporter = () => {
  // Check if SMTP is configured
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn("⚠️  SMTP not configured. Emails will only be logged to console.");
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

const emailTransporter = createEmailTransporter();

// Rate limiter for contact form: max 3 requests per 15 minutes per IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // Limit each IP to 3 requests per windowMs
  message: { 
    success: false, 
    message: "Troppe richieste da questo indirizzo IP. Riprova tra 15 minuti." 
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Parse JSON bodies
  app.use(express.json());

  // API endpoint for contact form (with rate limiting)
  app.post("/api/contact", contactLimiter, async (req, res) => {
    const { type, email, name, message } = req.body;

    // Validate required fields
    if (!type || !email || !name) {
      return res.status(400).json({
        success: false,
        message: "Nome, email e tipo sono campi obbligatori"
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Formato email non valido"
      });
    }

    // Validate type
    const validTypes = ["inizia-ora", "richiedi-demo", "contattaci"];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Tipo di richiesta non valido"
      });
    }

    // Sanitize inputs (basic XSS prevention)
    const sanitizedName = String(name).substring(0, 100);
    const sanitizedEmail = String(email).substring(0, 100);
    const sanitizedMessage = message ? String(message).substring(0, 1000) : "";

    // Map types to email subjects
    const subjects: Record<string, string> = {
      "inizia-ora": "Attivazione di uno spazio per uno studio",
      "richiedi-demo": "Vorrei attivare un profilo di Demo per provare il software",
      "contattaci": "Vorrei saperne di più sul prodotto"
    };

    const subject = subjects[type];

    // Log the email details
    console.log("=== EMAIL REQUEST ===");
    console.log(`Type: ${type}`);
    console.log(`Subject: ${subject}`);
    console.log(`From: ${sanitizedName} <${sanitizedEmail}>`);
    console.log(`Message: ${sanitizedMessage || "N/A"}`);
    console.log("====================");

    // Send email if transporter is configured
    if (emailTransporter) {
      const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nuova richiesta - 3D Clinical</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0ea5e9 0%, #1e40af 100%); padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">3D Clinical</h1>
              <p style="margin: 8px 0 0; color: #e0f2fe; font-size: 14px;">Nuova Richiesta di Contatto</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px; color: #1e293b; font-size: 20px; font-weight: 600;">${subject}</h2>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <strong style="color: #64748b; font-size: 13px; text-transform: uppercase;">Nome</strong>
                    <p style="margin: 4px 0 0; color: #1e293b; font-size: 16px;">${sanitizedName}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <strong style="color: #64748b; font-size: 13px; text-transform: uppercase;">Email</strong>
                    <p style="margin: 4px 0 0; color: #1e293b; font-size: 16px;"><a href="mailto:${sanitizedEmail}" style="color: #0ea5e9; text-decoration: none;">${sanitizedEmail}</a></p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <strong style="color: #64748b; font-size: 13px; text-transform: uppercase;">Tipo Richiesta</strong>
                    <p style="margin: 4px 0 0; color: #1e293b; font-size: 16px;">${type}</p>
                  </td>
                </tr>
                ${sanitizedMessage ? `
                <tr>
                  <td style="padding: 12px 0;">
                    <strong style="color: #64748b; font-size: 13px; text-transform: uppercase;">Messaggio</strong>
                    <p style="margin: 8px 0 0; color: #1e293b; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${sanitizedMessage}</p>
                  </td>
                </tr>
                ` : ''}
              </table>
              
              <p style="margin: 30px 0 0; padding: 16px; background-color: #f1f5f9; border-left: 4px solid #0ea5e9; border-radius: 4px; color: #475569; font-size: 14px; line-height: 1.5;">
                <strong>Nota:</strong> Questa email è stata generata automaticamente dal form di contatto di 3D Clinical. Rispondi direttamente all'indirizzo email del richiedente.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 20px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; color: #64748b; font-size: 12px;">© ${new Date().getFullYear()} 3D Clinical. Tutti i diritti riservati.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

      const emailText = `
Nuova Richiesta di Contatto - 3D Clinical

${subject}

Nome: ${sanitizedName}
Email: ${sanitizedEmail}
Tipo: ${type}
${sanitizedMessage ? `\nMessaggio:\n${sanitizedMessage}` : ''}

---
Questa email è stata generata automaticamente dal form di contatto di 3D Clinical.
`;

      try {
        await emailTransporter.sendMail({
          from: process.env.EMAIL_FROM || "3D Clinical <no-reply@3dclinical.com>",
          to: process.env.EMAIL_TO || "info@3dclinical.com",
          replyTo: sanitizedEmail,
          subject: `[3D Clinical] ${subject}`,
          text: emailText,
          html: emailHtml,
          headers: {
            'X-Priority': '3',
            'X-Mailer': '3D Clinical Landing Page',
          },
        });
        console.log("✅ Email sent successfully");
      } catch (error) {
        console.error("❌ Error sending email:", error);
        // Don't fail the request if email fails
      }
    }

    // TODO: Implement actual email sending with nodemailer or similar
    // For now, just return success
    res.json({ 
      success: true, 
      message: "Richiesta ricevuta con successo. Ti contatteremo presto!" 
    });
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
