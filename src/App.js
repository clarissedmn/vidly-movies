import React from "react";
import { getMovies } from "./services/fakeMovieService";
import Pagination from "./components/common/pagination";
import { paginate } from "./utils/paginate";
import { getGenres } from "./services/fakeGenreService";
import Genres from "./components/common/genres";
import MoviesTable from "./components/common/moviesTable";
import _ from "lodash";

class Movies extends React.Component {
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
    const movies = this.state.movies.filter(movies => movies._id !== moviesId);
    this.setState({ movies });
  };

  handleOnPageChange = page => {
    this.setState({ currentPage: page });
  };

  handleOnUpdateGenres = genre => {
    this.setState({ selectedGenre: genre });
  };

  handleOnGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = path => {
    this.setState({ sortColumn: { path, order: "asc" } });
  };

  render() {
    const { length: count } = this.state.movies.length;
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      genres,
      sortColumn
    } = this.state;
    if (count === 0) {
      return <p>No Movies !</p>;
    }

    const filteredMovies =
      this.state.selectedGenre.name === "all"
        ? allMovies
        : allMovies.filter(
            movie => movie.genre._id === this.state.selectedGenre._id
          );

    const sorted = _.orderBy(filteredMovies, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-2">
          <Genres
            genres={genres}
            onUpdateGenres={this.handleOnUpdateGenres}
            onGenreSelect={this.handleOnGenreSelect}
            selectedItem={this.state.selectedGenre}
          />
        </div>
        <div className="col">
          <p>Showing {filteredMovies.length} movies in the database.</p>
          <MoviesTable
            movies={movies}
            onLike={this.handleOnClick}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={filteredMovies.length}
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
