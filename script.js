const resultWrapper = document.querySelector('.result-wrapper');
const openAsideBtn = document.querySelector('.result-wrapper__btn--open');
const closeAsideBtn = document.querySelector('.result-wrapper__btn--close');

const inputText = document.getElementById('input-text');

const encryptBtn = document.getElementById('encrypt-btn');
const decryptBtn = document.getElementById('decrypt-btn');
const copyBtn = document.getElementById('copy-btn');

const emptyResult = document.querySelector('.result-wrapper__empty');
const result = document.querySelector('.result-wrapper__result-text');

const valuesToReplace = {
  'a': 'ai',
  'e': 'enter',
  'i': 'imes',
  'o': 'ober',
  'u': 'ufat',
};

// Encrypts text.
const encryptText = () => {
  if (!inputText.value) return;

  const encryptedValue = inputText.value.toLowerCase().replace(/[aeiou]/g, (letter) => valuesToReplace[letter]);

  emptyResult.style.display = 'none';
  result.innerHTML = encryptedValue;

  openResultWrapper();
};

// Decrypts text.
const decryptText = () => {
  if (!inputText.value) return;

  const decryptedValue = inputText.value.toLowerCase().replace(/(ai|enter|imes|ober|ufat)/g, (letter) => Object.keys(valuesToReplace).find(key => valuesToReplace[key] === letter));

  emptyResult.style.display = 'none';
  result.innerHTML = decryptedValue;

  openResultWrapper();
};

// Copies text.
const copyText = () => {
  navigator.clipboard.writeText(result.innerHTML);

  copyBtn.innerHTML = 'Valor copiado';

  setTimeout(() => {
    copyBtn.innerHTML = 'Copiar';
  }, 2000);
};

// Opens result wrapper.
const openResultWrapper = () => resultWrapper.classList.add('result-wrapper--show');

// Closes result wrapper.
const closeResultWrapper = () => resultWrapper.classList.remove('result-wrapper--show');

// Valids the pressed key.
inputText.addEventListener('input', e => {
  // Remove accents.
  inputText.value = e.target.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
});

// Prevent from typing anything else than letters.
inputText.addEventListener('keydown', e => {
  const regex = new RegExp("^[A-Z0-9]+$");

  if (regex.test(e.key)) {
    e.preventDefault();
    return;
  };
});

openAsideBtn.addEventListener('click', openResultWrapper);

closeAsideBtn.addEventListener('click', closeResultWrapper);

encryptBtn.addEventListener('click', encryptText);

decryptBtn.addEventListener('click', decryptText);

copyBtn.addEventListener('click', copyText);