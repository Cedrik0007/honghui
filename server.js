const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); // serve index.html

// 📩 Email route
app.post("/send-email", async (req, res) => {
  const { name, email, phone, message } = req.body;

  // Gmail SMTP (with App Password)
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "0741sanjai@gmail.com",       // your Gmail
      pass: "rtwc cphe bdeq cirk"          // Gmail App Password
    }
  });

  let mailOptions = {
    from: `"${name}" <${email}>`,        // sender details
    to: "0741sanjai@gmail.com",           // where you want to receive emails
    subject: "New Contact Form Submission",
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong><br>${message}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send("The form has been Submitted Successfully");
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).send("❌ Failed to send message.");
  }
});

app.listen(3000, () =>
  console.log("🚀 Server running at http://localhost:3000")
);
