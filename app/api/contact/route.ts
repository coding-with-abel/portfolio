import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  const { name, email, projectType, message } = await req.json()

  if (!name || !email || !projectType || !message) {
    return Response.json({ error: 'Missing fields' }, { status: 400 })
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: 'olanrewajuoluwafikunayomi@gmail.com',
      replyTo: email,
      subject: `New contact: ${projectType}`,
      html: `
        <h2>New Contact Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Project Type:</strong> ${projectType}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    })

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'We received your message',
      html: `<h2>Thanks for reaching out, ${name}!</h2><p>We'll get back to you soon.</p>`,
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error('Error:', error)
    return Response.json({ error: 'Failed to send' }, { status: 500 })
  }
}