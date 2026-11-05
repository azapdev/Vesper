import useProjects from '@/Hooks/useData';
import type { Project } from '@/Types';
import { useParams } from 'react-router-dom';
import WaitingScreen from '../loadinPage';

const WorkElementPage = () => {
  // 1. Get slug from URL
  const { slug } = useParams<{ slug: string }>();

  // 2. Get Data & Query States (isPending/isLoading)
  const { data, isPending } = useProjects();

  // 3. Show Waiting Screen while fetching data
  if (isPending) {
    return <WaitingScreen />;
  }

  // 4. Find Wanted Item after data is loaded
  const item: Project | undefined = data?.find(
    (item: Project) => item.slug === slug
  );

  // 5. If data loaded and item not found
  if (!item) {
    return (
      <div className="text-zumthor flex min-h-screen items-center justify-center bg-[#0b0c10] font-['Space_Grotesk',sans-serif]">
        <h2 className="text-xl font-bold">Item not found</h2>
      </div>
    );
  }

  // 6. Return the actual project page content
  return <div>Hello</div>;
};

export default WorkElementPage;
