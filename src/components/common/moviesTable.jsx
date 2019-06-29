import React from 'react';
import Like from "./like";

const MoviesTable = (props) => {
    const { movies, onDelete, onLike, onSort } = props;

    return ( 
        <table className="table">
        <thead>
          <tr>
            <th onClick={() => onSort('title')} scope="col">Titre</th>
            <th onClick={() => onSort('genre.name')} scope="col">Genre</th>
            <th onClick={() => onSort('numberInStock')} scope="col">Stock</th>
            <th onClick={() => onSort('dailyRentalRate')} scope="col">Rate</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {movies.map((movie, index) => (
            <tr key={index}>
              <th scope="row">{movie.title}</th>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Like
                  liked={movie.liked}
                  onClick={() => onLike(movie)}
                />
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger btn-sm "
                  onClick={onDelete(movie)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     );
}
 
export default MoviesTable;
