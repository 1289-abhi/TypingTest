//variables
let timeLeft;
let timeLimit;
let typingValue;
let typingContent = document.getElementById('typingContent');
function setValues() {
  time=document.getElementById('time').value;
  let difficulty = document.getElementById('difficulty').value;
  timeLimit=60*Number(time);
  timeLeft = timeLimit;
  document.getElementById('timingOptions').classList.add('animation');
  if (difficulty == "easy") {
    typingValue = `Scolding is something common in student life. Being a naughty boy, I am always scolded by my parents. But one day I was severely scolded by my English teacher. She infect teaches well. But that day, I could not resist the temptation that an adventure of Nancy Drew offered. While she was teaching, I was completely engrossed in reading that book. Nancy Drew was caught in the trap laid by some smugglers and it was then when I felt a light tap on my bent head. The teacher had caught me red handed. She scolded me then and there and insulted me in front of the whole class. I was embarrassed. My cheeks burned being guilty conscious. When the class was over, I went to the teacher to apologize.`;
  }
  else if (difficulty == "medium") {
    typingValue = `Zebras are several species of African equids (horse family) united by their distinctive black and white striped coats. Their stripes come in different patterns, unique to each individual. They are generally social animals that live in small harems to large herds. Unlike their closest relatives the horses and donkeys, zebras have never been truly domesticated. The unique stripes of zebras make them one of the animals most familiar to people. They occur in a variety of habitats, such as grasslands, savannas, woodlands, thorny scrublands, mountains, and coastal hills. However, various anthropogenic factors have had a severe impact on zebra populations, in particular hunting for skins and habitat destruction.`;
  }
  else if (difficult == "hard") {
    typingValue =`Paragraphs are the building blocks of papers. Many students define paragraphs in terms of length: a paragraph is a groupof at least five sentences, a paragraph is half a page long, etc. In reality, though, the unity and coherence of ideas among sentences is what constitutes a paragraph. A paragraph is defined as "a group of sentences or a single sentence that forms a unit" (Lunsford and Connors 116). Length and appearance do not determine whether a section in a paper is a paragraph. For instance, in some styles of writing, particularly journalistic styles, a paragraph can be just one sentence long. Ultimately, a paragraph is a sentence or group of sentences that support one main idea. In this handout, we will refer to this as the "controlling idea," because it controls what happens in the rest of the paragraph.`;
  }
  typingContent.innerHTML = typingValue;
}
let currentTimer = document.getElementById('TM');
let currentGrossSpeed = document.getElementById('grossSpeed');
let currentNetSpeed = document.getElementById('netSpeed');
let currentErrors = document.getElementById('ER');
let currentAccuracy = document.getElementById('AC');
let typedContent = document.getElementById('typedContent');
let resetButton = document.getElementById('resetButton');
let restartButton = document.getElementById('restartButton');
let finalGrossSpeed = document.getElementById('GS');
let finalNetSpeed = document.getElementById('NS');
let finalTimer = document.getElementById('timer');
let finalErrors = document.getElementById('errors');
let finalAccuracy = document.getElementById('accuracy');
let graphs = document.getElementById('Graphs');

let total_errors = 0;
let characterTyped = 0;
let timeElapsed = 0;
let timer=null;
let speedStats = null;
let accuracy = 0;
let errors = 0;
let accuracyVal;
let wordTyped = 0;
let recentWordTyped=0;
let index=0;


//functions
function randomContent() {
  typingContent.textContent = null;
  typingValue.split('').forEach(i => {
    var letter = document.createElement('span');
    letter.innerText = i;
    typingContent.appendChild(letter);
  });
}

function charChecker() {

  input = typedContent.value;
  inputArr = input.split('');

  characterTyped+=1;
  errors = 0;

  letterArray = typingContent.querySelectorAll('span');
  letterArray.forEach((char, i) => {
    let typedChar = inputArr[i];

    if (typedChar == null) {
      char.classList.remove('correct_char');
      char.classList.remove('incorrect_char');

    } else if (typedChar === char.innerText) {
      char.classList.add('correct_char');
      char.classList.remove('incorrect_char');

    } else {
      char.classList.add('incorrect_char');
      char.classList.remove('correct_char');

      errors+=1;
    }
  });
  currentErrors.textContent = total_errors + errors;
  let correctCharacters = (characterTyped - (total_errors + errors));
  accuracyVal = ((correctCharacters / characterTyped) * 100);
  currentAccuracy.textContent = Math.round(accuracyVal)+'%';

  if (input.length == typingValue.length) {
    finishGame();
  }
}

