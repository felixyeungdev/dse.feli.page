const searchBox = document.querySelector("#searchBox");
const searchChips = document.querySelector("#searchChips");
const subject = new URLSearchParams(window.location.search).get("subject");
const holder = document.querySelector(".wrapper");
if (!subject) window.location.href = "/";

var allQuestionsAndAnswers = [];

async function show(questionsAndAnswers) {
    holder.innerHTML = "";
    const questionsAndAnswersElement = await dse.renderQuestions(
        questionsAndAnswers
    );
    holder.append(questionsAndAnswersElement);
    if (questionsAndAnswersElement.childElementCount == 0) {
        holder.append("No results found");
    }
}

function search(keyword) {
    if (keyword) {
        let copy = [...allQuestionsAndAnswers].filter((qA) =>
            JSON.stringify(qA).includes(keyword)
        );
        show(copy);
    } else {
        show(allQuestionsAndAnswers);
    }
}

async function initContent() {
    var response = await fetch(`/assets/source/${subject}.json`);
    var json = await response.json();
    allQuestionsAndAnswers = json;
    show(allQuestionsAndAnswers);
    console.log("Fetched and Loaded");
}

async function initSearch() {
    function initSearchSuggestions() {
        let allTags = [];
        allQuestionsAndAnswers.forEach((qA) => {
            const { tags } = qA;
            if (tags) allTags = [...allTags, ...tags];
        });
        allTags = [...new Set(allTags)];

        allTags.forEach((tag) => {
            const base = document.createElement("div");
            base.classList.add("search-chip");

            const content = document.createElement("span");
            content.textContent = tag;
            base.append(content);

            base.addEventListener("click", (e) => {
                searchBox.value = tag;
                search(searchBox.value);
            });
            searchChips.append(base);
        });
    }

    searchBox.addEventListener("input", async (e) => {
        search(searchBox.value);
    });
    initSearchSuggestions();
    console.log("Search ready");
}

async function init() {
    await initContent();
    await initSearch();
}

init();
