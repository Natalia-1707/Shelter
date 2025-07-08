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


// pagination //
const buttonFirst = document.getElementById('buttonFirst');
const buttonSecond = document.getElementById('buttonSecond');
const buttonThird = document.getElementById('buttonThird');
const buttonFourth = document.getElementById('buttonFourth');

let currentPage = 1;
let buttonNumber = 1;
let cardsPerPage = getCardsPerPage();
let petsData = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function readJson() {
    fetch(
      'https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/shelter/pets.json'
    )
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      petsData = data;
      console.log(petsData);
      displayPage(currentPage);
    })
    .catch((err) => {
      console.error('Failed to fetch data:', err);
    });
}
readJson();

function getCardsPerPage() {
    const width = window.innerWidth;
    console.log('Window width:', width);
    if (width >= 1280) {
        return 8;
    } else if (width > 320 && width < 1280) {
        return 6;
    } else {
        return 3;
    }
}

function displayPage(page) {
    cardsPerPage = getCardsPerPage();
    console.log(cardsPerPage)
    const totalPages = 48 / cardsPerPage;
    if (page < 1 || page > totalPages) {
        return;
    }
    let shuffledPetsData = shuffleArray([...petsData]);
    const start = (page - 1) * cardsPerPage;
    const end = start + cardsPerPage;
    const petsToDisplay = shuffledPetsData.slice(start, end);
    const container = document.getElementById('pets-list');
    container.innerHTML = '';

    petsToDisplay.forEach(pet => {
        const petCard = document.createElement('div');
        petCard.classList.add('pet');
        petCard.innerHTML = `
        <img class="img_pet" src="images/pets-${pet.name.toLowerCase()}.png" alt="${pet.name}" width="270" height="270">
        <div class="pet-name">${pet.name}</div>
        <button class="learn-more-btn">Learn more</button>
        `;
        petCard.addEventListener('click', () => openModal(pet));
        container.appendChild(petCard);
    });
}

window.addEventListener("resize", function() {
    let newCardsPerPage = getCardsPerPage();
    console.log(newCardsPerPage)
    if (cardsPerPage !== newCardsPerPage) {
        cardsPerPage = newCardsPerPage;
        displayPage(currentPage);
    }
});


buttonFirst.addEventListener("click", () => {
    buttonNumber = 1
    displayPage(currentPage)
    document.getElementById("buttonNumber").innerHTML = buttonNumber
    buttonFirst.disabled = true
    buttonSecond.disabled = true
    buttonThird.disabled = false
    buttonFourth.disabled = false
})

buttonSecond.addEventListener("click", () => {
    buttonNumber --
    displayPage(currentPage)
    document.getElementById("buttonNumber").innerHTML = buttonNumber
    if (buttonNumber === 1){
        buttonSecond.disabled = true
        buttonFirst.disabled = true
    }
    if (buttonNumber < (48/cardsPerPage)){
        buttonThird.disabled = false
        buttonFourth.disabled = false
    }
})

buttonThird.addEventListener("click", () => {
    buttonNumber ++
    displayPage(currentPage)
    document.getElementById("buttonNumber").innerHTML = buttonNumber
    if (buttonNumber > 1){
        buttonSecond.disabled = false
        buttonFirst.disabled = false
    }
    if (buttonNumber === 48/cardsPerPage) {
        buttonThird.disabled = true
        buttonFourth.disabled = true
    }
})

buttonFourth.addEventListener("click", () => {
    buttonNumber = 48/cardsPerPage
    displayPage(currentPage)
    document.getElementById("buttonNumber").innerHTML = buttonNumber
    buttonFirst.disabled = false
    buttonSecond.disabled = false
    buttonThird.disabled = true
    buttonFourth.disabled = true
})
