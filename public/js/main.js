var digitacao = $(".digitacao");
var frase = $(".frase");
var btnReset = $("#reset-game");
var btnStop = $("#stop-game");
var contador = $(".contador");
var btnShuffle = $("#shuffle-phrase");
var btnSelectPhrase = $("#select-phrase");


function getPhraseSize(texto){
    $(".tamanho").text(texto.split(" ").length);
}
function setWordsCounter(){
    $(".count-words").text("0");
    digitacao.on("input", function(){
        var texto = digitacao.val();
        $(".count-words").text(texto.split(/\S+/).length - 1);
    });
}
function setCharCounter(){
    $(".count-char").text("0");
    digitacao.on("input", function(){
        var texto = digitacao.val();
        $(".count-char").text(texto.length);
    });
}
function stopCountdown(countdown){
    digitacao.on("focusout", function(){
        clearInterval(countdown);
        digitacao.attr("disabled", true);
        btnStop.attr("disabled", true);
        btnReset.attr("disabled", false);
    });
    btnStop.on("click", function(){
        clearInterval(countdown);
        digitacao.attr("disabled", true);
        btnStop.attr("disabled", true);
        btnReset.attr("disabled", false);
    });
}
function setCountdown(seconds){
    var tempo = $(".tempo");
    tempo.text(seconds);
    digitacao.one("input", function(){
        var countdown = setInterval(function(){
        seconds--;
        tempo.text(seconds);
        if (seconds <= 0){
            digitacao.attr("disabled", true);
            contador.removeClass("timer-on");
            contador.addClass("timer-off");
            btnReset.attr("disabled", false);
            clearInterval(countdown);
            adicionaPlacar($(".nome").val(), $(".count-char").text());
            sync();
        }
    }, 1000);
    stopCountdown(countdown);
    });
}
function setValidators(){
    digitacao.on("input", function(){
        if (digitacao.val() == frase.text().substr(0, digitacao.val().length)){
            digitacao.removeClass("digitacao-errada");
            digitacao.addClass("digitacao-correta");
 
        } else {
            digitacao.addClass("digitacao-errada");
            digitacao.removeClass("digitacao-correta");
        }
        
    });
}
$(document).ready(function(){
    getPhrase();
    setCharCounter();
    setWordsCounter();
    setValidators();
    getPlacar();
    btnReset.attr("disabled", true);
    digitacao.removeClass("digitacao-errada");
    digitacao.removeClass("digitacao-correta");
});
btnReset.click(function(){
    getPhrase();
    setCharCounter();
    setWordsCounter();
    setValidators();
    digitacao.val("");
    digitacao.attr("disabled", false);
    btnReset.attr("disabled", true);
    btnStop.attr("disabled", false);
    contador.addClass("timer-on");
    contador.removeClass("timer-off");
    digitacao.removeClass("digitacao-errada");
    digitacao.removeClass("digitacao-correta");
});
btnShuffle.click(function(){
    getPhrase();
});
btnSelectPhrase.click(function(){
    getPhrase($("#select-phrase-input").val() - 1);
});