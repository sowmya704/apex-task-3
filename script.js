// ---------------- QUIZ SECTION ----------------

const quizData = [
    {
        question: "Which method is used to fetch data in JavaScript?",
        options: ["fetch()", "get()", "retrieve()", "load()"],
        answer: "fetch()"
    },
    {
        question: "Which keyword declares a block-scoped variable?",
        options: ["var", "let", "int", "static"],
        answer: "let"
    },
    {
        question: "Which CSS feature makes design responsive?",
        options: ["Flexbox", "Media Queries", "Grid", "Float"],
        answer: "Media Queries"
    }
];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");
const nextBtn = document.getElementById("nextBtn");
const scoreEl = document.getElementById("score");

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    resultEl.innerHTML = "";
    optionsEl.innerHTML = "";

    if (currentQuestion >= quizData.length) {
        questionEl.innerHTML = `Quiz Completed 🎉 Final Score: ${score}/${quizData.length}`;
        nextBtn.style.display = "none";
        return;
    }

    const current = quizData[currentQuestion];
    questionEl.innerText = current.question;

    current.options.forEach(option => {
        const div = document.createElement("div");
        div.classList.add("option");
        div.innerText = option;
        div.onclick = () => checkAnswer(option);
        optionsEl.appendChild(div);
    });
}

function checkAnswer(selected) {
    if (selected === quizData[currentQuestion].answer) {
        resultEl.innerHTML = "Correct Answer!";
        resultEl.className = "correct";
        score++;
        scoreEl.innerText = score;
    } else {
        resultEl.innerHTML = `Wrong! Correct Answer: ${quizData[currentQuestion].answer}`;
        resultEl.className = "wrong";
    }

    Array.from(optionsEl.children).forEach(opt => {
        opt.style.pointerEvents = "none";
    });
}

nextBtn.addEventListener("click", () => {
    currentQuestion++;
    loadQuestion();
});

loadQuestion();


// ---------------- DICTIONARY API SECTION ----------------

const searchBtn = document.getElementById("searchBtn");
const wordInput = document.getElementById("wordInput");
const dictionaryResult = document.getElementById("dictionaryResult");

searchBtn.addEventListener("click", async () => {
    const word = wordInput.value.trim();

    if (word === "") {
        dictionaryResult.innerHTML = "<p class='wrong'>Please enter a word</p>";
        return;
    }

    dictionaryResult.innerHTML = "Loading...";

    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

        if (!response.ok) {
            throw new Error("Not found");
        }

        const data = await response.json();
        const meaning = data[0].meanings[0];

        dictionaryResult.innerHTML = `
            <p><strong>Word:</strong> ${data[0].word}</p>
            <p><strong>Part of Speech:</strong> ${meaning.partOfSpeech}</p>
            <p><strong>Definition:</strong> ${meaning.definitions[0].definition}</p>
        `;

    } catch (error) {
        dictionaryResult.innerHTML = "<p class='wrong'>Word not found. Try another word.</p>";
    }
});