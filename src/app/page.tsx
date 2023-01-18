
import { Inter } from "@next/font/google";
import styles from "./page.module.css";

import Card from "@/components/Card/Card";
import SearchBox from "@/components/SearchBox/SearchBox";
import useProject from "@/hooks/useProject";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props: any) {

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <h1>🧃x🪶</h1>
        <br></br>
        <p className={styles.subtext}>
          Interact with 🧃Juicebox projects without a pre-existing wallet using
          🪶Feather
        </p>

        <SearchBox />
        {/* <Card /> */}
      </div>
    </main>
  );
}
