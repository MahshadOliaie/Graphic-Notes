
let newBtn = document.querySelector(".toolbar__add");
let root = document.querySelector(".notesContainer");




function addNote() {
}


function renderNotes(data) {
    let template = data.map(item => {
        const { name, canvasID, date } = item;

        return `
        <div class="note">
          <h1 class="note__name">${name}</h1>
          <p class="note__date">${date}</p>
        </div>`
    }).join("");

    root.innerHTML = template;
}


renderNotes(DATA);