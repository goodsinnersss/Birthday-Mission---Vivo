const screens=[...document.querySelectorAll('.screen')];
function showScreen(n){screens.forEach((s,i)=>s.classList.toggle('active',i===n));window.scrollTo({top:0,behavior:'smooth'})}
document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>showScreen(Number(b.dataset.go))));

const questions=[
{question:'Why does Jenni want to be rich?',answers:['To buy a private island','To buy everything Vivo wants because he eats a lot 🍜','To become a billionaire influencer','To escape adulthood'],correct:1,yes:'Correct! Your girlfriend’s financial motivation is directly connected to your appetite. Please keep eating responsibly. 😭💸',no:'Not quite, birthday boy! 😭 Think about who spends the most money because of your appetite. Try again! 🍜💸'},
{question:'How many times can Vivo eat in one day?',answers:['2 times','3 times','5 times','Every time he sees food'],correct:2,yes:'Correct! Vivo has unlocked the five-meals-a-day achievement. 🍜🏆',no:'Oops, incorrect! Vivo’s stomach capacity is clearly being underestimated. Count those meals again! 🍽️😭'},
{question:'Why is Vivo never full?',answers:['He has a second stomach','He is secretly a food critic','He has the appetite of a hungry worm','Jenni hasn’t fed him enough'],correct:2,yes:'Correct! The birthday boy is powered by an unlimited food supply. 🪱😭',no:'Not quite! The mystery of Vivo’s endless appetite remains unsolved. Try again, hungry boy! 🪱😂'},
{question:'What changed after Vivo got together with Jenni?',answers:['He became happier','He became healthier','He became more well-maintained','All of the above'],correct:3,yes:'Correct! Jenni’s love comes with emotional support and premium health benefits. 🥹🫶',no:'Oops! Have you forgotten the magical effects of Jenni’s love? Think again, Sayang. 🥺🫶'},
{question:'What happened to Vivo’s hairstyle after dating Jenni?',answers:['From potongan panci to handsome prince','Become much more handsome than before','From biasa aja to "you look good bro"','All of the above'],correct:3,yes:'Correct! Jenni successfully completed the Boyfriend Makeover Mission. ✂️✨',no:'Incorrect! Please remember Vivo’s legendary hairstyle transformation. The potongan panci era must not be forgotten. Try again, handsome boy! 😭✂️'}];
let qi=0,score=0,answered=false;
const qn=document.getElementById('questionNumber'),qt=document.getElementById('questionText'),ab=document.getElementById('answerButtons'),fb=document.getElementById('answerFeedback'),nb=document.getElementById('nextButton'),bar=document.getElementById('progressBar');
function renderQuestion(){const q=questions[qi];answered=false;qn.textContent=`QUESTION ${qi+1} / ${questions.length}`;qt.textContent=q.question;bar.style.width=`${((qi+1)/questions.length)*100}%`;ab.innerHTML='';fb.classList.add('hidden');nb.classList.add('hidden');q.answers.forEach((a,i)=>{const b=document.createElement('button');b.textContent=`${String.fromCharCode(65+i)}. ${a}`;b.onclick=()=>{if(answered)return;answered=true;if(i===q.correct)score++;fb.textContent=i===q.correct?q.yes:q.no;fb.classList.remove('hidden');nb.classList.remove('hidden');[...ab.children].forEach(x=>x.disabled=true)};ab.appendChild(b)})}
document.getElementById('startQuiz').onclick=()=>{qi=0;score=0;showScreen(3);renderQuestion()};
nb.onclick=()=>{qi++;if(qi<questions.length){renderQuestion();return}showScreen(4);document.getElementById('finalScore').textContent=`${score}/${questions.length}`;const msgs=['Your stomach understands Vivo better than your brain does. 😭🍜','Your stomach understands Vivo better than your brain does. 😭🍜','Your girlfriend knowledge needs a little seasoning. Maybe ask for a snack break? 🍪🧠','Three correct answers! Basically the same number of meals Vivo eats before noon. 🍽️','Not bad! One answer probably got distracted by the thought of food. 🍜😭','PERFECT SCORE! 🏆❤️ Jenni is officially impressed. 😌✨'];document.getElementById('scoreMessage').textContent=msgs[score]};
document.getElementById('acceptMission').onclick=()=>showScreen(8);
document.getElementById('laterMission').onclick=()=>{const f=document.getElementById('finalFeedback');f.textContent='ARE YOU SURE? 🚨 The birthday boss is disappointed. Also, your girlfriend has already planned the date, so… nice try. 😭💅';f.classList.remove('hidden')};
document.getElementById('replay').onclick=()=>showScreen(0);

const audio = document.getElementById('audio');
const toggle = document.getElementById('musicToggle');
const icon = document.getElementById('musicIcon');
const text = document.getElementById('musicText');

audio.volume = 0.45;
audio.loop = true;

function ui(){
  const playing = !audio.paused;
  icon.textContent = playing ? 'Ⅱ' : '♫';
  text.textContent = playing ? 'PAUSE' : 'PLAY';
}

async function playMusic(){
  try {
    await audio.play();
  } catch (e) {
    // Some browsers block autoplay with sound until the visitor interacts.
  }
  ui();
}

// Only Play / Pause. There is deliberately no song selector or upload control.
toggle.addEventListener('click', async (event) => {
  event.stopPropagation();
  if (audio.paused) {
    await playMusic();
  } else {
    audio.pause();
    ui();
  }
});

// Try to autoplay immediately when the website opens.
window.addEventListener('load', () => {
  ui();
  playMusic();
});

// If autoplay is blocked, start the same local MP3 on the visitor's first
// interaction anywhere on the page. Do not interfere with the music button.
document.addEventListener('pointerdown', (event) => {
  if (event.target.closest('#musicToggle')) return;
  if (audio.paused) playMusic();
}, { once: true });

audio.addEventListener('play', ui);
audio.addEventListener('pause', ui);
