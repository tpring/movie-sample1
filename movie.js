import API_KEY from './config/key.js'; // API 키를 가져옵니다.

let page = 1;
let totalPages;

// 초기 영화 목록 표시
fetchMovies(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=ko-KR&page=${page}`);


// 검색 버튼 클릭 시 검색어 가져와서 영화 검색
document.getElementById('search-button').addEventListener('click', function() {
    page = 1; // 검색 시 페이지 초기화
    const searchTerm = document.getElementById('search-input').value; // 검색어 가져오기
    searchMovies(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=ko-KR&query=${searchTerm}&page=${page}`);
});

// 엔터 키로 검색 가능하게 하기
document.getElementById('search-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('search-button').click();
        e.preventDefault(); // 폼 제출 방지
    }
});

// 이전 페이지 버튼 클릭 시
document.getElementById('prev-button').addEventListener('click', function() {
    if (page > 1) {
        page--;
        const searchTerm = document.getElementById('search-input').value; // 검색어 가져오기
        if (searchTerm.trim() !== "") {
            searchMovies(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=ko-KR&query=${searchTerm}&page=${page}`);
        } else {
            fetchMovies(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=ko-KR&page=${page}`);
        }
    }
});

// 다음 페이지 버튼 클릭 시
document.getElementById('next-button').addEventListener('click', function() {
    if (page < totalPages) {
        page++;
        const searchTerm = document.getElementById('search-input').value; // 검색어 가져오기
        if (searchTerm.trim() !== "") {
            searchMovies(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=ko-KR&query=${searchTerm}&page=${page}`);
        } else {
            fetchMovies(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=ko-KR&page=${page}`);
        }
    }
});

// 영화 카드 클릭 시
document.addEventListener('click', function (event) {
    const movieCard = event.target.closest('.movie');
    if (movieCard) {
        const movieId = movieCard.dataset.movieId;
        if (movieId) {
            alert(`클릭한 영화의 ID는 ${movieId} 입니다.`);
        }
    }
});

// 영화 가져와서 화면에 표시하는 함수
function fetchMovies(movieUrl) {
    document.getElementById('movie-container').innerHTML = ''; // 이전에 표시된 영화 목록 제거
    fetch(movieUrl)
        .then(response => response.json())
        .then(data => {
            totalPages = data.total_pages;
            const movies = data.results;
            movies.forEach(movie => {
                const {id, poster_path, title, overview, vote_average } = movie;
                const moviePosterPath = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : 'https://via.placeholder.com/300';
                const movieCard = `
                    <div class="movie" data-movie-id="${id}">
                        <img src="${moviePosterPath}">
                        <h2>${title}</h2>
                        <p>${overview}</p>
                        <p>평점: ${vote_average}</p>
                    </div>
                `;
                document.getElementById('movie-container').innerHTML += movieCard;
            });
        })
        .catch(error => console.error('Error fetching movies:', error));
}

// 영화 검색해서 화면에 표시하는 함수
function searchMovies(searchUrl) {
    document.getElementById('movie-container').innerHTML = ''; // 이전에 표시된 영화 목록 제거
    fetch(searchUrl)
        .then(response => response.json())
        .then(data => {
            totalPages = data.total_pages;
            const movies = data.results;
            movies.forEach(movie => {
                const {id, poster_path, title, overview, vote_average } = movie;
                const moviePosterPath = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : 'https://via.placeholder.com/300';
                const movieCard = `
                    <div class="movie"data-movie-id="${id}">
                        <img src="${moviePosterPath}">
                        <h2>${title}</h2>
                        <p>${overview}</p>
                        <p>평점: ${vote_average}</p>
                    </div>
                `;
                document.getElementById('movie-container').innerHTML += movieCard;
            });
        })
        .catch(error => console.error('Error searching movies:', error));
}