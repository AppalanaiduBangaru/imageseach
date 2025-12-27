const accessKey = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw";

const formEl = document.getElementById("form");
const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.getElementById("search-results");
const showMoreButtonEl = document.getElementById("show-more-button");

let inputData = "";
let page = 1;
const imagesPerPage = 20; 

async function searchImages() {
  inputData = searchInputEl.value;

  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&per_page=${imagesPerPage}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();

  if (page === 1) {
    searchResultsEl.innerHTML = "";
  }

  const results = data.results;

  results.forEach((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");

    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description || "Image";

    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description || "View Image";

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResultsEl.appendChild(imageWrapper);
  });

  page++;

  showMoreButtonEl.style.display = "block";
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMoreButtonEl.addEventListener("click", () => {
  searchImages();
});
