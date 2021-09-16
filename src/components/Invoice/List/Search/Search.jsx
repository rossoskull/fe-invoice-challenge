import './Search.scss'

const Search = ({ setSearchStr }) => {

  return (
    <div className="search">
      <img
        src="/assets/search-icon@2x.png"
        alt="Search"
        className="search__icon"
      />
      <input
        className="search__field"
        type="text"
        placeholder="Search"
        onChange={(e) => setSearchStr(e.target.value)}
      />
    </div>
  )
}

export default Search