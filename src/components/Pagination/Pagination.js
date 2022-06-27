import React from "react";
import "./Paginatiion.scss";

export default function Pagination({ data, handleSearch }) {
  return (
    <div className="previous">
      <button
        className="pre"
        disabled={data?.page === 0}
        onClick={() => handleSearch(false, false)}
      >
        Trước
      </button>
      <button
        className="pre"
        disabled={data?.page + 1 === data?.total}
        onClick={() => handleSearch(true, false)}
      >
        Sau
      </button>
      <div>
        Trang {data?.page + 1}/{data?.total}
      </div>
    </div>
  );
}
