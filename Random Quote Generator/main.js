const quoteText = document.querySelector(".quote"),
quoteButton = document.querySelector("button"),
author = document.querySelector(".Auth_name"),
soundButton = document.querySelector(".sound"),
copyButton = document.querySelector(".copy"),
TwitterButton = document.querySelector(".twitter");

//Random Quote Function 
async function RandomQuote() {
    quoteButton.classList.add("Loading");
    quoteButton.innerHTML = "Loading..."

    //Fetching Quotes Object using fecth api..
    const API = await fetch("https://api.quotable.io/random");
    //converting the object into json() format.
    const Response = await API.json();

    //Extracting Quote and Author Name from Json.
    const QuoteContent = Response.content;
    const QuoteAuthor = Response.author;

    //Using DOM property to display the Quote and Author Name 
    quoteText.innerHTML = QuoteContent;
    author.innerHTML = QuoteAuthor;

    quoteButton.innerHTML = "New Quote";
    quoteButton.classList.remove("Loading");
}

//Function For Quote Reader.

function QuoteReader(){
    //unsing a function called SpeechSynthesisUtterance to read the text.
    let QuoteReader = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${author.innerText}`);
    speechSynthesis.speak(QuoteReader);
//     let AuthorNameReader = new SpeechSynthesisUtterance(`by ${author.innerText}`);
//     speechSynthesis.speak(AuthorNameReader);
}

//Function For Copy Button....
function copyText() {
    //writetext() property writes the string to the sys Clipboard...
    navigator.clipboard.writeText(quoteText.innerText);
    alert("Quote Copied to clipboard");
}

//Function for Twitter Button...

function TwitterLink(){
    let tweeturl = `https://x.com/intent/tweet?url=${quoteText.innerText}`;
    window.open(tweeturl, "_blank");
}

quoteButton.addEventListener("click", RandomQuote);
soundButton.addEventListener("click", QuoteReader);
copyButton.addEventListener("click", copyText);
TwitterButton.addEventListener("click", TwitterLink)
