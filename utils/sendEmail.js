const nodeMailer = require("nodemailer");

const sendEmail = async (to, messageContent) => {
  try {
    //create transporter
    const transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "yash07.mehta.iitm@gmail.com", //Ethereal
        pass: "qtviluqogfzhfyve",
      },
    });
    // messgae obj
    const message = {
      to,
      subject: "New Message from Node Mailer APP",
      html: `
        <h3>You have received a new message from Node Mailer APP</h3>
        <p>${messageContent}</p>
        `,
    };
    //send email
    const info = await transporter.sendMail(message);
    // console.log("Message sent:", info.messageId);
  } catch (err) {
    console.log(err);
    throw new Error("Email not sent");
  }
};

module.exports = sendEmail;
