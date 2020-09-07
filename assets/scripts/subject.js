const searchBox = document.querySelector("#searchBox");
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

async function main() {
    var response = await fetch(`/assets/source/${subject}.json`);
    var json = await response.json();
    allQuestionsAndAnswers = json;
    show(allQuestionsAndAnswers);
}

async function init() {
    await main();
    console.log("Fetched");
    searchBox.addEventListener("input", async (e) => {
        if (searchBox.value) {
            let copy = [...allQuestionsAndAnswers].filter((qA) =>
                JSON.stringify(qA).includes(searchBox.value)
            );
            show(copy);
        } else {
            show(allQuestionsAndAnswers);
        }
    });
    console.log("Search ready");
}

init();
