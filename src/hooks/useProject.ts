"use client";
import { useEffect, useState } from "react";
import { useQuery } from "urql";
import axios from "axios";
const ProjectQuery = `
query MyQuery($projectId: String!) {
  project(id: $projectId) {
    id
    metadataUri
    projectId
  }
}
`;

interface IProject {
  name: string;
  id: string;
  projectId: string;
  description: string;
  metadataUri: string;
  logoUri: string;
  twitter: string;
  infoUri: string;
}

const useProject = (projectId: string) => {
  let loading = false;
  let hasError = false;
  const [result, reexecuteQuery] = useQuery({
    query: ProjectQuery,
    variables: { projectId },
  });
  const [project, setProject] = useState<IProject | undefined>(undefined);

  const { data, fetching, error } = result;

  useEffect(() => {
    if (!data) return;

    let project = data?.project;
    axios.get(`https://ipfs.io/ipfs/${project.metadataUri}`).then((res) => {
      setProject({
        ...project,
        projectId: data.project.projectId,
        id: data.project.id,
      });
    });
  }, [data]);

  if (fetching) return { loading: true };
  if (error) return { hasError: true };

  return {
    project,
    loading,
    hasError,
    reexecuteQuery,
  };
};
export default useProject;
