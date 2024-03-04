// teacherInput.js

// Add event listener for button clicks
document.querySelectorAll('.btn-login').forEach((button) => {
    button.addEventListener('click', () => {
        const restroomId = button.dataset.restroomId;
        const restroomStatus = prompt('Please enter the restroom status (Open or Closed)');

        if (restroomStatus && (restroomStatus.toLowerCase() === 'open' || restroomStatus.toLowerCase() === 'closed')) {
            updateRestroomStatus(restroomId, restroomStatus);
        } else {
            alert('Invalid input. Please enter "Open" or "Closed".');
        }
    });
});

// Update restroom status and save to localStorage
function updateRestroomStatus(restroomId, restroomStatus) {
    const restrooms = JSON.parse(localStorage.getItem('restrooms')) || {};
    restrooms[restroomId] = restroomStatus.toLowerCase();
    localStorage.setItem('restrooms', JSON.stringify(restrooms));
}