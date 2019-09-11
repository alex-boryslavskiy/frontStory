const CAROUSEL_TIMER = 2000;
const API_URL = 'https://jsonplaceholder.typicode.com/photos';
/*window.onload = async function () {
    let currentImg = 0;
    let images = [];
    const image = new Image(600, 600); // bit better for preload
    //const image = document.createElement('img'); // alternative
    const title = document.createElement('h1');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const imageEl = document.getElementById('image-wrapper');
    imageEl.appendChild(image);
    imageEl.appendChild(title);
    const response = await fetch(API_URL);
    if (response.ok) {
        images = await response.json();
        getImageInfo(images, currentImg);
    } else {
        console.log('HTTP error' + response.status);
    }

    let imageInterval = setInterval(function () {
        currentImg++;
        image.src = images[currentImg].url;
        title.textContent = images[currentImg].title;
    }, CAROUSEL_TIMER);

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
};*/

window.onload = async () => {
    const C = new Carousel(document.getElementById('image-wrapper'));
    const response = await fetch(API_URL);
    C.init(await response.json());
};

class Carousel {
    constructor(element) {
        this.prevButton = document.querySelector('.prev-button');
        this.nextButton = document.querySelector('.next-button');

        this.images = [];
        this.image = new Image(600, 600);
        this.title = document.createElement('h1');

        element.append(this.image);
        element.append(this.title);

        this.currentImageIndex = 0;

        this.prevButton.addEventListener('click', this.buttonAction.bind(this, 'prev'));
        this.nextButton.addEventListener('click', this.buttonAction.bind(this, 'next'));

    }
    init(images) {
        this.images = images;
        this.showImage(this.currentImageIndex);
        this.imageInterval = setInterval(() => {
            if (this.isLast()) {
                this.currentImageIndex = 0;
                this.showImage(this.currentImageIndex)
            } else {
                this.next();
            }
        }, CAROUSEL_TIMER)
    }
    prev() {
        if (this.currentImageIndex === 0) {
            this.currentImageIndex = this.images.length - 1;
        } else {
            this.currentImageIndex -= 1;
        }
        this.showImage(this.currentImageIndex);
    }
    next() {
        if (this.currentImageIndex < this.images.length - 1) {
            this.currentImageIndex += 1;
        } else {
            this.currentImageIndex = 0;
        }
        this.showImage(this.currentImageIndex);
    }
    isLast() {
        return this.currentImageIndex === this.images.length - 1;
    }
    showImage(index) {
        const imageObject = this.images[index];
        this.image.src = imageObject.url;
        this.title.textContent = imageObject.title;
    }
    buttonAction(direction) {
        clearInterval(this.imageInterval);
        if (direction === 'prev') {
            this.prev();
        } else {
            this.next();
        }
    }
}

