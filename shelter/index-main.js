//burger-menu//

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("burger").addEventListener("click", function(){
        document.querySelector(".header").classList.toggle("open");
        document.body.classList.toggle("no-scroll");
    })
})
document.getElementById("burger").addEventListener("click", event => {
    event._isClickWithInMenu = true;
})
document.getElementById("navigation").addEventListener("click", event => {
    event._isClickWithInMenu = true;
})
document.body.addEventListener("click", event => {
    if(event._isClickWithInMenu) return;
    document.querySelector(".header").classList.remove("open");
    document.body.classList.remove("no-scroll");
})
document.getElementById("navigation").querySelectorAll("li").forEach((link) => {
    link.addEventListener("click", () => {
        document.querySelector(".header").classList.remove("open");
        document.body.classList.remove("no-scroll");
    });
});

//slider//

const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");
const nextBtn2 = document.getElementById("nextBtn2");
const catalog = document.getElementById("pets");
let petsData = [];
let cardsPerPage = getCardsPerPage();
let cardWidth = 270;
let history = [];
let currentIndex = 0;

function readJson() {
    fetch('https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/shelter/pets.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            petsData = data;
            totalCards = petsData.length;
            initSlider();
        })
        .catch(err => {
            console.error('Failed to fetch data:', err);
        });
}
readJson();

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getCardsPerPage() {
    const width = window.innerWidth;
    if (width >= 1280) return 3;
    if (width >= 768) return 2;
    return 1;
}

function getGap() {
    const width = window.innerWidth;
    if (width >= 1280) return 90;
    if (width >= 768) return 42;
    return 0;
}

function generateSlide(excludeNames = []) {
    const pool = petsData.filter(pet => !excludeNames.includes(pet.name));
    const shuffled = shuffleArray(pool);
    return shuffled.slice(0, cardsPerPage);
}


function renderPets() {
    catalog.innerHTML = '';
    const currentPets = history[currentIndex];

    currentPets.forEach(pet => {
        const petCard = document.createElement('div');
        petCard.classList.add('pet');
        petCard.innerHTML = `
            <img class="img_pet" src="images/pets-${pet.name.toLowerCase()}.png" width="${cardWidth}" height="${cardWidth}">
            <div class="pet-name">${pet.name}</div>
            <button class="learn-more-btn">Learn more</button>
        `;
        catalog.appendChild(petCard);
    });
}

function initSlider() {
    const firstSlide = generateSlide();
    history.push(firstSlide);
    renderPets();
}

nextBtn.addEventListener("click", () => {
    if (currentIndex < history.length - 1) {
        currentIndex++;
    } else {
        const currentNames = history[currentIndex].map(p => p.name);
        const nextSlide = generateSlide(currentNames);
        history.push(nextSlide);
        currentIndex++;
    }
    renderPets();
});

nextBtn2.addEventListener("click", () => {
    if (currentIndex < history.length - 1) {
        currentIndex++;
    } else {
        const currentNames = history[currentIndex].map(p => p.name);
        const nextSlide = generateSlide(currentNames);
        history.push(nextSlide);
        currentIndex++;
    }
    renderPets();
});

backBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        if (history.length > 1) history.pop();

        const currentNames = history[currentIndex].map(p => p.name);
        const prevSlide = generateSlide(currentNames);

        history.unshift(prevSlide);
    }
    renderPets();
});