const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Looping through images */

for (let i = 1; i < 6; i++) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', `images/pic${i}.jpg`);
    thumbBar.appendChild(newImage);

    // newImage.onclick = function(e) {
    //     displayedImage.src = e.target.src;
    // }
}

thumbBar.addEventListener('click', (e) => {
    // displayedImage.setAttribute('src', e.target.getAttribute('src'));
    displayedImage.src = e.target.src;
})

/* Wiring up the Darken/Lighten button */

btn.addEventListener('click', (e) => {
    if(e.target.getAttribute('class') === 'dark') {
        e.target.setAttribute('class', 'light');
        e.target.textContent = 'Lighten';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    }
    else{
        e.target.setAttribute('class', 'dark');
        e.target.textContent = 'Darken';
        overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    }
})