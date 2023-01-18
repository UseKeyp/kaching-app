"use client";
import useProject from "@/hooks/useProject";


const ProjectPage = ({ params }: { params: { id: string } }) => {
  const {project} = useProject("1-1");
  return (
    <div>
      <h1> {params.id}</h1>
    </div>
  );
};

export default ProjectPage;
