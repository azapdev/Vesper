import { API } from '@/Interceptors';
import type { Project } from '@/Types';
import { useQuery } from '@tanstack/react-query';

const useProjects = (isEnabled: boolean) => {
  const getProjects = async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const { data } = await API.get<Project[]>('/projects');
    return data;
  };

  return useQuery({
    queryKey: ['works'],
    queryFn: getProjects,
    enabled: isEnabled,
  });
};

export default useProjects;