function updateTimer() {
  if (timeLeft > 0) {
    timeLeft-=1;
    timeElapsed+=1;
    currentTimer.textContent = timeLeft + "s";
  }
  else {
    finishGame();
  }
}

function finishGame() {
  clearInterval(timer);
  clearInterval(speedStats);
  graphs.style.display = 'block';
  chartMaker();
  typedContent.style.display = "none";
  resetButton.style.display = "block";
  restartButton.style.display = "block";
  wordTyped = typedContent.value.split(' ').length;
  gross_speed = Math.round(((wordTyped/timeElapsed)*60));
  finalGrossSpeed.textContent = gross_speed;
  net_speed = Math.round(gross_speed *(accuracyVal/100));
  finalNetSpeed.textContent = net_speed;

  typingContent.innerHTML= `<h2>Your Results</h2>`;
  finalTimer.style.width = '20%';
  finalErrors.style.width = '20%';
  finalAccuracy.style.width = '20%';
  currentNetSpeed.style.width = '20%';
  currentGrossSpeed.style.width = '20%';
  currentGrossSpeed.style.display = "block";
  currentNetSpeed.style.display = "block";


}

function startGame() {
  typedContent.setAttribute("placeholder",'');
  randomContent();
  clearInterval(timer);
  clearInterval(speedStats);
  timer = setInterval(updateTimer, 1000);
  speedStats = setInterval(statValue, 10000);
}

let gross_speed_Arr = [];
let net_speed_Arr = [];

function statValue() {
  var partWordTyped = typedContent.value.split(' ').length - recentWordTyped;
  gross_speed_Arr[index] = Math.max(Math.round(((partWordTyped/10)*60)),0);
  net_speed_Arr[index] = Math.max(Math.round(gross_speed_Arr[index] *(accuracyVal/100)),0);
  recentWordTyped = typedContent.value.split(' ').length;
  index+=1;
}
function resetValues() {
  timeLeft = timeLimit;
  timeElapsed = 0;
  errors = 0;
  total_errors = 0;
  accuracy = 0;
  characterTyped = 0;
  wordTyped = 0;
  gross_speed_Arr.length = 0;
  net_speed_Arr.length = 0;
  index=0;

  typingContent.textContent = "Paragraphs are the building blocks of papers. Many students define paragraphs in terms of length: a paragraph is a groupof at least five sentences, a paragraph is half a page long, etc. In reality, though, the unity and coherence of ideas among sentences is what constitutes a paragraph. A paragraph is defined as “a group of sentences or a single sentence that forms a unit” (Lunsford and Connors 116). Length and appearance do not determine whether a section in a paper is a paragraph. For instance, in some styles of writing, particularly journalistic styles, a paragraph can be just one sentence long. Ultimately, a paragraph is a sentence or group of sentences that support one main idea. In this handout, we will refer to this as the “controlling idea,” because it controls what happens in the rest of the paragraph.";
  typedContent.style.display = "block";
  typedContent.value = "";
  currentAccuracy.textContent = '100%';
  currentTimer.textContent = timeLeft +'s';
  currentErrors.textContent = 0;
  resetButton.style.display = "none";
  restartButton.style.display = "none";
  currentNetSpeed.style.display = "none";
  currentGrossSpeed.style.display = "none";
  finalTimer.style.width = '33%';
  finalErrors.style.width = '33%';
  finalAccuracy.style.width = '33%';
  typedContent.setAttribute("placeholder",'Start Typing');
  graphs.style.display = "none";

}

function chartMaker() {
  var seconds = [];
  for (var i = 6; i <= timeLimit; i+=10) {
    seconds.push(i);
  }
  var netSpeedValues = net_speed_Arr;
  var grossSpeedValues = gross_speed_Arr;
  new Chart("netSpeedChart", {
    type: "line",
    data: {
      labels: seconds,
      datasets: [{
        backgroundColor:"#CC97FB",
        data: netSpeedValues
      }]
    },
    options: {
      title:{display:true,
              text: 'Net Speed'},
      legend: {display: false},
       scales: {
            yAxes: [{
                 gridLines: {
                    display: false,
                }
            }],
            xAxes: [{
                 gridLines: {
                    display: false,
                }
            }]
       },

    }
  });

  new Chart("grossSpeedChart", {
    type: "line",
    data: {
      labels: seconds,
      datasets: [{
        backgroundColor:"#CC97FB",
        data: grossSpeedValues
      }]
    },
    options: {
      title:{display:true,
              text: 'Gross Speed'},
      legend: {display: false},
       scales: {
            yAxes: [{
                 gridLines: {
                    display: false,
                }
            }],
            xAxes: [{
                 gridLines: {
                    display: false,
                }
            }]
       },

    }
  });

}
