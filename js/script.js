const qiuzData = [
    {
        id:1,
        question:'What is the JS',
        a:'Matiz',
        b:'Programming language',
        c:'YavaScrypt',
        d:'Zalkar',
        correct:'b'
    },
    {
        id:2,
        question:'What watsApp',
        a:'Messenger',
        b:'Food',
        c:'Zalkar',
        d:'Social network',
        correct:'a'
    },
    {
        id:3,
        question:'who u do',
        a:'what u do',
        b:'Which u how',
        c:'do u what',
        d:'where u when',
        correct:'d'
    }
]
window.addEventListener('load' , ()=> {
    if(JSON.parse(localStorage.getItem('qiuzData'))){
        return;
    }else{
        localStorage.setItem('quizData' , JSON.stringify(qiuzData)) 
    }
})       

const res = qiuzData

console.log(res);
// sources
const $qiuz = document.querySelector('#quiz');
const $answerEls = document.querySelectorAll('.answer');
const $questionEl = document.querySelector('#question');
const $submitBtn = document.querySelector('#submit')
const $a_text = document.querySelector('#a_text');
const $b_text = document.querySelector('#b_text');
const $c_text = document.querySelector('#c_text');
const $d_text = document.querySelector('#d_text');

// current question
let currentQuiz = 0;
// score read
let score = 0;

// function showing for 1 quiz

const loadQuiz = () => {
    deselectAnswer();
    const currentQuizData = qiuzData[currentQuiz];
    $questionEl.innerHTML = currentQuizData.question;
    $a_text.innerHTML = currentQuizData.a;
    $b_text.innerHTML = currentQuizData.b;
    $c_text.innerHTML = currentQuizData.c;
    $d_text.innerHTML = currentQuizData.d;
}
// deselect function to delete choise 
const deselectAnswer = () => {
    $answerEls.forEach(item => {
        item.checked = false
    })
}
loadQuiz();
// fuction validater of choise
const getSelected = () =>{
    let answer = null;
    $answerEls.forEach(item => {
        if(item.checked){
            answer = item.id
        }
    })
    return answer;
}
const myAnswers = []

$submitBtn.addEventListener('click' , e => {
    e.preventDefault();
    const answer = getSelected();
    if(answer){
        if(answer === qiuzData[currentQuiz].correct){
            score++
        }
        myAnswers.push(answer)
        currentQuiz++;
        if(currentQuiz < qiuzData.length){
            loadQuiz();
        }else{
            $qiuz.innerHTML = `
                <h2>U've answered correct to ${score}/${qiuzData.length} question</h2>
                <button class="buttoon" onclick="showMeTrueAnswers()">Show true answers</button>
            `
        }
    }else{
        alert('u havent chosen any answer')
    }
})

function showMeTrueAnswers(){
    const template = qiuzData.map((answer , index )=> {
        return finishTemplete(answer , index)
    }).join('')
    $qiuz.innerHTML = template
}

function finishTemplete(answer , index){
    return`
            <ol type="a' style="padding:20px; text-aling: center ; list-style-position:inside">
            <h2><span style="font-size: 1.5rem">${answer.question}</span></h2>
            <li>${answer.a}</li>
            <li>${answer.b}</li>
            <li>${answer.c}</li>
            <li>${answer.d}</li>
            <h5>True answer : <span style="color:red">${answer.correct}</span></h5>
            <h5 style="color:red">Your answer : ${myAnswers[index]}</h5>
            </ol>
    `
}