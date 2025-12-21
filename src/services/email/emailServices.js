import { userActivationUrlEmailTemplete } from "./emailTemplates.js";
import { emailTransporter } from "./transport.js";

export const userActivationUrlEmail = async (obj) => {
  const transporter = emailTransporter();
  const info = await transporter.sendMail(userActivationUrlEmailTemplete(obj));
  console.log(info.messageId);
  return info.messageId;
};
