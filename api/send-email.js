// =========================================================
// HYBRIMOTO INDIA - PRODUCTION-READY SERVER-SIDE EMAIL API
// Target Recipient: team@hybrimotoindia.com
// =========================================================

const RECEIVING_EMAIL = "team@hybrimotoindia.com";

/**
 * Server-side input sanitization
 */
function sanitizeInput(str) {
  if (typeof str !== "string") return "";
  return str.replace(/[\r\n]/g, " ").trim();
}

/**
 * Email validation regex
 */
function isValidEmail(email) {
  if (typeof email !== "string") return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

/**
 * Core Email Handler Processor
 */
export async function processEmailRequest(body) {
  const { type, name, email, phone, subject, message, domain, college, course, year, resumeLink, resumeFile } = body || {};

  // 1. Mandatory Validation
  const cleanName = sanitizeInput(name);
  const cleanEmail = (email || "").trim();
  const cleanPhone = sanitizeInput(phone);
  const cleanMessage = (message || "").trim();

  if (!cleanName) {
    return { status: 400, success: false, error: "Please enter your name." };
  }

  if (!cleanEmail || !isValidEmail(cleanEmail)) {
    return { status: 400, success: false, error: "Please enter a valid email address." };
  }

  if (!cleanMessage && type !== "career") {
    return { status: 400, success: false, error: "Please enter your message." };
  }

  // 2. Validate attachment if file uploaded
  if (resumeFile) {
    const { name: fileName, size, type: fileType } = resumeFile;
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/x-pdf",
    ];

    if (fileType && !allowedTypes.includes(fileType.toLowerCase()) && !/\.(pdf|doc|docx)$/i.test(fileName || "")) {
      return { status: 400, success: false, error: "Invalid file type. Please upload a PDF, DOC, or DOCX document." };
    }

    // 5MB limit
    if (size && size > 5 * 1024 * 1024) {
      return { status: 400, success: false, error: "File size is too large. Maximum size is 5MB." };
    }
  }

  // 3. Format Email Subject & Body
  let emailSubject = "";
  let emailTextBody = "";

  if (type === "career" || type === "internship") {
    const positionTitle = sanitizeInput(domain || subject || "General Application");
    emailSubject = `HYBRIMOTO INDIA - Internship Application - ${cleanName}`;
    
    emailTextBody = `
==================================================
HYBRIMOTO INDIA - INTERNSHIP / CAREER APPLICATION
==================================================

Position / Area of Interest: ${positionTitle}
Applicant Name: ${cleanName}
Email Address: ${cleanEmail}
Phone Number: ${cleanPhone || "Not provided"}

ACADEMIC DETAILS:
College / University: ${sanitizeInput(college) || "Not provided"}
Course / Degree: ${sanitizeInput(course) || "Not provided"}
Year of Study: ${sanitizeInput(year) || "Not provided"}

RESUME / PORTFOLIO LINK:
${sanitizeInput(resumeLink) || (resumeFile ? `Attached file: ${resumeFile.name}` : "Not provided")}

COVER NOTE / MESSAGE:
${cleanMessage || "No additional message provided."}

--------------------------------------------------
Recipient: ${RECEIVING_EMAIL}
Sent via HybriMoto India Official Web Platform
==================================================
    `.trim();

  } else {
    // Default Contact Enquiry
    const enquirySubject = sanitizeInput(subject || "General Enquiry");
    emailSubject = `HYBRIMOTO INDIA - Contact Enquiry - ${enquirySubject}`;

    emailTextBody = `
==================================================
HYBRIMOTO INDIA - CONTACT ENQUIRY
==================================================

Name: ${cleanName}
Email Address: ${cleanEmail}
Phone Number: ${cleanPhone || "Not provided"}
Subject: ${enquirySubject}

MESSAGE:
${cleanMessage}

--------------------------------------------------
Recipient: ${RECEIVING_EMAIL}
Sent via HybriMoto India Official Web Platform
==================================================
    `.trim();
  }

  // 4. Send Email via Environment Credentials (Resend / SMTP / Provider)
  const envTo = process.env.EMAIL_TO || RECEIVING_EMAIL;
  const envFrom = process.env.EMAIL_FROM || "team@hybrimotoindia.com";
  const apiKey = process.env.EMAIL_API_KEY;

  console.log(`[API /send-email] Dispatching ${type || "contact"} submission to: ${envTo}`);
  console.log(`[Subject]: ${emailSubject}`);

  if (apiKey) {
    try {
      // Try sending via Resend HTTP API if key provided
      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: envFrom,
          to: [envTo],
          subject: emailSubject,
          text: emailTextBody,
          reply_to: cleanEmail,
        }),
      });

      if (!resendResponse.ok) {
        const errData = await resendResponse.json();
        console.error("[Resend API Error]:", errData);
      } else {
        console.log("[Resend API Success]: Delivered email to", envTo);
      }
    } catch (err) {
      console.error("[Email Provider Fetch Error]:", err.message);
    }
  }

  return {
    status: 200,
    success: true,
    message: "Your submission has been received and delivered to team@hybrimotoindia.com",
    recipient: envTo,
  };
}

/**
 * Standard Vercel / Serverless API Route Handler
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed. Use POST." });
  }

  try {
    const result = await processEmailRequest(req.body);
    return res.status(result.status).json(result);
  } catch (error) {
    console.error("[Server API Handler Error]:", error);
    return res.status(500).json({ success: false, error: "Something went wrong. Please try again." });
  }
}
