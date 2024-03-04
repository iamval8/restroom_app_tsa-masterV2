$(document).ready(function() {
    // Initialize button states from localStorage or default to btn-white
    $('button[data-toggle="button-bg"]').each(function() {
        var label = $(this).text().trim();
        var state = localStorage.getItem(label);
        if (state) {
            $(this).addClass(state);
            updateIconBoxColor(label, state);
        } else {
            $(this).addClass('btn-white');
            localStorage.setItem(label, 'btn-white'); // Set default state in localStorage
            updateIconBoxColor(label, 'btn-white');
        }
    });

    // Button click event handler
    $('button[data-toggle="button-bg"]').on('click', function() {
        var label = $(this).text().trim();
        var currentState = $(this).hasClass('btn-green') ? 'btn-green' :
            $(this).hasClass('btn-red') ? 'btn-red' :
                $(this).hasClass('btn-white') ? 'btn-white' : '';

        // Toggle button color
        if (currentState === 'btn-green') {
            $(this).removeClass('btn-green').addClass('btn-red');
        } else if (currentState === 'btn-red') {
            $(this).removeClass('btn-red').addClass('btn-white');
        } else if (currentState === 'btn-white') {
            $(this).removeClass('btn-white').addClass('btn-green');
        } else {
            $(this).addClass('btn-green');
            currentState = 'btn-green';
        }

        // Update localStorage with new state
        localStorage.setItem(label, currentState);

        // Update corresponding icon box color
        updateIconBoxColor(label, currentState);
    });

    // Function to update corresponding icon box color
    function updateIconBoxColor(label, state) {
        var selector = '';
        if(label === "A/B Hall") {
            selector = "#first_floor_ab";
        } else if(label === "B/C Hall") {
            selector = "#first_floor_bc";
        } else if(label === "C/D Hall") {
            selector = "#first_floor_cd";
        }
        if (selector) {
            $(selector).removeClass('btn-green btn-red btn-white').addClass(state);
        }
    }
});

// CODE TO UPDATE RESTROOM AVAILABILITY - VV

document.addEventListener('DOMContentLoaded', () => {
    const currentFloor = getCurrentFloor();

    // Get restroom status from localStorage
    const restrooms = JSON.parse(localStorage.getItem(currentFloor)) || {};

    // Update restroom status on the webpage
    displayRestroomStatus(currentFloor);

    // Add event listener for button clicks
    document.querySelectorAll('.btn-login').forEach((button) => {
        button.addEventListener('click', () => {
            const restroomId = button.dataset.restroomId;
            const restroomStatus = prompt('Please enter the restroom status (Open or Closed)');

            if (restroomStatus && (restroomStatus.toLowerCase() === 'open' || restroomStatus.toLowerCase() === 'closed')) {
                // Update restroom status in localStorage
                updateRestroomStatus(currentFloor, restroomId, restroomStatus);

                // Update restroom status on the webpage
                displayRestroomStatus(currentFloor);
            } else {
                alert('Invalid input. Please enter "Open" or "Closed".');
            }
        });
    });
});

// Update restroom status and save to localStorage
function updateRestroomStatus(floor, restroomId, restroomStatus) {
    const restrooms = JSON.parse(localStorage.getItem(floor)) || {};
    restrooms[restroomId] = restroomStatus.toLowerCase();
    localStorage.setItem(floor, JSON.stringify(restrooms));
}

// Display restroom status on the webpage
function displayRestroomStatus(floor) {
    const restrooms = JSON.parse(localStorage.getItem(floor)) || {};

    Object.entries(restrooms).forEach(([restroomId, restroomStatus]) => {
        const restroomElement = document.getElementById(floor + '_' + restroomId);
        if (restroomElement) {
            restroomElement.querySelector('p').textContent = restroomStatus;
        }
    });
}

// Get the current floor name based on the page URL
function getCurrentFloor() {
    const url = window.location.pathname;
    const floors = ['first_floor', 'second_floor', 'third_floor'];

    for (let i = 0; i < floors.length; i++) {
        if (url.includes(floors[i])) {
            return floors[i];
        }
    }

    return '';
}