const dse = (function () {
    const indent = 16;

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

        content.innerText = text.text;
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
            if (element.type == "regular") {
                content.append(createTextElement(element));
            } else if (element.type == "list") {
                content.append(createListElement(element, depth + 1));
            }
        });
        base.append(prefix, content);
        return base;
    }

    function renderQuestion(question) {
        let base = document.createElement("div");
        base.classList.add("dse-question_answer");

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
