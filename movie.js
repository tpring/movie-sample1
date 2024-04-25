const apiKey = '657ffd22014acc1e3761178b24efa6fe';
let page = 1;
const totalPages = 467;

let movieUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=ko-KR&page=${page}`;
fetch(movieUrl)
    .then(res => res.json())
    .then(data => {
        data.results.forEach(movieData => {
            const { poster_path, title, overview, vote_average } = movieData;
            const moviePosterPath = `https://image.tmdb.org/t/p/w500${poster_path}`;

            const movieCard = `
                <div class="movie">
                    <img src="${moviePosterPath}" alt="">
                    <h2>${title}</h2>
                    <p>${overview}</p>
                    <p>평점: ${vote_average}</p>
                </div>
            `;


            document.getElementById('movie-container').innerHTML += movieCard;
        });
    })

    .catch(err => console.error(err));
