type Props = {
  title: string;
};
const Title = ({ title }: Props) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="bg-cornflower-blue h-2 w-2 shrink-0 rounded-full shadow-[0_0_10px_#6390ff]" />
      <p className="text-xs font-bold tracking-[0.2em] text-white sm:text-sm md:text-base">
        {title}
      </p>
    </div>
  );
};

export default Title;
