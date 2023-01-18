import Image from "next/image";
import styles from "./card.module.css";
import cheerio from 'cheerio'
import axios from 'axios'



export default function Card() {
  return (
    <>
      <br></br>
      <div className={styles.card}>
        <div className={styles.image}>
          <Image
            src="https://juicebox.money/assets/juiceboxdao_logo.webp"
            alt="Logo"
            width={150}
            height={150}
          />
        </div>
        <div className={styles.head}>
          <h2>JuiceboxDAO</h2>
          <br className={styles.smallbr}></br>
          <p className={styles.id}>@juicebox</p>
          <br className={styles.smallbr}></br>
          <p className={styles.description}>
            Supports projects built using the Juicebox protocol, and the
            development of the protocol itself. All projects withdrawing funds
            from their treasury pay a 2.5% membership fee and receive JBX at the
            current issuance rate. JBX members govern the NFT that represents
            ownership over this treasury.
          </p>
          <br className={styles.smallbr}></br>
          <p className={styles.owned}>
            Owned by <span>dao.jbx.eth</span>
          </p>
        </div>
      </div>

      <br></br>

      <div className={styles.row}>
        {/* <div className={styles.column}> */}
        <table className={styles.table}>
          <tbody>
            <tr className={styles.element}>
              <td>VOLUME</td>
              <td className={styles.volumeValue}>Ξ45.32</td>
            </tr>
            <tr className={styles.element}>
              <td>IN TREASURY</td>
              <td>
                Ξ1,175.2234
                <span className={styles.treasuryUSD}> US$1,842,867</span>
              </td>
            </tr>
            <tr className={styles.element}>
              <td>DISTRIBUTED</td>
              <td className={styles.distValue}>US$163,350 / US$163,350</td>
            </tr>
            <tr className={styles.element}>
              <td>IN WALLET</td>
              <td className={styles.volumeValue}>Ξ0.8239</td>
            </tr>
          </tbody>
        </table>
        {/* </div> */}
        {/* <div className={styles.column}> */}
        <div className={styles.paybox}>
          <input placeholder="0" className={styles.inputbox}></input>
          <button className={styles.paybutton}>Pay</button>
          {/* </div> */}
        </div>
      </div>
    </>
  );
}
