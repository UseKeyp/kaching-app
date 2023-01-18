import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import { Roboto_Mono as Font } from "@next/font/google";
import Card from "./card";
const inter = Inter({ subsets: ["latin"] });

const font = Font({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "auto",
  subsets: ["latin"],
});
export default function Home(props: any) {

  console.log({props})
  return (
    <main className={`${styles.main} ${font.className}`}>
      <div className={styles.content}>
        <h1>🧃x🪶</h1>
        <br></br>
        <p className={styles.subtext}>
          Interact with 🧃Juicebox projects without a pre-existing wallet using
          🪶Feather
        </p>

        <div className={styles.search}>
          <input
            type="text"
            className={styles.box}
            placeholder='"https://juicebox.money/@juicebox"  or "@juicebox"'
          ></input>
          <button className={styles.gobutton}>Go</button>
        </div>

        <Card />
      </div>
    </main>
  );
}


