const ProjectPage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <h1> {params.id}</h1>
    </div>
  );
};

export default ProjectPage;
