import '../SearchBox/SearchBox.module.css';

interface SearchBoxProps {
  value: string;
  onSearch: (value: string) => void;
}

export default function SearchBox({
  value,
  onSearch,
}: SearchBoxProps) {
  return (
    <input
      type="text"
      value={value}
      placeholder="Search notes"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}