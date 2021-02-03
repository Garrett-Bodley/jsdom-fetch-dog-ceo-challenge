console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', function () {
  fetchDogs();
  fetchBreeds();
});

const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = 'https://dog.ceo/api/breeds/list/all';

function fetchDogs(){
  fetch(imgUrl).then(resp => resp.json()).then(json => renderDogs(json.message));
}

function renderDogs(imgArray){
  const imgContainer = document.getElementById("dog-image-container");
  for (const url of imgArray){
    let img = document.createElement('img');
    img.src = url;
    imgContainer.appendChild(img);
  }
};

function fetchBreeds(){
  fetch(breedUrl).then(resp => resp.json()).then(json => renderBreeds(json.message)).then(makeBreedsClickable).then(filterBreeds);
};

function renderBreeds(breedsObject){
  for (const key in breedsObject){
    if (breedsObject[key].length == 0){
      appendBreedNode(key);
    } else {
      for (const type of breedsObject[key]) {
        appendBreedNode(type + ' ' + key);
      };
    };
  };
};

function appendBreedNode(breedName){
  const breedList = document.getElementById('dog-breeds');
  let node = document.createElement('li');
  node.innerText = breedName;
  breedList.appendChild(node);
};

function makeBreedsClickable() {
  let breeds = document.querySelectorAll('li');
  for (const breed of breeds) {
    breed.addEventListener('click', function(){
      if (breed.style.color == 'black' || breed.style.color == ''){
        breed.style.color = 'orange';
      } else {
        breed.style.color = 'black';
      };
    });
  };
};

function filterBreeds() {
  const breedSelect = document.querySelector("#breed-dropdown");
  breedSelect.addEventListener('change', function(){
    applyFilter(breedSelect.value);
  });
}

function applyFilter(selected) {
  let breeds = document.querySelectorAll('li');
  for (const breed of breeds) {
    debugger
    if (breed.innerText[0] != selected){
      breed.style.display = 'none';
    } else {
      breed.style.display = 'block';
    };
  };
};

fetchBreeds();