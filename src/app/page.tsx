import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import { Roboto_Mono as Font } from "@next/font/google";
const inter = Inter({ subsets: ["latin"] });

const font = Font({
  weight: ["400", "500", "700", "600"],
  display: "auto",
  subsets: ["latin"],
});
export default function Home() {
  return (
    <main className={`${styles.main} ${font.className}`}>
      <div className={styles.content}>
        <h1>🧃x🪶</h1>
        <br></br>
        <p className={`${styles.subtext}`}>
          Interact with 🧃Juicebox projects without a pre-existing wallet
          using 🪶Feather
        </p>

        <input
          type="text"
          className={`${styles.box}`}
          placeholder='"https://juicebox.money/@juicebox"  or "@juicebox"'
        ></input>
      </div>
    </main>
  );
}
