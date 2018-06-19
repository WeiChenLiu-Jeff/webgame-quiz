setBackground();
var questionNum = 0;
var totalScore = 0;
var title = document.getElementById("title");
var card = document.getElementById("card");
var answer = '';
nextQuestion();
var cardBtn = document.querySelectorAll(".cardBtn");

function setBackground(){
    window.onload = function() {
        Particles.init({
          selector: '.background',
          color: '#97C7FA',
          connectParticles: true
        });
      };
}

function nextQuestion() {

    if (questionNum == questions.length) {
        //如果沒有題目了，就顯示積分

        var final = `<h1>` + totalScore + `</h1>`;
        final = final + `<h6>早餐店阿姨都叫我帥哥啊</h6>`
        $('#card').append($(final).hide().fadeIn(1000));
        title.innerHTML = "Your Score:";

    } else {
        //如果還有就append下一題
        appendCard(800, questionNum)
    }

}

function appendCard(fadeTime, questionIndex) {

    var index = questions[questionIndex]
    var titleText = index.question;
    var list = `<div class="list-group">`;

    for (let opt of index.options) {
        if (opt.flag === 'correct') {
            answer = opt.text;
        }
    }

    for (let opt of index.options) {
        list = list + `<a href="#" class="cardBtn list-group-item list-group-item-action" onclick="clickAns(this)">` + opt.text + `</a>`
    }

    list = list + `</div>`;

    $('#card').append($(list).hide().fadeIn(fadeTime));

    title.innerHTML = titleText;
    cardBtn = document.querySelectorAll(".cardBtn");
}

function clickAns(el) {
    //記錄分數
    if (el.innerHTML === answer) {
        totalScore += 1;
    } else {
        el.style.color = '#FFFFFF';
        el.style.backgroundColor = '#EF3E36';
    }

    //顯示正確答案
    cardBtn.forEach((each) => {
        each.onclick = function(){return false;};
        if (each.innerHTML === answer) {
            each.style.color = '#FFFFFF';
            each.style.backgroundColor = '#17BEBB';
        }
    })
    // 載入下一個問題與選項
    setTimeout(function () {
        card.removeChild(card.firstChild);
        questionNum += 1;
        nextQuestion();
    }, 1000);
}