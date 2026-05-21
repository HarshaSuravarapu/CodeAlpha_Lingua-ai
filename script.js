const inputText = document.getElementById("inputText");
const translatedText = document.getElementById("translatedText");

const sourceLang = document.getElementById("sourceLang");
const targetLang = document.getElementById("targetLang");

const swapBtn = document.getElementById("swapBtn");


// TRANSLATE FUNCTION
async function translateText() {

  const text = inputText.value;

  if (text.trim() === "") {
    alert("Please enter text");
    return;
  }

  translatedText.innerHTML = "Translating...";

  const url =
    `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang.value}&tl=${targetLang.value}&dt=t&q=${encodeURI(text)}`;

  try {

    const response = await fetch(url);

    const data = await response.json();

    translatedText.innerHTML = data[0][0][0];

  } catch (error) {

    translatedText.innerHTML = "Translation failed";

  }
}


// COPY FUNCTION
function copyText() {

  navigator.clipboard.writeText(
    translatedText.innerText
  );

  alert("Copied!");
}


// TEXT TO SPEECH
function speakText() {

  const speech = new SpeechSynthesisUtterance(
    translatedText.innerText
  );

  speech.lang = targetLang.value;

  window.speechSynthesis.speak(speech);
}


// VOICE INPUT
function startVoiceInput() {

  const recognition =
    new webkitSpeechRecognition() ||
    new SpeechRecognition();

  recognition.lang = sourceLang.value;

  recognition.start();

  recognition.onresult = function(event) {

    inputText.value =
      event.results[0][0].transcript;

  };
}


// SWAP LANGUAGES
swapBtn.addEventListener("click", () => {

  let temp = sourceLang.value;

  sourceLang.value = targetLang.value;

  targetLang.value = temp;

});