import Image from "next/image";
import styles from "./Card.module.css";




export default function Card({project} : {project:any} ) {
  return (
    <center className={styles.project}>
      <br></br>
      <div className={styles.card}>
        <div className={styles.image}>
          <Image
            src={project ? project.logoUri : ""}
            alt="Logo"
            width={150}
            height={150}
          />
        </div>
        <div className={styles.head}>
          <h2>{project?.name}</h2>
          <br className={styles.smallbr}></br>
          <p className={styles.id}>@{project?.id}</p>
          <br className={styles.smallbr}></br>
          <p className={styles.description}>{project?.description}</p>
          <br className={styles.smallbr}></br>
          <p className={styles.owned}>
            Owned by <span>{project?.owner}</span>
          </p>
        </div>
      </div>

      <br></br>

      <div className={styles.row}>
        <div className={styles.paybox}>
          <input placeholder="0" className={styles.inputbox}></input>
          <button className={styles.paybutton}>Pay</button>
        </div>
      </div>
    </center>
  );
}
