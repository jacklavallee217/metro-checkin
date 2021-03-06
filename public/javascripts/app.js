// Customer Profile    
    $(document).ready(function() {
        $('#editAccount').on('click', function() {
            if (!($('#editAccount').hasClass('active'))) {
                $('#purchases').removeClass('active');
                $('#purchasesDiv').css('display', 'none');

                $('#deleteAccount').removeClass('active');
                $('#deleteAccountDiv').css('display', 'none');

                $('#editAccount').addClass('active');
                $('#editAccountDiv').css('display', 'block');
            }
        })

        $('#purchases').on('click', function() {
            if (!($('#purchases').hasClass('active'))) {
                $('#editAccount').removeClass('active');
                $('#editAccountDiv').css('display', 'none');

                $('#deleteAccount').removeClass('active');
                $('#deleteAccountDiv').css('display', 'none');

                $('#purchases').addClass('active');
                $('#purchasesDiv').css('display', 'block');
            }
        })

        $('#deleteAccount').on('click', function() {
            if (!($('#deleteAccount').hasClass('active'))) {
                $('#editAccount').removeClass('active');
                $('#editAccountDiv').css('display', 'none');

                $('#purchases').removeClass('active');
                $('#purchasesDiv').css('display', 'none');

                $('#deleteAccount').addClass('active');
                $('#deleteAccountDiv').css('display', 'block');
            }
        })
    })

    $(document).ready(function() {
        $('#enterCardInfo').on('click', function() {
            $('#cardInfoBox').css('display', 'block');
        })
    });

    $(document).ready(function() {
        $('#customerBackButton').on('click', function() {
            $('#cardInfoBox').css('display', 'none');
        })
    });

/********************/

// Customer Purchase

    const tabElements = {'passesTab': 'passes', 'membershipsTab': 'memberships', 'foodTab': 'food', 'gearTab': 'gear'};

    $('.tabLinks').click(function() {

        for (var key in tabElements) {
            var value = tabElements[key];

            if ($(this).attr('id') == key) {
                $('#' + value).css('display', 'flex');
                $('#' + key).addClass('active');
            }

            else {
                $('#' + value).css('display', 'none');
                $('#' + key).removeClass('active');
            }
        }
    })

    $(document).ready(function() {
        $('#confirmCart').on('click', function() {
            $('#purchaseBox').css('display', 'block');
        })
    });

    $(document).ready(function() {
        $('#backButton').on('click', function() {
            $('#purchaseBox').css('display', 'none');
        })
    });

/********************/

// Purchase History


    $(document).ready(function() {
        $('.purchaseRow').on('click', function() {
            var id = $(this).attr('id').substr(8);
            $('.info' + id).css('display', 'table-row');
        })
    });

/********************/


// Waiver

    function validateCheckbox() {
        if (!$('#agreementCheck').is(':checked')) {
            alert('You must agree to the terms');
            return false;
        }
        else {
            return true;
        }
    }

    $(document).ready(function() {
        $('#waiver-start').on('click', function() {
            $('#waiver-home').css('display', 'none');
            $('#waiver-form').css('display', 'block');
            $('#waiver-message').css('display', 'none');
            $('html').css('overflow', 'auto');
            $('body').css('overflow', 'auto');
        })

        $('#agreementCheck').on('click', function() {
            $('#waiver-submit').prop('disabled', false);
        })

    })

