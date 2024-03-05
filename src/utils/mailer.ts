import * as nodemailer from "nodemailer";
import { config } from "../config/config";

class MailService {
  transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: +config.smtp.port,
      secure: false,
      auth: {
        user: config.smtp.user,
        pass: config.smtp.pass,
      },
    });
  }

  async sendHtml(to: string, html: string) {
    await this.transporter.sendMail({
      from: config.smtp.user,
      to,
      subject: `Your digital receipt`,
      text: "",
      html,
    });
  }
}

export default new MailService();
