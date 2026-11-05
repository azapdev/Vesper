import { API } from '@/Interceptors';
import type { Project } from '@/Types';
import { useQuery } from '@tanstack/react-query';

const useProjects = () => {
  const getProjects = async () => {
    const { data } = await API.get<Project[]>('/projects');
    return data;
  };

  return useQuery({
    queryKey: ['works'],
    queryFn: getProjects,
  });
};

export default useProjects;
