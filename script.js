const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");


    let ready = false;
    let imagesLoaded = 0;
    let totalImages = 0;
    let photosArray = [];

// Unsplash API
const count =10;
const apiKey = `fIG_x0zCIwb7udZYO33BjpkqKjnpe459DzaySrGF6Hc`;
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

//Check if all images were loaded
function imageLoaded() {
   
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        
    }
}

//Helper Function to set Attributes on DOM elements
function setAttributes(element, attributes) {
        for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
}
}

// Create element for links & photos, add to DOM
function displayPhotos() {
        imagesLoaded = 0;
        totalImages =photosArray.length;
        console.log('total images', totalImages);
        
    //Run function for each object in photosArray
    photosArray.forEach((photo) => {


        //create <a> to link to unsplash
         const item = document.createElement("a");


        setAttributes(item, {href: photo.links.html, target: "_blank"})

        //create <img> for photo
        const img = document.createElement("img");
        
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        //Event Listener, check when each has finished loading
        img.addEventListener('load', imageLoaded); 
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//Get photos from unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        //Catch Error Here
    }
}

// check to see if scrolling near bottom of page, Load more photos
        window.addEventListener("scroll", () =>{
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
            ready = false;
            getPhotos();
        }
    });
// on load 
getPhotos();