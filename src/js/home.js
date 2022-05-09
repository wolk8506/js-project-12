import moviePopular from "./moviePopular";

const home = document.querySelector(".nav__list-text");

home.addEventListener("click", event=>{
    event.preventDefault();
    moviePopular();
})
