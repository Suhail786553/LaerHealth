import nodemailer from "nodemailer";
import dbConnect from "../../utils/dbConnect";
import Invitation from "../../models/Invitation";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const { email } = req.body;

    // Generate unique token
    const inviteToken = Math.random().toString(36).substring(2, 15);

    try {
      // Store in DB
      await Invitation.create({ email, token: inviteToken });

      // Send email
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465, // Use SSL port
        secure: true, // true for 465, false for 587
        auth: {
          user: "ms5505535@gmail.com",
          pass: "gbot cdkd pvjj muho", // Use an app password
        },
      });
            
      const mailOptions = {
        from: "LaerHealth <noreply@laerhealth.com>",
        to: email,
        subject: "You're Invited!",
        html: `<p>You've been invited to join LaerHealth. Click the link to accept:</p>
               <a href="http://localhost:3000/join?token=${inviteToken}">Accept Invitation</a>`,
      };

      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Invitation sent successfully!" });

    } catch (error) {
      console.error("Error sending invite:", error);
      res.status(500).json({ error: "Failed to send invitation." });
    }
  } else {
    res.status(405).end();
  }
}
