const dotenv =require('dotenv');
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5353;
const mail=process.env.EMAIL;
const pass=process.env.PASS;
console.log("PORT from env:", process.env.PORT);


// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public")); 

app.post("/apply", async (req, res) => {
  const { name, phone, group, email, address } = req.body;

  // Setup transporter using your Gmail
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `${mail}`,    
      pass: `${pass}`         
    }
  });

  let mailOptions = {
    from: `${mail}`,
    to:  `${mail}`,         
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
