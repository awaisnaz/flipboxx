import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { email, body } = await request.json();

    if (!email || !body) {
      return new Response(JSON.stringify({ error: 'Email and body are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 587,
      secure: false,
      auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY
      }
    });

    const mailOptions = {
      from: process.env.SENDGRID_FROM_EMAIL,
      to: email,
      subject: 'Your Email Subject',
      text: body
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: 'Email sent successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
