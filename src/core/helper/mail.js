import nodemailer from "nodemailer";
import config from "../../../config/config";
import logs from "./logger";
const transporter = nodemailer.createTransport({
  service: config.MAIL_SERVICE,
  host: config.MAIL_HOST,
  port: config.MAIL_PORT,
  secure: false,
  auth: {
    user: config.MAIL_EMAIL,
    pass: config.MAIL_PASSWORD,
  },
});

const sendMail = async (subject, text, htmlBody, toSend) => {
  try {
    const info = await transporter.sendMail({
      from: config.EMAIL_FROM,
      to: toSend,
      subject: subject,
      text: text,
      html: htmlBody,
    });
    transporter.sendMail(info, (error, response) => {
      if (error) {
        console.log(logs.mailLogs().reject);
      }
      console.log(logs.mailLogs().success);
    });
  } catch (error) {
    console.log(error);
    console.log(logs.mailLogs().reject);
  }
};
const successSignUpText = (name) => {
  return `Welcome to 55 chitchat family ${name} get ready for unlimited fun fiesta !!`;
};
export default sendMail;
export { successSignUpText };
