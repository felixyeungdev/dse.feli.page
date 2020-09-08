//                 <a href="/subjects/?subject=chi" class="chi">Chinese Language</a>
const subjectList = document.querySelector(".subjects");

async function getSubjects() {
    var response = await fetch(`/assets/source/data.json`);
    var json = await response.json();
    return json["available_subjects"];
}

async function loadSubjectList() {
    let subjects = await getSubjects();
    subjects.forEach((subject) => {
        subjectList.innerHTML += `<p><a href="/subjects/?subject=${subject.code}" class="${subject.code}">${subject.label}</a></p>`;
    });
}

loadSubjectList();
