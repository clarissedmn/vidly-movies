import React from "react";

const Genres = props => {
  const { genres, onUpdateGenres, textProperty, valueProperty, selectedItem, onGenreSelect } = props;

  return (
    <ul className="list-group ">
      <li
        className={`list-group-item${selectedItem.name === "all" ? ' active' : ''}`}
        key="all"
        onClick={() => onUpdateGenres({ name: "all" })}

      >
        All
      </li>
      {genres.map(genre => (
        <li
        className={`list-group-item${genre === selectedItem ? ' active' : ''}`}
          key={genre[valueProperty].toString()}
          onClick={() => onUpdateGenres(genre)}
          onClick={() => onGenreSelect(genre)}
        >
          {genre.name}
        </li>
      ))}
    </ul>
  );
};

Genres.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default Genres;
