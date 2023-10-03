import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Modal from 'react-modal'
import './App.css'

// Custom style for modal
const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darkened background
  },
  content: {
    position: 'absolute',
    top: '10%',
    left: '10%',
    right: '10%',
    bottom: '10%',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px',
  },
};

function MovieList() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Time duration for loading movies
  }, [])


  useEffect(() => {
    axios
      .get('https://api.themoviedb.org/3/movie/now_playing?api_key=875bb04b769cd254a5cd16ded8babc13&appens_to_respose=videos')
      .then(response => {
        setMovies(response.data.results)
      })
  }, [])

  if (isLoading) {
    return (
      <div style={{ flex: 1, padding: 20 }}>
        <p>Loading, please wait...</p>
      </div>
    );
  }

  else if (movies.length === 0) {
    return (
      <div style={{ flex: 1, padding: 20 }}>
        <p>Can't laod any movies</p>
      </div>
    );
  }

  else {
    const movieItems = movies.map((movie, index) =>
      <MovieListItem key={index} movie={movie} />
    );

    return (
      <div style={{ flex: 1, padding: 20 }}>
        {movieItems}
      </div>
    )
  }
}

function MovieListItem(props) {
  const [movie, setMovie] = useState([]);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    axios
      .get('https://api.themoviedb.org/3/movie/' + props.movie.id + '?api_key=875bb04b769cd254a5cd16ded8babc13&append_to_response=videos')
      .then(response => {
        setMovie(response.data);
      });
  }, []);

  const imageurl = "https://image.tmdb.org/t/p/w500" + props.movie.poster_path;

  var genres = '';
  if (movie !== undefined && movie.genres !== undefined) {
    for (var i = 0; i < movie.genres.length; i++) {
      genres += movie.genres[i].name + " ";
    }
  }

  const video = movie?.videos?.results?.[0];

  const openVideoModal = () => {
    if (video) {
      setIsVideoPlaying(true);
    }
  };

  const closeVideoModal = () => {
    setIsVideoPlaying(false);
  };

  return (
    <div className='Movie'>
      <img src={imageurl} />
      <p className="MovieTitle">{props.movie.original_title} : {props.movie.release_date}</p>
      <p className="MovieText">{props.movie.overview}</p>
      <span className="GenresText">Genres: {genres}</span><br />
      {video && (
        <span className="VideosText" onClick={openVideoModal} style={{ color: 'blue', cursor: 'pointer' }}>
          Video: {video.name}
        </span>
      )}
      <Modal
        isOpen={isVideoPlaying}
        onRequestClose={closeVideoModal}
        style={customStyles}
        contentLabel="Video Modal"
      >
        {video && (
          <div>
            <span className="close" onClick={closeVideoModal}>Close</span>
            <iframe
              src={`https://www.youtube.com/embed/${video.key}`}
              allowFullScreen
              title="Video Player"
              style={{ width: '100%', height: '70vh', border: 'none', paddingTop: '30px' }}
            ></iframe>
          </div>
        )}
      </Modal>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <MovieList />
    </div>
  )
}

export default App