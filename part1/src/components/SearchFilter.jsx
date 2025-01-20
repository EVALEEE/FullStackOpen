import React from 'react'

const SearchFilter = ({ search, handleSearchChange, searchTarget, setSearch, setResult }) => {
    const clearSearch = () => {
        setSearch('');
        setResult([]);
      };
    return (
        <form onSubmit={searchTarget}>
            <div>
                filter shown with: <input value={search} onChange={handleSearchChange} />
            </div>
            <div>
                <button type="button" onClick={clearSearch}>clear</button>
            </div>
            <div>
                <button type="submit">search</button>
            </div>
        </form>
    )
}

export default SearchFilter