"use client";
import ProjectContext from "@/context/ProjectContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import styles from "./SearchBox.module.css";

const SearchBox = () => {
  const router = useRouter();
  const projectContext = useContext(ProjectContext);
  let inputProjectId = "";

  useEffect(() => {
    if (projectContext?.projectId) {
      router.push(`/project/${projectContext?.projectId}`);
    }
  }, [projectContext?.projectId]);
  
  return (
    <div className={styles.search}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          projectContext?.setProjectId(inputProjectId);
        }}
      >
        <input
          type="text"
          className={styles.box}
          placeholder='"https://juicebox.money/@juicebox"  or "@juicebox"'
          onChange={(e) => {
            inputProjectId = e.currentTarget.value;
          }}
        ></input>
      </form>
      {/* <button className={styles.gobutton}>Go</button> */}
    </div>
  );
};

export default SearchBox;
