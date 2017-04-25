//When you hover over an image, it will lose it's opacity.
    function hover() {
        $(document).ready(function() {
            $('.movieimg').hover(function() {
                $(this).css('border-color', '#D4AF37')
                $(this).css('opacity', '1')
            }, function() {
                $(this).css('border-color', '#000026')
                $(this).css('opacity', '0.6')
            });
        });
    }
    hover(); //reload the function
