import { useState } from "react";


function MovieItem({ movie, onDelete }) {
  return (
      <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "12px",
            marginBottom: "10px",
            backgroundColor: "#f9f9f9",
          }}
      >
        <h3 style={{ margin: "0 0 5px 0" }}>{movie.title}</h3>
        <p style={{ margin: "0 0 5px 0" }}>
          <strong>Rating:</strong> {"⭐".repeat(movie.rating)} ({movie.rating}/5)
        </p>
        <p style={{ margin: "0 0 10px 0" }}>
          <strong>Review:</strong> {movie.comment}
        </p>
        <button
            onClick={() => onDelete(movie.id)}
            style={{
              backgroundColor: "#ff4d4d",
              color: "white",
              border: "none",
              padding: "5px 10px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
        >
          Remove
        </button>
      </div>
  );
}

export default function App() {
  // State for the list of movies
  const [movies, setMovies] = useState([]);

  // Controlled states for input fields
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  // Function to handle adding a new movie
  function handleAddMovie(e) {
    e.preventDefault(); // Prevents page reload on form submit

    if (!title.trim() || !comment.trim()) {
      alert("Please provide both a movie title and a review comment.");
      return;
    }

    const newMovie = {
      id: Date.now(), // Unique ID using timestamp
      title: title,
      comment: comment,
      rating: Number(rating),
    };

    // Add new movie to the array and reset inputs
    setMovies([...movies, newMovie]);
    setTitle("");
    setComment("");
    setRating(5);
  }

  // Function to delete a movie by its id
  function handleDeleteMovie(idToDelete) {
    setMovies(movies.filter((movie) => movie.id !== idToDelete));
  }

  return (
      <div
          style={{
            maxWidth: "500px",
            margin: "30px auto",
            fontFamily: "Arial, sans-serif",
            padding: "20px",
          }}
      >
        <h2>🎬 Movie Watchlist</h2>

        {/* Form to Add Movie */}
        <form
            onSubmit={handleAddMovie}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginBottom: "25px",
            }}
        >
          <input
              type="text"
              placeholder="Movie Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ padding: "8px", fontSize: "14px" }}
          />

          <textarea
              placeholder="Review / Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="3"
              style={{ padding: "8px", fontSize: "14px" }}
          />

          <label style={{ fontSize: "14px" }}>
            Stars Rating:{" "}
            <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                style={{ padding: "5px" }}
            >
              <option value="1">1 Star</option>
              <option value="2">2 Stars</option>
              <option value="3">3 Stars</option>
              <option value="4">4 Stars</option>
              <option value="5">5 Stars</option>
            </select>
          </label>

          <button
              type="submit"
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
                padding: "10px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
          >
            Add Movie
          </button>
        </form>

        {/* Movie List Display */}
        <div>
          {movies.length === 0 ? (
              <p style={{ color: "#777" }}>No movies added yet. Add one above!</p>
          ) : (
              movies.map((movie) => (
                  <MovieItem
                      key={movie.id}
                      movie={movie}
                      onDelete={handleDeleteMovie}
                  />
              ))
          )}
        </div>
      </div>
  );
}