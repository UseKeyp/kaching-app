"use client";
import Card from "@/components/Card/Card";
import useProject from "@/hooks/useProject";

const ProjectPage = ({ params }: { params: { id: string } }) => {
  const { project } = useProject(params.id);
  console.log(project);
  return project ? <Card project={project}></Card> : <></>;
};

export default ProjectPage;
