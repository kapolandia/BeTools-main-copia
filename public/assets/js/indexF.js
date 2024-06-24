$(document).ready(function () {
    // Listen for change event on the radio buttons
    $('input[name="three"]').change(function () {
        // Get the data-target value
        var target = $(this).data('target');

        // Hide all price containers
        $('.price-container').css('display', 'none');

        // Show the selected price container using flex
        $('#' + target).css('display', 'flex');
    });
});


