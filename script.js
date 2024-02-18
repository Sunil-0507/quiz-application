const questions=[
    {
        question:"Which is largest animal in the world ?",
        answers:[
            
              { text:"shark",correct:false},
              { text:"Blue Whale",correct:true},
              { text:"Elephant",correct:false},
              { text:"Giraffe",correct:false},
        ]
    },
    { question:"Which is the smallest country in the world ?",
    answers:[
        
          { text:"Vatican city",correct:true},
          { text:"Bhutan",correct:false},
          { text:"Nepal",correct:false},
          { text:"Srilanka",correct:false},
    ]

    },
    { question:"Which is the largest desert in the world ?",
    answers:[
        
          { text:"Kalahari",correct:false},
          { text:"Gobi",correct:false},
          { text:"Sahara",correct:false},
          { text:"Antarctica",correct:true},
    ]

    },
    { question:"Which is the smallest continent in the world ?",
    answers:[
        
          { text:"Asia",correct:false},
          { text:"Australia",correct:true},
          { text:"Arctic",correct:false},
          { text:"Africa",correct:false},
    ]

    }
];
const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;
function startQuiz(){
    /*When we start the quiz it should reset the CurrentQuestionIndex and score to "0"*/ 
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    /* at the end we will start the quiz again so when we start the quiz the button should be next*/
    ShowQuestions();
}
function ShowQuestions(){
//hide the previous question and answer
    resetState();
    /*display the question along with answers (aptions)*/
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". "+ currentQuestion.question;
    currentQuestion.answers.forEach(answer=>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
            //adds the  true or false iin this data set correct
        }
        button.addEventListener("click",selectAnswer);
    });

}
function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
       const selectedBtn=e.target;
       const isCorrect=selectedBtn.dataset.correct==="true";
       if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;

       }
       else{
        selectedBtn.classList.add("incorrect");
       }
       //making the clicking of only one option disabling all other buttons after every click
       Array.from(answerButtons.children).forEach(button=>{
              if(button.dataset.correct==="true"){
                button.classList.add("correct");
              }
              button.disabled=true;
       });
       //next button display after clicking the answer if correct displays green else red
       nextButton.style.display="block";
}
function  showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";

}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        ShowQuestions();
    }
    else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
       if(currentQuestionIndex < questions.length){
        handleNextButton();

       }
       else{
        startQuiz();
       }
});
startQuiz();
