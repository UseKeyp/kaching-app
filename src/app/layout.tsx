"use client";
import ProjectContext, { IProjectContext } from "@/context/ProjectContext";
import { useState } from "react";
import "./globals.css";
import { Roboto_Mono as Font } from "@next/font/google";

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

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={font.className}>
        <ProjectContext.Provider
          value={{ projectId: projectId, setProjectId: setProjectId }}
        >
          {children}
        </ProjectContext.Provider>
      </body>
    </html>
  );
}
