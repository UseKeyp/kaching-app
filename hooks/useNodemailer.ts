const nodemailer = require("nodemailer");

/**
 * @remarks - hook creates an instance of nodemailer. https://nodemailer.com/about/. If type === 'request' and a user requests funds, this hook gets called and sends an email with parameters
 * @param amount - asset amount
 * @param asset - cryptoasset picked in AssetModal
 * @param from - email address of the user requesting funds
 * @param to - email address of user receiving request
 * @returns hook containing an instance of nodemailer
 */
const useNodeMailer = (
  amount: number | undefined,
  asset: string | undefined,
  from: string | undefined,
  to: string | undefined
) => {
  const sendMail = async () => {
    let kachingAccount = await nodemailer.createTestAccount();
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: kachingAccount.user, // generated ethereal user
        pass: kachingAccount.pass, // generated ethereal password
      },
    });

    // verify SMTP connection configuration
    transporter.verify(function (error: any, success: boolean) {
      if (error) {
        console.log(error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from, // sender address
      to, // list of receivers
      subject: `${from} is requesting ${amount} ${asset}`, // Subject line
      // text: "Hello world?", // plain text body
      html: `<p>Hi! 👋,</p><br>
            <p>${from} is requesting ${amount} ${asset} from you.</p><br>
            <p>To pay ${from}, <a href=kaching.money?from=${from}&to=${to}&amount=${amount}&asset=${asset}>CLICK HERE</a> to use Kaching to pay ${from}!</p><br>
            <p>If you've never used Kaching before, it's easy! Sign up with your Gmail or Discord accounts, get crypto into your wallet and sent!</p>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  };

  return sendMail;
};

export default useNodeMailer;
