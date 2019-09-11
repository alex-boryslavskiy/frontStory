window.onload = async function () {
    let currentImg = 0;
    let images = [];
    const image = new Image(600, 600); // bit better for preload
    //const image = document.createElement('img'); // alternative
    const title = document.createElement('h1');
    const url = 'https://jsonplaceholder.typicode.com/photos';
    const response = await fetch(url);
    if (response.ok) {
        images = await response.json();
        getImageInfo(images, currentImg);
    } else {
        console.log('HTTP error' + response.status);
    }
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    document.querySelector('.image').appendChild(image);
    document.querySelector('.image').appendChild(title);

    let imageInterval = setInterval(function () {
        currentImg++;
        image.src = images[currentImg].url;
        title.textContent = images[currentImg].title;
    }, 2000);

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
        clearInterval(imageInterval);
    });

    prevButton.addEventListener('click', function () {
        if (currentImg !== 0) {
            currentImg = currentImg - 1;
        } else {
            currentImg = images.length - 1;
        }
        getImageInfo(images, currentImg);
        clearInterval(imageInterval);
    });
};
