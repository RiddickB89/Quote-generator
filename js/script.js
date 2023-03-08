import quotesCollectionOffline from "./quotes.js";

const quoteText = document.querySelector(".quote__text");
const quoteAuthor = document.querySelector(".quote__author");
const loader = document.querySelector(".loader");
const quoteContainer = document.querySelector(".quote");

const apiQuote = async function () {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`${response.status}:${response.statusText}`);
    }
    const quotesCollection = await response.json();
    const randomQuote =
      quotesCollection[Math.trunc(Math.random() * quotesCollection.length)];
    loadingEnd();
    showQuote(randomQuote);
  } catch (error) {
    console.error(error);
    apiQuoteOffline();
  }
};

window.addEventListener("load", apiQuote);

(function generateQuote() {
  document.querySelector(".quote__btn").addEventListener("click", apiQuote);
  document.querySelector(".twitter__btn").addEventListener("click", tweetQuote);
})();

function showQuote(randomQuote) {
  quoteText.innerHTML = `${randomQuote["text"]}`;
  quoteAuthor.innerHTML = `${
    randomQuote["author"] === null ? "Unknown" : randomQuote["author"]
  }`;
}

function apiQuoteOffline() {
  const randomQuote =
    quotesCollectionOffline[
      Math.trunc(Math.random() * quotesCollectionOffline.length)
    ];
  loadingEnd();
  if (!randomQuote) return;
  showQuote(randomQuote);
}

function tweetQuote() {
  const tweeterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(tweeterUrl, "_blank");
  console.log(tweeterUrl);
}

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function loadingEnd() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}
