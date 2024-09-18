// <!-- JavaScript to control the popup menu -->
const hamburgerMenu = document.getElementById('hamburgerMenu');
const navModal = document.getElementById('navModal');

hamburgerMenu.addEventListener('click', () => {
    // Show the modal with smooth opacity transition
    navModal.classList.remove('hidden');
    setTimeout(() => {
        navModal.classList.remove('opacity-0');
        navModal.querySelector('.transform').classList.remove('scale-0');
    }, 10); // Delay for smooth transition
});

// Close the modal when clicking outside the menu
navModal.addEventListener('click', (e) => {
    if (e.target === navModal) {
        navModal.querySelector('.transform').classList.add('scale-0');
        navModal.classList.add('opacity-0');
        setTimeout(() => {
            navModal.classList.add('hidden');
        }, 300); // Duration matches the transition
    }
});



// <!-- Countdown timer script -->
function updateCountdown() {
    const endDate = new Date('2024-12-17T22:12:00'); // Set your target end date and time here
    const now = new Date();
    const timeDifference = endDate - now;

    if (timeDifference <= 0) {
        document.getElementById('countdown').innerHTML = '00:00:00:00';
        return;
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call to set the timer immediately


// Function to simulate counting up to a target number
function countUp(elementId, targetNumber) {
    let currentNumber = 0;
    const interval = setInterval(() => {
        if (currentNumber < targetNumber) {
            currentNumber++;
            document.getElementById(elementId).innerText = currentNumber;
        } else {
            clearInterval(interval);
        }
    }, 10); // Adjust the interval time for speed
}

// Initialize counters with target values
window.onload = () => {
    countUp('participants', 500);
    countUp('subEvents', 3);
    countUp('seminars', 5);
    countUp('universities', 53);
    countUp('clubs', 8);
};


// Infinity judges loop 
const container = document.getElementById('scroll-container');
const judgeItems = container.children;
const itemCount = judgeItems.length;

// Clone the items to create an infinite scrolling effect
for (let i = 0; i < itemCount; i++) {
    const clone = judgeItems[i].cloneNode(true);
    container.appendChild(clone);
}

// Adjust the scroll animation to accommodate all items
const totalWidth = container.scrollWidth / 2; // Since we doubled the items
container.style.width = `${totalWidth}px`;
const itemWidth = judgeItems[0].clientWidth + 30; // Adjust for margins

// Adjust animation duration based on total width
const duration = (totalWidth / itemWidth) * 4; // 15 seconds for all items
container.style.animationDuration = `${duration}s`;