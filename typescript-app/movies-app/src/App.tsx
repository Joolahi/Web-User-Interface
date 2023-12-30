import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import Modal from 'react-modal';

const customStyles: Modal.Styles = {
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
}

interface Video {
  key: string;
  name: string;
}

interface Movie {
  id: number;
  original_title: string;
  release_date: string;
  overview: string;
  poster_path: string;
  genres?: { name: string }[];
  videos?: { results?: Video[] };
}

interface MovieProps{
  movie: Movie;
}

const MovieListItem: React.FC<MovieProps> = (props) => {
  const [movie, setMovie] = useState<Movie | undefined>(undefined);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${props.movie.id}?api_key=875bb04b769cd254a5cd16ded8babc13&append_to_response=videos`)
      .then((response) => {
        setMovie(response.data);
      });
  }, [props.movie.id]);

  const imageurl = `https://image.tmdb.org/t/p/w500${props.movie.poster_path}`;

  let genres = '';
  if (movie !== undefined && movie.genres !== undefined) {
    genres = movie.genres.map((genre) => genre.name).join(' ');
  }

  const videos = movie?.videos?.results;

  const openVideoModal = () => {
    if (videos && videos.length > 0) {
      setIsVideoPlaying(true);
    }
  };

  const closeVideoModal = () => {
    setIsVideoPlaying(false);
  };

  return (
    <div className='Movie'>
      <img src={imageurl} alt='Movie Poster' />
      <p className='MovieTitle'>
        {props.movie.original_title} : {props.movie.release_date}
      </p>
      <p className='MovieText'>{props.movie.overview}</p>
      <span className='GenresText'>Genres: {genres}</span>
      <br />
      {videos && videos.length > 0 && (
        <span className='VideosText' onClick={openVideoModal} style={{ color: 'blue', cursor: 'pointer' }}>
          Video: {videos[0].name}
        </span>
      )}
      <Modal isOpen={isVideoPlaying} onRequestClose={closeVideoModal} style={customStyles} contentLabel='Video Modal'>
        {videos && videos.length > 0 && (
          <div>
            <span className='close' onClick={closeVideoModal}>
              Close
            </span>
            <iframe
              src={`https://www.youtube.com/embed/${videos[0].key}`}
              allowFullScreen
              title='Video Player'
              style={{ width: '100%', height: '70vh', border: 'none', paddingTop: '30px' }}
            ></iframe>
          </div>
        )}
      </Modal>
    </div>
  );
};
const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000)
  }, [])

  useEffect(() => {
    axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=875bb04b769cd254a5cd16ded8babc13&appens_to_respose=videos')
    .then((response) =>{
      setMovies(response.data.results);
    });
  }, []);

  if(isLoading){
    return <p>Loading...</p>
  }
  else if(movies.length === 0){
    return(
      <p>Can't load any movies</p>
    )
  }
  else{
    const movieItems = movies.map((movie, index) => <MovieListItem key={index} movie={movie}></MovieListItem>)
    return (
      <div style={{flex: 1, padding: 15}}>{movieItems}</div>
    )
  }
}

function App() {
  return (
    <div className='App'>
      <h1>Movie List App</h1>
      <MovieList></MovieList>
    </div>
  );
}

export default App;
