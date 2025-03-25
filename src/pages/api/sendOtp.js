import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: "Method not allowed" });

  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP

  // Configure nodemailer
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "ms5505535@gmail.com",
      pass: "gbot cdkd pvjj muho",
    },
  });

  // Send email
  try {
    await transporter.sendMail({
      from: "ms5505535@gmail.com",
      to: email,
      subject: "Your OTP for Signup",
      text: `Your OTP is: ${otp}. It will expire in 5 minutes.`,
    });
    
    res.status(200).json({ message: "OTP sent successfully", otp });
  } catch (error) {
    res.status(500).json({ message: "Error sending OTP", error: error.message });
  }
}
