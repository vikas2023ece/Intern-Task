import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm, clearSearch }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Search for a product..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "10px", width: "300px" }}
      />
      <button onClick={clearSearch} style={{ marginLeft: "10px", padding: "10px" }}>
        Clear
      </button>
    </div>
  );
};

export default SearchBar;
