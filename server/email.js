import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

// Configure your SMTP transporter here. Replace with real credentials.
const transporter = nodemailer.createTransport({
  host: 'smtp.example.com',
  port: 587,
  secure: false,
  auth: {
    user: 'your_email@example.com',
    pass: 'your_email_password',
  },
});

/**
 * Expected payload:
 * {
 *   email: string,               // recipient address
 *   pdfBase64: string,           // base64 string of the generated PDF
 *   invoiceData: { ... }         // optional invoice metadata for email body
 * }
 */
router.post('/send-invoice', async (req, res) => {
  const { email, pdfBase64, invoiceData } = req.body;
  if (!email || !pdfBase64) {
    return res.status(400).json({ error: 'Missing email or PDF data' });
  }

  const mailOptions = {
    from: 'your_email@example.com',
    to: email,
    subject: `Invoice ${invoiceData?.invoiceNumber || ''}`,
    text: `Dear ${invoiceData?.customerName || 'Customer'},\n\nPlease find attached your invoice.`,
    attachments: [
      {
        filename: `invoice_${invoiceData?.invoiceNumber || Date.now()}.pdf`,
        content: Buffer.from(pdfBase64, 'base64'),
        contentType: 'application/pdf',
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Invoice emailed successfully' });
  } catch (err) {
    console.error('Email send error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;


