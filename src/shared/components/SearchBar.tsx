interface Props {
  placeholder: string;
}

export const SearchBar = ({ placeholder = "Buscar" }: Props) => {
  return (
    <div className="search-container">
      <input type="text" placeholder={placeholder}></input>
      <button>Buscar</button>
    </div>
  );
};
