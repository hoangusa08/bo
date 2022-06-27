import React from "react";
import { Button } from "react-bootstrap";
import "./Search.scss";

export default function Search({ setSearch, search, handleSearch }) {
  return (
    <div className="search">
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <Button onClick={() => handleSearch(true, true)}>Tìm kiếm</Button>
    </div>
  );
}
