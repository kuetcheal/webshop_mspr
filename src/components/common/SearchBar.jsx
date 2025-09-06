import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ withIcon = false, placeholder = "Recherche..." }) {
  return (
    <div className={`search-wrap ${withIcon ? "with-icon" : ""}`}>
      {withIcon && <SearchIcon className="search-icon" fontSize="small" />}
      <input
        type="text"
        placeholder={placeholder}
        className="search-input"
      />
    </div>
  );
}
