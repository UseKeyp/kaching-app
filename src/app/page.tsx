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
      <h1>Juicebox x Feather</h1>
    </main>
  );
}
