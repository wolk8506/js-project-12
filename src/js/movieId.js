const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'a8df323e9ca157a6f58df54190ee006c';

export default function movieId() {
  return fetch(`${BASE_URL}movie/200?api_key=${API_KEY}`)
    .then(response => {
      return response.json();
    })
    .then(response => {
      console.log('ID фильма');
      console.log(response);
    });
}
movieId();
