const SearchOptionButton = ({
  icon,
  text,
  isActive,
}: {
  icon: string;
  text: string;
  isActive: boolean;
}) => {
  return (
    <div
      className={`w-full flex items-center justify-center gap-2 p-2 rounded-md cursor-pointer ${
        isActive ? "bg-background border-2 border-border-muted" : "bg-background-light"
      }`}
    >
      <img src={icon} alt={text} className="w-6 h-6" />
      <span className="text-lg font-bold">{text}</span>
    </div>
  );
};

export default SearchOptionButton;
