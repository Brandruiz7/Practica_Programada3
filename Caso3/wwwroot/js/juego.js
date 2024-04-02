$(function () {
    var cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F'];
    var shuffledCards = shuffle(cards);
    var clickedCards = [];
    var matches = 0;
    var timer = 0;
    var interval;

    //Mezcla las cartas
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    //Muestra el juego con las cartas mezcladas
    for (var i = 0; i < shuffledCards.length; i++) {
        var column = i < 6 ? '#column1' : '#column2';
        $(column).append('<div class="card" data-card="' + shuffledCards[i] + '">?</div>');
    }


    setTimeout(function () {
        $('.card').text('?');
    }, 3000);

    //Muestra el valor de las cartas cuando se seleccionan
    $(document).on('click', '.card', function () {
        var card = $(this);
        if (!card.hasClass('flipped') && !card.hasClass('matched') && clickedCards.length < 2) {
            var cardValue = card.data('card');
            card.text(cardValue);
            card.addClass('flipped');
            clickedCards.push(card);
            if (clickedCards.length === 2) {
                checkMatch();
            }
        }
    });

    // Guarda las cartas si son pareja
    function checkMatch() {
        var card1 = clickedCards[0].data('card');
        var card2 = clickedCards[1].data('card');
        if (card1 === card2) {
            setTimeout(function () {
                clickedCards[0].addClass('matched');
                clickedCards[1].addClass('matched');
                clickedCards = [];
                matches++;
                if (matches === cards.length / 2) {
                    clearInterval(interval);
                    $('#modalTime').text(timer);
                    $('#myModal').css('display', 'block');
                }
            }, 500);
        } else {
            setTimeout(function () {
                clickedCards[0].text('?');
                clickedCards[0].removeClass('flipped');
                clickedCards[1].text('?');
                clickedCards[1].removeClass('flipped');
                clickedCards = [];
            }, 1000);
        }
    }

    // Timer
    interval = setInterval(function () {
        timer++;
        $('#time').text(timer);
    }, 1000);

    //Boton de jugar de nuevo
    $('#restart').on('click', function () {
        clearInterval(interval);
        $('#column1').empty();
        $('#column2').empty();
        $('#message').empty();
        $('#timer').hide();
        timer = 0;
        matches = 0;
        clickedCards = [];
        shuffledCards = shuffle(cards);
        for (var i = 0; i < shuffledCards.length; i++) {
            var column = i < 6 ? '#column1' : '#column2';
            $(column).append('<div class="card" data-card="' + shuffledCards[i] + '">?</div>');
        }
        setTimeout(function () {
            $('.card').text('?');
            $('#timer').show();
            interval = setInterval(function () {
                timer++;
                $('#time').text(timer);
            }, 1000);
        }, 3000);
    });

    $('.close').on('click', function () {
        $('#myModal').css('display', 'none');
    });
});
