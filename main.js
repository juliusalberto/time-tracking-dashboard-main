const colorMap = ['#D96C47', '#55C2E6', '#FF5E7D', '#4BCF82', '#4BCF82', '#F1C75B'];

let currentTimeFrame = 'weekly'

async function fetchData() {
    try {
        const response = await fetch('data.json');
        return await response.json();
    } catch {
        console.error('Error fetching data: ', error);
    }
}

function createCard(data) {
    const card = document.createElement('div');
    card.className = 'card';

    const timeframeData = data.timeframes[currentTimeFrame];
    const previousText = 
        currentTimeFrame === 'daily' ? 'Yesterday' : currentTimeFrame === 'weekly' ? 'Last Week' : 'Last Month';

    const imagePaths = [
        '/images/icon-exercise.svg',
        '/images/icon-play.svg',
        '/images/icon-social.svg',
        '/images/icon-self-care.svg',
        '/images/icon-study.svg',
        '/images/icon-work.svg'
    ];

    const colorMap = {
        '/images/icon-exercise.svg': '#4BCF82', // Green
        '/images/icon-play.svg': '#55C2E6',     // Blue
        '/images/icon-social.svg': '#9B59B6',   // Purple
        '/images/icon-self-care.svg': '#F1C75B',// Yellow
        '/images/icon-study.svg': '#FF5E7D',    // Red
        '/images/icon-work.svg': '#FF8B64'      // Orange
    };

    // Select a random image
    const randomImage = imagePaths[Math.floor(Math.random() * imagePaths.length)];

    // Get the corresponding color for the selected image
    const backgroundColor = colorMap[randomImage];

    // Apply the background color to the card
    card.style.backgroundColor = backgroundColor;

    card.innerHTML = `
    <img class="card-image" src="${randomImage}">
    <div class="card-content">
        <div class="card-content-top">
            <div class="title">${data.title}</div>
            <img class="menu-btn" src="/images/icon-ellipsis.svg" alt="Menu button">
        </div>
        <div class="card-content-bottom">
            <h2>${timeframeData.current}hrs</h2>
            <div class="previous">${previousText} - ${timeframeData.previous}hrs</div>
        </div>
    </div>
    `;

    return card;
}

// Function to render all cards
function renderCards(data) {
    const container = document.getElementById("cards-container");
    container.innerHTML = '';
    data.forEach(element => {
        container.appendChild(createCard(element));
    });
}

function updateTimeFrameButtons() {
    const buttons = document.querySelectorAll('.option-wheel > button')
    buttons.forEach(button => {
        button.classList.toggle('active', button.textContent.toLocaleLowerCase() === currentTimeFrame);
    });
}

async function initDashboard() {
    const data = await fetchData();

    renderCards(data);

    const timeFrameButtons = document.querySelectorAll('.option-wheel button');
    timeFrameButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentTimeFrame = button.textContent.toLowerCase();
            renderCards(data);
            updateTimeFrameButtons();
        })
    });

    updateTimeFrameButtons();
}

document.addEventListener('DOMContentLoaded', initDashboard);