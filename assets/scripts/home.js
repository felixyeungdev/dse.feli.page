//                 <a href="/subjects/?subject=chi" class="chi">Chinese Language</a>
const subjectList = document.querySelector(".subjects");
const themeList = document.querySelector(".themes");

async function getSubjects() {
    var response = await fetch(`/assets/source/data.json`);
    var json = await response.json();
    return json["available_subjects"];
}

async function loadSubjectList() {
    let subjects = await getSubjects();
    subjects.forEach((subject) => {
        subjectList.innerHTML += `<p><a href="/questions/#?subject=${subject.code}" class="${subject.code}">${subject.label}</a></p>`;
    });
}

async function loadThemeList() {
    feliTheme.availableThemes.forEach((theme) => {
        let themeP = document.createElement("p");
        themeP.classList.add("clicky");
        themeP.textContent = theme;
        themeP.addEventListener("click", () => feliTheme.loadTheme(theme));
        themeList.append(themeP);
    });
}

loadSubjectList();
loadThemeList();
