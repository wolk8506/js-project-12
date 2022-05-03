const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'a8df323e9ca157a6f58df54190ee006c';
// const QUERY = 'star wars';
const QUERY_PROMT = prompt('Enter movie');
export default function movieSearch() {
  return fetch(
    `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${QUERY_PROMT}&page=1&include_adult=false`,
  )
    .then(response => {
      return response.json();
    })
    .then(response => {
      console.log('Поиск фильмов');
      console.table(response.results.map(mov => mov.original_title));
    });
}
movieSearch();
