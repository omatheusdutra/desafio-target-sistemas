export default function reverse() {
  const result = document.getElementById('resultInvert');
  const wordInput = document.getElementById('wordInput');
  const word = wordInput.value.trim();

  let reversedWord = '';
  for (let i = word.length - 1; i >= 0; i--) {
    reversedWord += word[i];
  }
  result.textContent = reversedWord;
  wordInput.value = '';
}

const button = document.getElementById('invertButton');
button.addEventListener('click', reverse);
