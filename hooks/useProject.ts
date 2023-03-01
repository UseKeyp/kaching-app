"use client";
import { useEffect, useState } from "react";
import { useQuery } from "urql";
import axios from "axios";
import { ethers } from "ethers";
const ProjectQuery = `
query MyQuery($projectId: String!) {
  project(id: $projectId) {
    id
    metadataUri
    projectId
    owner
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
  owner: string;
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
    axios
      .get(`https://ipfs.io/ipfs/${project.metadataUri}`)
      .then(async (res) => {
        setProject({
          ...res.data,
          projectId: data.project.projectId,
          id: data.project.id,
          owner: await ethers
            .getDefaultProvider()
            .lookupAddress(data.project.owner),
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
