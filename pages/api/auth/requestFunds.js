import { mailOptions, transporter } from "../../../utils/nodemailer";

const requestFunds = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    const errorMsg = res.status(400).json({ message: "Bad request" });

    if (!data.ammount || !data.asset || !data.fromAddress || !data.username) {
      return errorMsg;
    }

    // start email content
    const subject = `${data.fromEmail} has requested ${data.amount} ${data.asset}`;

    const emailUrl = `<a href=kaching.money?from=${data.fromEmail}&to=${data.username}&amount=${data.amount}&asset=${data.asset}>Click here</a>`;

    const text = `${data.username} is requesting ${data.amount} ${data.asset} from you! ${emailUrl} to sign into Kaching and send your payments.`;

    const html = `<p>Hi! 👋,</p><br>
    <p>${data.username} is requesting ${data.amount} ${data.asset} from you.</p><br>
    <p>To make your payment, ${emailUrl} to open Kaching and sign in.</p><br>
    <p>Using Kaching is simple! Sign up with your Gmail or Discord account, get crypto into your wallet and starting sending!</p>`;
    // end email content

    try {
      await transporter.sendMail({
        ...mailOptions,
        to: data.username,
        subject,
        text,
        html,
      });

      return res.status(200).json({ success: true });
    } catch (err) {
      console.log(err);
      return errorMsg;
    }
  }
  return errorMsg;
};

export default requestFunds;
