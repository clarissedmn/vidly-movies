import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import Genres from "./common/genres";
import MoviesTable from "./common/moviesTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: getMovies(),
    genres: getGenres(),
    selectedGenre: { name: "all" },
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" }
  };

  handleOnClick = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleDelete = moviesId => () => {
    console.log("here", moviesId);
    const movies = this.state.movies.filter(movie => movie._id !== moviesId);
    this.setState({ movies });
  };

  handleOnPageChange = page => {
    this.setState({ currentPage: page });
  };

  handleOnGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      sortColumn,
      selectedGenre
    } = this.state;

    const filteredMovies =
      selectedGenre.name === "all"
        ? allMovies
        : allMovies.filter(
            movie => movie.genre._id === selectedGenre._id
          );

    const sorted = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filteredMovies.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies.length;
    const { pageSize, currentPage, sortColumn } = this.state;

    if (count === 0) {
      return <p>No Movies !</p>;
    }

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-2">
          <Genres
            genres={this.state.genres}
            onGenreSelect={this.handleOnGenreSelect}
            selectedItem={this.state.selectedGenre}
          />
        </div>
        <div className="col">
          <p>Showing {totalCount} movies in the database.</p>
          <MoviesTable
            movies={movies}
            onLike={this.handleOnClick}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handleOnPageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;