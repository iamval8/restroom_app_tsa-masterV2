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
