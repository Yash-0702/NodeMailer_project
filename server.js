const express = require("express");
const sendEmail = require("./utils/sendEmail");

const app = express();
const PORT = process.env.PORT || 3000;

//set engine
app.set("view engine", "ejs");

//serve the static
app.use(express.static("public"));

//pass the data from from
app.use(express.urlencoded({ extended: true }));

//routes to render email form
app.get("/", (req, res) => {
  res.render("email-form");
});

//route to send email
app.post("/send-email", async (req, res) => {
  const { email, message } = req.body;
  try {
    await sendEmail(email, message);
    res.render("email-form", {
      status: "success",
      message: "Email sent successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).render("email-form", {
      status: "error",
      message: "Error sending email, please try again",
    });
  }
});

//start the server
app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
