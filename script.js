let quizContainer=document.querySelector('#quiz');
let start = document.querySelector('#start');
let time = document.querySelector("#timer");
let sep=document.createElement('p');
let linebreak =document.createElement('br');
let correctAnswer='';
let times=60;
let score=0;
let i=0;
//buttons, divs, and other elements used in container requried to
//be declared in the functions otherwise they won't work

let questions=[
    {
        question: "The condition of an if/else statement is enclosed within",
        correct: "c",
        a:"a quotes",
        b:"b curly brackets",
        c:"c parenthesis",
        d:"d square brackets"
    },
    {
        question: "Commonly used dataypes do not include: ",
        correct: "c",
        a:"a strings",
        b:"b booleans",
        c:"c alerts",
        d:"d numbers",      
    },
    {
        question: "Arrays in Javascript can be used to store",
        correct: "d",
        a:"a numbers and strings",
        b:"b other arrays",
        c:"c booleans",
        d:"d all of the above"
    },
    {
        question:"The === in Javascript means",
        correct:"a",
        a: "a equality comparison",
        b: "b adding",
        c: "c subtracting",
        d: "d java"
    },
    {
        question:"HTML tags are usually surrounded by",
        correct:"b",
        a:"a ()",
        b:"b <>",
        c:"c []",
        d:"d {}"
    }
]

function timer(){
    let countdown=setInterval(function(){
        time.innerHTML = times;
        times--;

        if(times<0 || questions[i]===questions[questions.length-1]){
            clearInterval(countdown);
        }
    },1000);
}


function buildQuiz(){
    let bt1=document.createElement('button');
    let bt2=document.createElement('button');
    let bt3=document.createElement('button');
    let bt4=document.createElement('button');
    let btnSep=document.createElement('div');
    let sep2=document.createElement('p');
    let linebreak=document.createElement('br');
    for(i; i<questions.length;i++){
        console.log(questions[i].question);
        quizContainer.innerHTML=questions[i].question;
        quizContainer.style.textAlign="center";
        quizContainer.style.fontSize= '200%';
        quizContainer.append(btnSep);

        btnSep.append(bt1);
        bt1.setAttribute('value','a');
        bt1.textContent=questions[i].a;

        btnSep.append(bt2);
        bt2.setAttribute('value','b');
        bt2.textContent=questions[i].b;
        //btnSep.append(linebreak);

        btnSep.append(bt3);
        bt3.setAttribute('value','c');
        bt3.textContent=questions[i].c;
        //btnSep.append(linebreak);

        btnSep.append(bt4);
        bt4.setAttribute('value','d');
        bt4.textContent=questions[i].d;    
        btnSep.setAttribute('class','button-container');

        //set the attributes for the buttons above
        bt1.setAttribute('class','btn btn-primary button quizbtn');
        bt2.setAttribute('class','btn btn-primary button quizbtn');
        bt3.setAttribute('class','btn btn-primary button quizbtn');
        bt4.setAttribute('class','btn btn-primary button quizbtn'); 
        
        console.log('This is correct' + questions[i].correct);
        console.log(questions.length);
        // quizContainer.append(btnSep);
        // btnSep.append(sep);
        // sep.innerHTML = `\nScore: ${score}.`;
        quizContainer.append(btnSep);
        btnSep.append(sep);
        console.log(i);
        if(i<=0){
            correctAnswer = '';
        }
        else if(i>0){
            correctAnswer = questions[i-1].correct;
        }
        sep.innerHTML=`\nScore: ${score} \n The correct answer for the previous question was ${correctAnswer}`;

        //temp = questions[i].question.correct;
        return document.querySelectorAll('.quizbtn').forEach(element => {
            console.log('querying the buttons');
            console.log(i);
            element.addEventListener('click', function(event){
                if(element.value===(questions[i].correct)){
                    score++;
                    if (questions[i]===questions[questions.length-1]){
                        return ending();
                    }
                    //we require i++ after the if statemenet because we are checking the current i state above
                    i++;
                    buildQuiz();
                }
                else{
                    
                    if(questions[i]===questions[questions.length-1]){
                        return ending();
                    }
                    i++;
                    buildQuiz();
                }
            })
        })
    }
    
}

function ending(){
    let sep1= document.createElement('div');
    let header = document.createElement('h1');
    let par = document.createElement('p');
    let submit = document.createElement('button');
    let reset = document.createElement('button');
    let input = document.createElement('input');
    quizContainer.innerHTML='';
    quizContainer.append(header);
    header.innerHTML=`Quiz is finished, your score was ${score}`;
    quizContainer.append(par);
    par.innerHTML = "Please enter your initial then press submit or press reset to retry.";
    quizContainer.append(sep1);
    sep1.append(input);
    input.setAttribute('class','inputted');
    input.setAttribute('type','text');
    input.setAttribute('name','userInput');
    input.setAttribute('id', 'userInput');

    sep1.append(submit);
    submit.textContent='Submit';

    sep1.append(reset);
    reset.textContent='Restart Quiz';

    submit.addEventListener('click', function(event){
        event.preventDefault();
        console.log('it gets here');
        var x=document.querySelector('#userInput').value;
        console.log(x);
    
        let character = {
            name: x,
            score: score
        }
        console.log(input);
        localStorage.setItem('character', JSON.stringify(character));
        console.log(JSON.parse((localStorage.getItem('character'))).score);
    });
    
    reset.addEventListener('click', function(event){
        event.preventDefault();
        i=0;
        score=0;
        buildQuiz();
    });
}

start.addEventListener('click', ()=> {
    timer();
    buildQuiz();
});

