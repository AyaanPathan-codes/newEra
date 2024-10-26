let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

// config param
let countItem = items.length;
let itemActive = 0;

// event next click
next.onclick = function() {
    itemActive = (itemActive + 1) % countItem;
    showSlider();
}

// event prev click
prev.onclick = function() {
    itemActive = (itemActive - 1 + countItem) % countItem;
    showSlider();
}

// auto run slider, only on larger screens
let refreshInterval;
function startAutoSlider() {
    refreshInterval = setInterval(() => {
        next.click();
    }, 5000);
}

// Function to stop auto slider
function stopAutoSlider() {
    clearInterval(refreshInterval);
}

// auto run slider if screen width is larger than a certain value
if (window.innerWidth > 768) { // Example breakpoint
    startAutoSlider();
}

// show slider function
function showSlider() {
    // remove item active old
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');

    if (itemActiveOld) {
        itemActiveOld.classList.remove('active');
    }
    if (thumbnailActiveOld) {
        thumbnailActiveOld.classList.remove('active');
    }

    // active new item
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');
    setPositionThumbnail();

    // clear auto time run slider
    stopAutoSlider();
    if (window.innerWidth > 768) { // Check again before restarting auto slider
        startAutoSlider();
    }
}

// function to set position of thumbnail
function setPositionThumbnail() {
    let thumbnailActive = document.querySelector('.thumbnail .item.active');
    let rect = thumbnailActive.getBoundingClientRect();
    if (rect.left < 0 || rect.right > window.innerWidth) {
        thumbnailActive.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
    }
}

// click thumbnail
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    })
});

// Listen for window resize to adjust auto slider behavior
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        startAutoSlider();
    } else {
        stopAutoSlider(); // Stop auto slider on small screens
    }
});
