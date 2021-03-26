//Getting all required Elements
const btnStart = document.querySelector('.btn-start');
const btnQuit = document.querySelector('.quit');
const btnRestart = document.querySelector('.restart');
const btnNext = document.querySelector('.next-btn');


const infoBox = document.querySelector('.info-box');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const resultRestartBtn = resultBox.querySelector('.restart');
const resultQuittBtn = resultBox.querySelector('.quit');

const queText = document.querySelector('.que-text');
const optionList = document.querySelector('.option-list');
const timerSec = document.querySelector('.timer-sec');
const timeLine = document.querySelector('.time-line');
const timeOff = document.querySelector('.time-text');

let queCount = 0;
let userScore = 0;
let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//function
//getting questions and options from array
function showQuestions(index){
  let queTag = '<span>' + questions[index].number + '. '+ questions[index].question +'</span>';
  let optionTag = '<div class="option"><span>'  + questions[index].options[0]+'</span></div>'
                  + '<div class="option"><span>' + questions[index].options[1]+'</span></div>'
                  + '<div class="option"><span>' + questions[index].options[2]+'</span></div>'
                  +'<div class="option"><span>' + questions[index].options[3]+ '</span></div>';

  const bottomQueCounter = quizBox.querySelector('.total-que');
  let currentQueTag = '<span><p>' + questions[index].number + '</p><p>of</p><p>' + questions.length +'</p><p>Questions</p></span>';

  queText.innerHTML = queTag;
  optionList.innerHTML = optionTag;
  bottomQueCounter.innerHTML = currentQueTag;


  const option = optionList.querySelectorAll('.option');
  for (let i = 0; i < option.length; i ++){
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}


function optionSelected(answer){
  clearInterval(timeCount);
  clearInterval(counterLine);
  let userAns = answer.textContent;
  let correctAns = questions[queCount].answer;
  let allOptions = optionList.children.length;
  if( userAns === correctAns){
    userScore += 1;
    answer.classList.add("correct");
    answer.insertAdjacentHTML("beforeend", tickIcon);
  }else{   
    answer.classList.add("incorrect");
    answer.insertAdjacentHTML("beforeend", crossIcon);

    //if answers is incorrect then automtically show correct answer
    for (let index = 0; index < allOptions; index++){
      if(optionList.children[index].textContent == correctAns){
        optionList.children[index].setAttribute("class", "option correct");
        optionList.children[index].insertAdjacentHTML("beforeend", tickIcon);

      }
    }

  }
  //once user Selected disabled all options
  for (let index = 0; index < allOptions; index++){
    optionList.children[index].classList.add("disabled");
  }
  btnNext.style.display = "block";
 
}


//timeset
let timeCount;
let timeValue = 15;
let widthValue = 0;

function setTime(time){
 timeCount = setInterval(timer, 1000);
 function timer(){
   timerSec.textContent = time;
   time--;
   if( time < 9){
     let addZero = timerSec.textContent;
     timerSec.textContent = "0" + addZero;
   }
   if(time < 0){
     clearInterval(timeCount);
     timerSec.textContent = "00";
     timeOff.textContent = "Time off";

     let correctAns = questions[queCount].answer;
     let allOptions = optionList.children.length;

     for (let index = 0; index < allOptions; index++){
      if(optionList.children[index].textContent == correctAns){
        optionList.children[index].setAttribute("class", "option correct");
        optionList.children[index].insertAdjacentHTML("beforeend", tickIcon);

      }
    }

    for (let index = 0; index < allOptions; index++){
      optionList.children[index].classList.add("disabled");
    }
    btnNext.style.display = "block";
  
   }
 }

}


function setTimeLine(time){
  counterLine = setInterval(timer, 29);
  function timer(){
    time += 1;
    timeLine.style.width = time + "px";
    if(time > 549){
      clearInterval(counterLine);
    }
  }
 
 }
 

 //Result box
function showResultBox(){
  infoBox.classList.remove("active");
  quizBox.classList.remove("active");
  resultBox.classList.add("active");

  const scoreText = resultBox.querySelector('.score-text');
  if( userScore > 3){
    let scoreTag = '<span>and Congrats! 😆, You got only <p>' + userScore + '</p> out of <p>' + questions.length +'</p></span>';
    scoreText.innerHTML = scoreTag;
  }
  else if(userScore > 1){
    let scoreTag = '<span>and Nice 😎, You got only <p>' + userScore + '</p> out of <p>' + questions.length +'</p></span>';
    scoreText.innerHTML = scoreTag;
  }
  else{
    let scoreTag = '<span>and Sorry 😱, You got only <p>' + userScore + '</p> out of <p>' + questions.length +'</p></span>';
    scoreText.innerHTML = scoreTag;
  }
}



//event
//start button click -> infobox 
btnStart.onclick = ()=>{
  infoBox.classList.add("active");
};

btnQuit.onclick = ()=>{
  infoBox.classList.remove("active");
};



btnRestart.onclick = ()=>{
  btnStart.style.display = "none";
  infoBox.classList.remove("active");
  quizBox.classList.add("active");
  showQuestions(0);
  setTime(timeValue);
  setTimeLine(widthValue);
};

btnNext.onclick = ()=>{
  if(queCount < questions.length - 1){
    queCount++;
    showQuestions(queCount);  
    clearInterval(timeCount);
    setTime(timeValue);
    clearInterval(counterLine);
    setTimeLine(widthValue);
    btnNext.style.display = "none";
    timeOff.textContent = "Time Left";
  }else{
    clearInterval(timeCount);
    setTime(timeValue);
    clearInterval(counterLine);
    showResultBox();
  }

  if(queCount == 4){
    btnNext.innerText = "Done!";
  }


}

resultQuittBtn.onclick = () =>{
  window.location.reload();
}


