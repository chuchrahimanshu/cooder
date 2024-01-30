// Import Section
import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";
import { APIError } from "./errorHandler.util.js";

// Setup Transporter and Handlebars to Send Email
const sendEmail = async (to, subject, template, name, link, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const handlebarOptions = {
      viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve("./src/views"),
        defaultLayout: false,
      },
      viewPath: path.resolve("./src/views"),
      extName: ".handlebars",
    };

    transporter.use("compile", hbs(handlebarOptions));

    const mail = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      template,
      context: {
        name,
        link,
        otp,
      },
    };

    transporter.sendMail(mail);
  } catch (error) {
    return new APIError(500, `Sending Email Failed!, ${error}`);
  }
};

// Export Section
export { sendEmail };
