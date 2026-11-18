import { useQuery } from '@tanstack/react-query';

const useData = (endpoint: string, enabled = true) => {
  const getData = async () => {
    //============================>>>>>>> When REAL API IS EXSIED!

    // try {
    //   if (import.meta.env.DEV) {
    //     const res = await API.get(`/${endpoint}`);
    //     return res.data;
    //   }
    // } catch (error) {
    //   console.warn(
    //     'Backend server not running, falling back to static db.json'
    //   );
    // }

    //=============================================================

    const res = await fetch('/data/db.json');
    const data = await res.json();
    return data[endpoint];
  };

  return useQuery({
    queryKey: [endpoint],
    queryFn: getData,
    enabled: enabled,
  });
};

export default useData;
