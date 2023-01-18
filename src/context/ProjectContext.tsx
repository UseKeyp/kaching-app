import { createContext } from "react";

const ProjectContext = createContext<IProjectContext | undefined>(undefined);

export interface IProjectContext {
  projectId: string | undefined;
  setProjectId: (projectId: string | undefined) => void;
}
export default ProjectContext;
