const encryptButton = document.querySelector(".encryptButton");
const decryptButton = document.querySelector(".decryptButton");
const person = document.querySelector(".personContainer");
const paragraphContainer = document.querySelector(".paragraphContainer");
const resultContainer = document.querySelector(".resultContainer");
const resultText = document.querySelector(".resultText");

const encryptionKeys = {
  enter: "e",
  imes: "i",
  ai: "a",
  ober: "o",
  ufat: "u",
};

function encrypt() {
  const textBox = document.querySelector(".textBox");
  validateText();

  if (!textBox.classList.contains("error")) {
    resultText.textContent = encryptText(textBox.value);
    showResult();
  }
}

function decrypt() {
  const textBox = document.querySelector(".textBox");
  resultText.textContent = decryptText(textBox.value);
  showResult();
}

function showResult() {
  person.classList.add("hide");
  paragraphContainer.classList.add("hide");
  resultContainer.classList.add("show");
}

function encryptText(message) {
  let finalText = "";

  for (let i = 0; i < message.length; i++) {
    switch (message[i]) {
      case "a":
        finalText += "ai";
        break;
      case "e":
        finalText += "enter";
        break;
      case "i":
        finalText += "imes";
        break;
      case "o":
        finalText += "ober";
        break;
      case "u":
        finalText += "ufat";
        break;
      default:
        finalText += message[i];
    }
  }
  return finalText;
}

function decryptText(message) {
  let finalText = "";
  let i = 0;

  while (i < message.length) {
    let found = false;
    for (const key in encryptionKeys) {
      if (message.startsWith(key, i)) {
        finalText += encryptionKeys[key];
        i += key.length;
        found = true;
        break;
      }
    }
    if (!found) {
      finalText += message[i];
      i++;
    }
  }
  return finalText;
}

function validateText() {
  const textBox = document.querySelector(".textBox");
  const text = textBox.value;

  if (text.length > 0) {
    const regex = /^[a-zñ ]+$/;

    if (!regex.test(text)) {
      textBox.classList.add("error");
      alert("¡Error! Solo se permiten letras minúsculas, sin acentos.");
    } else {
      textBox.classList.remove("error");
    }
  }
}

document.querySelector(".textBox").addEventListener("blur", validateText);

document.querySelector(".btn-copy").addEventListener("click", function () {
  const content = resultText.textContent;
  navigator.clipboard.writeText(content);
});

encryptButton.addEventListener("click", encrypt);
decryptButton.addEventListener("click", decrypt);