// Import Section
import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";
import { ErrorHandler } from "./errorHandler.util";

// Setup Transporter and Handlebars to Send Email
const sendEmail = async (from, to, subject, template, name, link) => {
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
        partialsDir: path.resolve("./views"),
        defaultLayout: false,
      },
      viewPath: path.resolve("./views"),
      extName: ".handlebars",
    };

    transporter.use("compile", hbs(handlebarOptions));

    const mail = {
      from,
      to,
      subject,
      template,
      context: {
        name,
        link,
      },
    };

    transporter.sendMail(mail);
  } catch (error) {
    return new ErrorHandler(
      500,
      `ERROR | emailHandler | ${error}`,
      "Sending Email Failed!"
    );
  }
};

// Export Section
export { sendEmail };
