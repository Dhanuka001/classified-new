import nodemailer from 'nodemailer';

const sendEmail = async (to, subject, resetHtmlContent) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>${subject}</title>
    </head>
    <body style="margin:0; padding:0; background-color:#0d0d0d; font-family: Arial, sans-serif;">
      <table align="center" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; margin: 0 auto; background-color:#1a1a1a; border-radius:8px; overflow:hidden;">
        <tr>
          <td style="padding: 20px; text-align:center; background-color: #0d0d0d;">
            <img src="http://localhost:5000/uploads/classified-03.png" alt="SriAdz" width="160" style="display: block; margin: 0 auto;" />
          </td>
        </tr>
        <tr>
          <td style="padding: 30px 20px; color: #ffffff;">
            ${resetHtmlContent}
          </td>
        </tr>
        <tr>
          <td style="padding: 20px; font-size: 12px; color: #888; text-align: center;">
            💋 Powered by <strong style="color: #ff3399;">SriAdz</strong> — All Rights Reserved © ${new Date().getFullYear()} <br/>
            <a href="http://localhost:5000/uploads/classified-03.png" style="color:#888; text-decoration:none;">Visit Site</a>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `;

    await transporter.sendMail({
      from: `"SriAdz 🔥" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log(`📧 Email sent to ${to}`);
  } catch (err) {
    console.error('❌ Email sending failed:', err.message);
  }
};

export default sendEmail;
