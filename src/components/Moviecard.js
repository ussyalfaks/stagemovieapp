import React, { useState, useEffect } from "react";
import axios from "axios";
import FavoriteNot from '../asset/images/Favorite.svg';
import FavoriteYes from '../asset/images/Favorite1.svg';
import '../index.css';
import imdb from '../asset/images/imdb.png'; 
import tomato from '../asset/images/tomato.png';
import { Link } from "react-router-dom";
import { MrMiyagi } from '@uiball/loaders';




function MovieCard({ movie, searchResults }) {
  
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Check if the movie is in the favorites stored in localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(favorites.includes(movie.id));
  }, [movie.id]);

  const addToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(movie.id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    setIsFavorite(true);
  };

  const removeFromFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const updatedFavorites = favorites.filter((id) => id !== movie.id);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFavorite(false);
  };


  return (
    <Link to=
    // "/Trailer/movie:id"
     {`/movie/${movie.id}`}>
    <div className="container" data-testid="movie-card">
      <div className="image-container">
        <div className="image-wrapper">
          <div className="background-overlay"></div>
          <img
            className="image"
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            data-testid="movie-poster"
            alt={movie.title}
          />
        </div>
        <div className="badge-container">
          <div className="badge">
            <div className="badge-text"></div>
          </div>
          <div className="badge">
            <div className="badge-icon">
            {isFavorite ? (
                <img
                  className="favorite"
                  src={FavoriteYes}
                  alt="favorite movie"
                  onClick={removeFromFavorites}
                />
              ) : (
                <img
                  className= "favorite"
                  src={FavoriteNot}
                  alt="favorite movie"
                  onClick={addToFavorites}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="country-year" data-testid="movie-release-date">
        {movie.release_date}
        {/* {movie.production_countries.map((country) => country.name).join(', ')} */}
        {/* {movie.production_countries ? movie.production_countries.map((country) => country.name).join(', ') : ''} */}
      </div>
                
      <div className="title" data-testid="movie-title">
        {movie.title}
      </div>
      <div className="ratings-container">
        <div className="rating-item">
          <img
            className="rating-icon"
            src={imdb}
            alt="Rating Icon"
          />
          <div className="rating-text">{movie.vote_average} / 100</div>
        </div>
        <div className="rating-item">
          <img
            className="rating-icon"
            src={tomato}
            alt="Rating Icon"
          />
          <div className="rating-text">{movie.vote_average * 10}%</div>
        </div>
      </div>
      <div className="genres">
        {movie.genres}
        {/* {movie.genres.map((genre) => genre.name).join(', ')} */}
        {/* {movie.genres ? movie.genres.map((genre) => genre.name).join(', ') : ''} */}
      </div>
    </div>
 </Link>
      
      );
    }

function MovieList({searchResults}) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const apiKey = '523c8b46aafc35c66f9fd4323369516c'; // Replace with your TMDB API key
    if (searchResults && searchResults.length > 0) {
      // If searchResults is provided, use it as the movie list
      setMovies(searchResults);
      setIsLoading(false);
    } else {
    axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`)
      .then((response) => {
        setMovies(response.data.results.slice(0, 10)); // Slice to get the first 10 movies
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsLoading(false);
      });
    }
  }, [searchResults]);

  return (
    <section className="layout">
     {isLoading ? (
        <p className="loader"><MrMiyagi 
        size={100}
        lineWeight={3.5}
        speed={1} 
        color="darkblue" 
       /></p>
      ) : (
        <div>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
   
  );
}


export default MovieList;






















// import React, { useState, useEffect } from "react";
// import Favorite from '../asset/images/Favorite.svg';
// import axios from 'axios';


// let MovieCard = ({ movie }) => {
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [genre, setGenre] = useState('');
//   const [imdbPercentage, setImdbPercentage] = useState('');
//   const [rottenPercentage, setRottenPercentage] = useState('');
//   const [formattedReleaseYear, setFormattedReleaseYear] = useState('');

//   useEffect(() => {
//     const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
//     setIsFavorite(favorites.includes(movie.id));

//     // Fetch genre data for the movie
//     const apiKey = '523c8b46aafc35c66f9fd4323369516c'; // Replace with your API key
//     axios.get(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}`)
//     .then((response) => {
//         // Extract the genre names from the response and join them into a string
//         const genreNames = response.data.genres.map((genre) => genre.name).join(', ');
//         setGenre(genreNames);

//         // Format the release year
//         const formattedDate = formatToUTCYear(response.data.release_date);
//         setFormattedReleaseYear(formattedDate);
//       })
//       .catch((error) => {
//         console.error('Error:', error);
        
//       });

//     // Generate random percentages
//     setImdbPercentage(getRandomPercentage());
//     setRottenPercentage(getRandomPercentage());
//   }, [movie.id]);

//   function getRandomPercentage() {
//     const randomPercentage = Math.floor(Math.random() * 56) + 55; // Generates a random number between 55 and 100
//     return `${randomPercentage}%`;
//   }

//   const formatToUTCYear = (dateString) => {
//     const localDate = new Date(dateString);
//     const utcYear = localDate.getUTCFullYear();
//     return utcYear.toString();
//   };

//   const toggleFavorite = () => {
//     const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

//     if (isFavorite) {
//       const updatedFavorites = favorites.filter((id) => id !== movie.id);
//       localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
//     } else {
//       favorites.push(movie.id);
//       localStorage.setItem('favorites', JSON.stringify(favorites));
//     }

//     setIsFavorite(!isFavorite);
//   };


// //const MovieCard = () => {


//     return (
//             <div className="container" data-testid="movie-card">
//         <div className="image-container" >
//           <div className="image-wrapper">
//             <div className="background-overlay"></div>
//             <img className="image" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} data-testid="movie-poster" alt={movie.title} />
//           </div>
//           <div className="badge-container">
//             <div className="badge">
//               <div className="badge-text">TV SERIES</div>
//             </div>
//             <div className="badge">
//               <div className="badge-icon">
              
//               <img className={isFavorite ? 'favourite red': 'favourite'} src={Favorite} alt="favourite movie" onClick={toggleFavorite}/>
      
//               </div>
//               <div className="badge-icon"></div>
//             </div>
//           </div>
//         </div>
//         <div className="country-year" data-testid="movie-release-date" >{formattedReleaseYear}</div>
//         <div className="title" data-testid="movie-title" > {movie.title} </div>
//         <div className="ratings-container">
//           <div className="rating-item">
//             <img className="rating-icon" src="" alt="Rating Icon" />
//             <div className="rating-text"> {imdbPercentage} / 100 </div>
//           </div>
//           <div className="rating-item">
//             <img className="rating-icon" src="https://via.placeholder.com/16x17" alt="Rating Icon" />
//             <div className="rating-text"> {rottenPercentage} / 100 </div>
//           </div>
//         </div>
//         <div className="genres"> {genre} </div>
//       </div>
//     );
//   }


// export default MovieCard;



