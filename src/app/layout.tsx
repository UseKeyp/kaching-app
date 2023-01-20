"use client";
import ProjectContext, { IProjectContext } from "@/context/ProjectContext";
import { useState } from "react";
import "./globals.css";
import { Roboto_Mono as Font } from "@next/font/google";
import { createClient, Provider } from "urql";

const font = Font({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "auto",
  subsets: ["latin"],
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [projectId, setProjectId] = useState<string | undefined>(undefined);
  const urqlClient = createClient({
    url: "https://api.thegraph.com/subgraphs/id/QmSL5i1EsqJgc6kys7Ckzh3PHDbyUoKbyG5ibtFSAsgvFV",
  });
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <main className={font.className}>
          <Provider value={urqlClient}>
            <ProjectContext.Provider
              value={{ projectId: projectId, setProjectId: setProjectId }}
            >
              {children}
            </ProjectContext.Provider>
          </Provider>
        </main>
      </body>
    </html>
  );
}
