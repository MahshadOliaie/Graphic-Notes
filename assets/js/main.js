
let newBtn = document.querySelector(".toolbar__add");
let root = document.querySelector(".notesContainer");
let nameInput = document.querySelector(".addBox__name")
let addBtn = document.querySelector(".addBox__btns__confirm");
let cancelBtn = document.querySelector(".addBox__btns__cancel");
let box = document.querySelector(".addBox")



function openBox(){
    box.classList.remove("dnone")
}

function closeBox(){
    box.classList.add("dnone")
}


function addNote() {
    let name = nameInput.value ; 
    DATA.push({"name":name, "date":"26 Apr 2023"})

    renderNotes(DATA)
    nameInput.value = ""
    closeBox();
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