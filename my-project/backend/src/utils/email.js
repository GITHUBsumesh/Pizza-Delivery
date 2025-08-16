import nodemailer from 'nodemailer';
import User from "../models/user.model.js";
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});
export const sendEmail = async (options) => {
  const mailOptions = {
    from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message.replace(/<[^>]*>/g, ''), // plain text fallback
    html: options.message, // HTML version
  };

  await transporter.sendMail(mailOptions);
};

export const sendEmailToAdmins = async (subject, html) => {
  try {
    const admins = await User.find({ role: 'admin' }).select('email -_id');
    const adminEmails = admins.map(admin => admin.email);

    if (adminEmails.length === 0) {
      console.log('No admin emails found');
      return;
    }

    const mailOptions = {
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to: adminEmails.join(', '),
      subject: subject,
      html: html,
      text: html.replace(/<[^>]*>?/gm, '')  // Fallback text version
    };

    console.log('Sending email with subject:', subject);
    await transporter.sendMail(mailOptions);
    console.log('Alert email sent successfully');

  } catch (error) {
    console.log('Error sending admin email:', error);
    throw new Error(`Failed to send admin alert: ${error.message}`);
  }
};