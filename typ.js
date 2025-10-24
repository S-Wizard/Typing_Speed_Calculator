 let currentParagraph = '';
    let timeLeft = 60;
    let timerInterval = null;
    let testStarted = false;
    let startTime = null;
    
    async function loadParagraph() {
      const res = await fetch('http://127.0.0.1:5000/api/para');
      const data = await res.json();
      currentParagraph = data.paragraph;
      document.getElementById('para').innerText = currentParagraph;
    }

    let bestWPM = localStorage.getItem('hw') || 0;
document.getElementById('hw').innerText = bestWPM;

  async function calculate() { 
  clearInterval(timerInterval); 
  document.getElementById('typed').disabled = true; 
 
  const typed = document.getElementById('typed').value; 
  const actualTime = Math.floor((Date.now() - startTime) / 1000); 
 
  const res = await fetch('http://127.0.0.1:5000/api/calculate', { 
    method: 'POST', 
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify({  
      typed: typed,  
      original: currentParagraph, 
      time: actualTime 
    }) 
  }); 
 
  const data = await res.json(); 

const para = document.getElementById('para');
const typedInput = document.getElementById('typed');
let cursorIndex = 0;

function updateCursor() {
   
    const text = currentParagraph || ""; 
    let display = text.slice(0, cursorIndex) + '<span class="cursor"></span>' + text.slice(cursorIndex);
    para.innerHTML = display;
}
typedInput.addEventListener('input', (e) => {
    cursorIndex = e.target.value.length; // move cursor according to input length
    updateCursor();
});

updateCursor();
document.getElementById('typed').addEventListener('input', (e) => {
    const typedLength = e.target.value.length;
    cursorIndex = typedLength; 
    updateCursor();
});


updateCursor();

  document.getElementById('acc').innerText = `${data.accuracy}%`; 
  document.getElementById('wpm').innerText = data.wpm; 
  document.getElementById('err').innerText = data.errors; 
 
   if (data.wpm > bestWPM) {
    bestWPM = data.wpm;
    localStorage.setItem('hw', bestWPM);
    document.getElementById('hw').innerText = bestWPM;
  }

  document.getElementById('resultPopup').style.display = 'flex'; 
  const okb = document.getElementById('okBtn');
  okb.addEventListener('click',()=>{

    document.getElementById('resultPopup').style.display = 'none'; 
  })
}
    document.getElementById('typed').addEventListener('input', function(e) {
      const typed = e.target.value;
      const target = currentParagraph;
      

      let highlightedText = '';
      for (let i = 0; i < target.length; i++) {
        if (i < typed.length) {
          if (typed[i] === target[i]) {
            highlightedText += `<span class="correct">${target[i]}</span>`;
          } 
          else {
            highlightedText += `<span class="wrong">${target[i]}</span>`;
          }
          
        }
        else if (i === typed.length) {
 
            highlightedText += `<span class="cursor"></span>${target[i]}`;
        }
         else {
          highlightedText += target[i];
        }
         if (typed.length >= target.length) {
        highlightedText += `<span class="cursor"></span>`;
    }

    para.innerHTML = highlightedText;
      }
      document.getElementById('para').innerHTML = highlightedText;
      
      if (!testStarted) {
        testStarted = true;
        startTime = Date.now();
        startTimer();
      }
    });

    function startTimer() {
      const timerDisplay = document.getElementById('timerr');
      
      timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = timeLeft + 's';
        
        if (timeLeft <= 10) {
          timerDisplay.style.color = '#f44336';
        } else if (timeLeft <= 30) {
          timerDisplay.style.color = '#ff9800';
        }
        
        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          document.getElementById('typed').disabled = true;
          calculate();
        }
      }, 1000);
    }
document.getElementById('rbt').addEventListener('click', () => {
  location.reload(); 
});
    loadParagraph();