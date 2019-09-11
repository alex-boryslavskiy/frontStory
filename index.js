const requestURL = 'https://jsonplaceholder.typicode.com/photos';
const request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
let currentImg = 0;
let images = [];
request.onload = function() {
    images = request.response;
    getImageInfo(images, currentImg);
};
const image = new Image(600, 600); // bit better for preload
//const image = document.createElement('img'); // alternative
const title = document.createElement('h1');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
document.querySelector('.image').appendChild(image);
document.querySelector('.image').appendChild(title);

function getImageInfo(json, currentImg) {
    image.src = json[currentImg].url;
    //image.setAttribute('src', json[currentImg].url); // alternative
    title.textContent = json[currentImg].title;
}

nextButton.addEventListener('click', function () {
    if (currentImg < images.length - 1) {
        currentImg = currentImg + 1;
    } else {
        currentImg = 0;
    }
    getImageInfo(images, currentImg);
});

prevButton.addEventListener('click', function () {
    if (currentImg !== 0) {
        currentImg = currentImg - 1;
    } else {
        currentImg = images.length - 1;
    }
    getImageInfo(images, currentImg);
});
