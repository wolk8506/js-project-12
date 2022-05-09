import moviePopular from "./moviePopular";

const logo = document.querySelector(".logo");

logo.addEventListener("click", event=>{
    event.preventDefault();
    moviePopular();
})