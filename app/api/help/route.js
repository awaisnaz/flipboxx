import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, description, captcha } = req.body;

    // CAPTCHA validation
    if (captcha !== '5') {
      return res.status(400).json({ message: 'Captcha validation failed.' });
    }

    // Input validation
    if (!email || !description) {
      return res.status(400).json({ message: 'Email and description are required.' });
    }

    try {
      // Create transporter for sending email
      const transporter = nodemailer.createTransport({
        service: 'Gmail', // Change this if you're using a different service
        auth: {
          user: process.env.EMAIL_USER, // Your email address
          pass: process.env.EMAIL_PASS, // Your email password or app password
        },
      });

      // Email options
      const mailOptions = {
        from: email, // Sender email
        to: process.env.EMAIL_RECEIVER, // Your email to receive the help request
        subject: 'Help Request',
        text: `You have received a help request from ${email}.

Description:
${description}`,
      };

      // Send email
      await transporter.sendMail(mailOptions);

      return res.status(200).json({ message: 'Your request has been submitted successfully.' });
    } catch (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: 'An error occurred while sending your request.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} not allowed.` });
  }
}
