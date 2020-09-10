const dse = (function () {
    const indent = 16;

    function createTableCellElement(tableCell = {}) {
        let base = document.createElement("div");
        base.classList.add("dse-table-cell");
        base.append(createElement(tableCell.cell));
        return base;
    }

    function createTableElement(table = {}) {
        let base = document.createElement("div");
        base.classList.add("dse-table");

        base.style.display = "grid";
        base.style.gridTemplateColumns = `repeat(${table.columns}, 1fr)`;
        base.style.gridTemplateRows = `repeat(${table.rows}, 'min-content')`;

        for (let rows of table.data) {
            for (let cell of rows) {
                base.append(createTableCellElement(cell));
            }
        }

        return base;
    }

    function createTextElement(text = {}) {
        let base = document.createElement("p");
        base.classList.add("dse-text");

        let prefix = document.createElement("span");
        if (text.prefix) {
            prefix.classList.add("dse-text-prefix");

            prefix.innerText = text.prefix;
        }
        let content = document.createElement("span");
        content.classList.add("dse-text-content");
        if (text.style && text.style == "quote") {
            content.classList.add("dse-style-quote");
        }
        if (text.bold) {
            text.bold.forEach((element) => {
                text.text = text.text.replace(
                    element.phrase,
                    `<b>${element.phrase}</b>`
                );
            });
        }
        content.innerHTML = text.text;
        base.append(prefix, content);
        return base;
    }

    function createListElement(list = {}, depth = 0) {
        let base = document.createElement("div");
        base.classList.add("dse-list");
        base.style.marginLeft = `${indent * depth}px`;

        let prefix = document.createElement("span");
        if (list.prefix) {
            prefix.classList.add("dse-list-prefix");
            prefix.innerText = list.prefix;
        }
        let content = document.createElement("div");
        content.classList.add("dse-list-content");
        list.list.forEach((element) => {
            content.append(createElement(element, depth + 1));
        });
        base.append(prefix, content);
        return base;
    }

    function createElement(element, depth) {
        if (element.type == "regular") {
            return createTextElement(element);
        } else if (element.type == "list") {
            return createListElement(element, depth);
        } else if (element.type == "table") {
            return createTableElement(element);
        }
    }

    function renderQuestion(question) {
        let base = document.createElement("div");
        base.classList.add("dse-question_answer");

        let shareButton = document.createElement("button");
        shareButton.classList.add("dse-question_share");
        shareButton.innerHTML =
            '<i class="fas fa-share" aria-hidden="true"></i>';
        shareButton.addEventListener("click", async (e) => {
            let params = new URLSearchParams(getHashSearch());
            params.set("search", encodeURIComponent(question.id));
            let link =
                window.location.href.replace(window.location.hash, "") +
                "#?" +
                params.toString();
            let ok = await copyTextToClipboard(link);
            if (ok) new Snackbar().show(`Copied link to clipboard`);
            else new Snackbar().show(`Failed to copied link to clipboard`);
        });
        base.append(shareButton);

        // let tags = document.createElement("h3");
        // tags.innerText = question.tags ? question.tags.join(" ") : "";
        // tags.classList.add("dse-question_tags");
        // base.append(tags);

        if (question.version == "1") {
            let questionsDiv = createListElement({
                prefix: "Q",
                list: question.question,
            });
            questionsDiv.classList.add("dse-question");

            base.append(questionsDiv);

            let answersDiv = createListElement({
                prefix: "A",
                list: question.answer,
            });
            answersDiv.classList.add("dse-answer");
            base.append(answersDiv);

            if (question.explanation) {
                let explanationDiv = createListElement({
                    prefix: "E",
                    list: question.explanation,
                });
                explanationDiv.classList.add("dse-explanation");
                base.append(explanationDiv);
            }
            // return base;
        }
        return base;
    }

    function renderQuestions(questions = []) {
        let base = document.createElement("div");
        base.classList.add("dse-question_answer-collection");

        for (const key in questions) {
            if (questions.hasOwnProperty(key)) {
                const question = questions[key];
                base.append(renderQuestion(question));
            }
        }
        return base;
    }

    return {
        renderQuestions,
        renderQuestion,
        indent,
    };
})();
