import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

async function mailer(options: any) {
  let transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let html = ``;

  if (options.type === "email") {
    // html = sendEmail(options.subject, options.message);
  } else if (options.type === "email_verification") {
    let url = `${process.env.VERIFY_EMAIL_URL}/${options.token}`;
    // html = emailVerification(url);
  } else if (options.type === "verification_done") {
    // html = verificationDone();
  } else if (options.type === "recover_password") {
    let url = `${process.env.RESET_PASS_URL}/${options.token}`;
    // html = resetPass(url);
  } else {
    return false;
  }

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: options.to,
    subject: options.subject,
    html: html,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    return false;
  }
}

export default mailer;
