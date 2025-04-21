import React from "react";

function Tile({ tile, index, onClick }) {
  return (
    <div
      className={`column is-4 has-text-centered ${
        tile ? "has-background-primary" : "has-background-light"
      }`}
      style={{
        height: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: tile ? "pointer" : "default",
      }}
      onClick={() => tile && onClick(index)}
    >
      {tile}
    </div>
  );
}

export default Tile;