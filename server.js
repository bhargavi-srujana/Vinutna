const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public")); // to serve apply.html

// Route to handle form submission
app.post("/apply", async (req, res) => {
  const { name, phone, group, email, address } = req.body;

  // Setup transporter using your Gmail
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "pithanisrujana@gmail.com",     // replace with your email
      pass: "wfbpplugwhqgugyp"         // generate from Gmail app passwords
    }
  });

  let mailOptions = {
    from:"pithanisrujana@gmail.com",
    to: "pithanisrujana@gmail.com",         // where you want to receive the info
    subject: "New Student Application",
    html: `
      <h3>New Application Details</h3>
      <p><b>Name:</b> ${name}</p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>Group:</b> ${group}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Address:</b> ${address}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Application sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send application." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
