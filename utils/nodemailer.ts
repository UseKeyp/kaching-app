import { MailData } from "types/MailData";

/**
 *
 * @param data - object containing data to be sent in email, including username, amount, asset, and fromEmail
 * @returns
 */
export const mailData = (data: MailData) => {
  let emailUrl = `<a href=kaching.money?from=${data.fromEmail}&to=${data.username}&amount=${data.amount}&asset=${data.asset}>Click here</a>`;

  return {
    from: data.fromEmail,

    to: data.username,

    subject: `${data.fromEmail} has requested ${data.amount} ${data.asset}`,

    text: `${data.username} is requesting ${data.amount} ${data.asset} from you! ${emailUrl} to sign into Kaching and send your payments.`,

    html: `<p>Hi! 👋,</p><br>
    <p>${data.username} is requesting ${data.amount} ${data.asset} from you.</p><br>
    <p>To make your payment, ${emailUrl} to open Kaching and sign in.</p><br>
    <p>Using Kaching is simple! Sign up with your Gmail or Discord account, get crypto into your wallet and starting sending!</p>`,
  };
};
