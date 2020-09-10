const resultsBox = document.querySelector("#resultInfo");
const searchBox = document.querySelector("#searchBox");
const randomButton = document.querySelector("#random");
const searchClear = document.querySelector("#clearInput");
const searchChips = document.querySelector("#searchChips");

const subject = new URLSearchParams(getHashSearch()).get("subject");
const holder = document.querySelector(".wrapper");
if (!subject) window.location.href = "/";

var allQuestionsAndAnswers = [];

async function getMetadata() {
    var response = await fetch(`/assets/source/data.json`);
    var json = await response.json();
    return json["available_subjects"].filter((sub) => sub.code == subject)[0];
}

function checkDuplicateId(json = []) {
    let ids = json.map((qA) => qA.id);
    let filtered = [];
    let duplicated = [];
    ids.forEach((id) => {
        if (filtered.includes(id)) {
            duplicated.push(id);
        } else {
            filtered.push(id);
        }
    });
    console.log({ filtered, duplicated });
    if (duplicated.length > 0)
        console.warn(
            "Question-Answers with duplicate IDs found: " +
                duplicated.join(", ")
        );
}

async function show(questionsAndAnswers) {
    resultsBox.textContent = `Showing ${questionsAndAnswers.length} of out ${allQuestionsAndAnswers.length} results`;
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
            JSON.stringify(qA).toLowerCase().includes(keyword.toLowerCase())
        );
        show(copy);
    } else {
        show(allQuestionsAndAnswers);
    }

    let params = new URLSearchParams(getHashSearch());
    params.set("search", encodeURIComponent(keyword));
    setHashSearch(params.toString());
}

async function initContent() {
    try {
        var response = await fetch(`/assets/source/${subject}.json`);
        var json = await response.json();
        checkDuplicateId(json);
        allQuestionsAndAnswers = json;
        show(allQuestionsAndAnswers);
        console.log("Fetched and Loaded");
    } catch (error) {
        show([]);
    }
}

async function initSearch() {
    let params = new URLSearchParams(getHashSearch());
    let _search = params.get("search") || "";
    searchBox.value = decodeURIComponent(_search);
    async function initSearchSuggestions() {
        let ignoreTags = ((await getMetadata()) || {})["ignore_tags"] || [];
        let allTags = [];
        allQuestionsAndAnswers.forEach((qA) => {
            const { tags } = qA;
            if (tags) allTags = [...allTags, ...tags];
        });
        allTags = [...new Set(allTags)];
        if (window.isDevelopmentMode) console.log(allTags.join(" "));
        allTags.forEach((tag) => {
            if (ignoreTags.includes(tag) || tag == "") return;
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

        searchClear.addEventListener("click", (e) => {
            searchBox.value = "";
            search(searchBox.value);
        });
    }

    searchBox.addEventListener("input", async (e) => {
        search(searchBox.value);
    });
    await initSearchSuggestions();
    console.log("Search ready");
}

async function initRandom() {
    randomButton.addEventListener("click", (e) => {
        const target =
            allQuestionsAndAnswers[
                Math.round(Math.random() * allQuestionsAndAnswers.length)
            ];

        searchBox.value = target.id;
        search(searchBox.value);
        clearSelection();
    });
}

async function init() {
    await initContent();
    await initSearch();
    await initRandom();
}

init();
