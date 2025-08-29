const theme_toggle=document.querySelector("#theme-toggle");
var theme;
function themeToggler()
{
    const sun=document.querySelector("#sun");
    const moon=document.querySelector("#moon");
    if(document.documentElement.classList.contains("dark"))
    {
        document.documentElement.classList.remove("dark");
        moon.classList.add("hidden");
        sun.classList.remove("hidden");
        localStorage.setItem("theme","light");
    }
    else
    {
        document.documentElement.classList.add("dark");
        moon.classList.remove("hidden");
        sun.classList.add("hidden");
        localStorage.setItem("theme","dark");
    }
}

theme_toggle.addEventListener("click" , function()
{
    themeToggler();
});

if(localStorage.getItem("theme")==="dark")
{
    document.documentElement.classList.add("dark");
    moon.classList.remove("hidden");
    sun.classList.add("hidden");

}
else
{
    document.documentElement.classList.remove("dark");
    moon.classList.add("hidden");
    sun.classList.remove("hidden");
}


// --------------------------------------------------------------------------

const numberdiv=document.querySelector("#number-div");
const questiondiv=document.querySelector("#question-div");
const answersdiv=document.querySelector("#answers-div");
const btnsdiv=document.querySelector("#btns-div");
const feedbackdiv=document.querySelector("#feedback-div");
const startbutton=document.querySelector("#start-button");
const startscreen=document.querySelector("#start-screen");
const quizcontainer=document.querySelector("#quiz-container");
const nextButton = document.getElementById('next-button');
const endscreen=document.querySelector("#end-screen");
const endMessage = document.getElementById('end-message');
const finalScoreDisplay = document.getElementById('final-score');
const previousscore = document.getElementById('previous-score');
const restartButton = document.getElementById('restart-button');
//starting the quiz
let score=0;
let curind=0;

startbutton.addEventListener("click",function(){
    startscreen.classList.toggle("hidden");
    quizcontainer.classList.toggle("hidden");
    start_mainController(curind);

});

const htmlQuestions = [
  {
    question: "Which HTML element is used to define the title of a document, displayed in a browser's title bar or tab?",
    options: [
      "<body>",
      "<head>",
      "<title>",
      "<h1>"
    ],
    correctAnswer: 2
  },
  {
    question: "Which attribute is used to provide an alternative text for an image?",
    options: [
      "title",
      "src",
      "href",
      "alt"
    ],
    correctAnswer: 3
  },
  {
    question: "How do you create a hyperlink in HTML?",
    options: [
      "<link>",
      "<href>",
      "<a>",
      "<url>"
    ],
    correctAnswer: 2
  },
  {
    question: "What is the correct HTML tag for inserting a line break?",
    options: [
      "<lb>",
      "<br>",
      "<p>",
      "<break>"
    ],
    correctAnswer: 1
  },
  {
    question: "What does HTML stand for?",
    options: [
      "HyperText Markup Language",
      "HyperTransfer Markup Language",
      "HighText Machine Language",
      "Hyperlink and Text Markup Language"
    ],
    correctAnswer: 0
  },
  {
    question: "What is the purpose of the <!DOCTYPE html> declaration?",
    options: [
      "It defines the main structure of an HTML page.",
      "It links to an external stylesheet.",
      "It informs the browser about the document type and version of HTML being used.",
      "It creates a new paragraph."
    ],
    correctAnswer: 2
  },
  {
    question: "Which of the following is the correct way to add a comment in HTML?",
    options: [
      "// My comment",
      "<!-- My comment -->",
      "/* My comment */",
      "<comment>My comment</comment>"
    ],
    correctAnswer: 1
  },
  {
    question: "Which HTML element is the largest heading?",
    options: [
      "<h6>",
      "<heading>",
      "<h1>",
      "<head>"
    ],
    correctAnswer: 2
  },
  {
    question: "Which HTML tag is used to create an unordered list?",
    options: [
      "<ol>",
      "<ul>",
      "<li>",
      "<dl>"
    ],
    correctAnswer: 1
  },
  {
    question: "Which attribute is used to define inline CSS styles for an element?",
    options: [
      "class",
      "style",
      "font",
      "id"
    ],
    correctAnswer: 1
  }
];
function start_mainController(i)
{
    update_questionno(i);
    update_question(i);
    choices_generate(i);
    
}
function update_questionno(i)
{
    const total=htmlQuestions.length;
    const current=i+1;
    numberdiv.textContent = `${current} out of ${total}`;
};

function update_question(i)
{
    questiondiv.textContent=htmlQuestions[i].question;
    questiondiv.classList.add("p-3","m-3","text-xl","font-bold","bg-yellow-300","dark:bg-yellow-600","rounded-xl")
};

function choices_generate(i)
{
   htmlQuestions[i].options.forEach((element, index) => {
    createbutton(element, index);
});
}
function createbutton(e , index)
{
    const btn=document.createElement("button");
    btn.classList.add("w-[98%]","p-2","m-2","text-l","font-semibold","bg-gray-300","rounded-xl","pl-4","hover:bg-blue-500","text-left",);
    btn.textContent=e;
    btn.id=index;
    answersdiv.appendChild(btn);
}

function nextpop()
{
    nextButton.classList.remove("hidden");
}

let selectedAnswer = null;
answersdiv.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        if (selectedAnswer) {
            selectedAnswer.classList.remove('bg-green-400');
        }
        const clickedButton = event.target;
        clickedButton.classList.add('bg-green-400');

        selectedAnswer = clickedButton;
        nextpop();
    }
});
function update_score()
{
    if(parseInt(selectedAnswer.id) === htmlQuestions[curind].correctAnswer)
    {
        score=score+1;
        feedbackdiv.innerHTML=`Correct Answer!`;
        feedbackdiv.classList.add("bg-green-500");
    }
    else
    {
        feedbackdiv.innerHTML=`Wrong Answer!`;
        feedbackdiv.classList.add("bg-red-500");
    }
    setTimeout(() => {
        feedbackdiv.innerHTML = '';
        feedbackdiv.classList.remove("bg-green-500", "bg-red-500");
    }, 1400);
}
function clearall()
{
    questiondiv.innerHTML="";
    answersdiv.innerHTML="";
    selectedAnswer=null;
}
const existingScores = JSON.parse(localStorage.getItem('quizScores')) || [];
function pushResults() {
  existingScores.push(score);
  localStorage.setItem('quizScores', JSON.stringify(existingScores));
}
function endmsd()
{

}
nextButton.addEventListener("click", function() {
    update_score();
    curind = curind + 1;
    clearall();

    if (curind < htmlQuestions.length) {
        nextButton.classList.add("hidden");
        start_mainController(curind);
    } else {
        nextButton.classList.add("hidden");
        // Save the score and then show the end screen
        quizcontainer.classList.toggle("hidden");
        puResults();
        endmsd();
    }
});