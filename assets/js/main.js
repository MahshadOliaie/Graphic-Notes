
let newBtn = document.querySelector(".toolbar__add");
let root = document.querySelector(".notesContainer");
let nameInput = document.querySelector(".addBox__name")
let addBtn = document.querySelector(".addBox__btns__confirm");
let cancelBtn = document.querySelector(".addBox__btns__cancel");
let box = document.querySelector(".addBox")
let cancelDeletingBtn = document.querySelector(".deleteLayer__btns__cancel")
let confirmDeleteBtn = document.querySelector(".deleteLayer__btns__delete")



function openBox() {
    box.classList.remove("dnone")
    nameInput.focus();
    nameInput.value = ""
}

function closeBox() {
    box.classList.add("dnone")
}


function addNote() {
    let name = nameInput.value;
    var hue = Math.floor(Math.random() * 360);
    var pastel = 'hsl(' + hue + ', 90%, 85%)';
    let id = DATA[DATA.length - 1].canvasID + 1
    DATA.push({ "bgColor": pastel, "name": name, "canvasID": id, "date": "26 Apr 2023", "content": [] })
    localStorage.setItem("DATA", JSON.stringify(DATA))
    renderNotes(DATA)
    closeBox();
}


function addHandler(evt) {
    if (evt.key === 'Enter') {
        addNote();
    }
}


function renderNotes(data) {
    let template = data.map((item, index) => {
        const { name, canvasID, date, bgColor } = item;
        return `
        <div class="note" style="background-color: ${bgColor}" onclick="openNote(${canvasID})">
          <h1 class="note__name">${name}</h1>
          <p class="note__date">${date}</p>
          <svg onclick="deleteFn()" class="deleteBtn" fill="#000000" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M 27.9999 51.9063 C 41.0546 51.9063 51.9063 41.0781 51.9063 28 C 51.9063 14.9453 41.0312 4.0937 27.9765 4.0937 C 14.8983 4.0937 4.0937 14.9453 4.0937 28 C 4.0937 41.0781 14.9218 51.9063 27.9999 51.9063 Z M 27.9999 47.9219 C 16.9374 47.9219 8.1014 39.0625 8.1014 28 C 8.1014 16.9609 16.9140 8.0781 27.9765 8.0781 C 39.0155 8.0781 47.8983 16.9609 47.9219 28 C 47.9454 39.0625 39.0390 47.9219 27.9999 47.9219 Z M 22.2343 41.9687 L 33.7187 41.9687 C 35.3827 41.9687 36.3436 41.0547 36.4374 39.3906 L 37.3046 20.2656 L 38.6640 20.2656 C 39.2968 20.2656 39.8124 19.7266 39.8124 19.0937 C 39.8124 18.4375 39.2968 17.9219 38.6640 17.9219 L 33.3671 17.9219 L 33.3671 16.0234 C 33.3671 14.1953 32.1483 13.0469 30.4140 13.0469 L 25.5155 13.0469 C 23.7812 13.0469 22.5858 14.1953 22.5858 16.0234 L 22.5858 17.9219 L 17.2655 17.9219 C 16.6327 17.9219 16.0936 18.4375 16.0936 19.0937 C 16.0936 19.7266 16.6327 20.2656 17.2655 20.2656 L 18.6718 20.2656 L 19.5390 39.3906 C 19.6093 41.0547 20.5936 41.9687 22.2343 41.9687 Z M 24.9296 17.9219 L 24.9296 16.4688 C 24.9296 15.8359 25.3749 15.4141 26.0077 15.4141 L 29.8514 15.4141 C 30.5077 15.4141 30.9530 15.8359 30.9530 16.4688 L 30.9530 17.9219 Z M 23.6405 39.3906 C 23.1249 39.3906 22.7733 39.0156 22.7499 38.4531 L 22.1171 22.7266 C 22.0936 22.1875 22.4687 21.7890 23.0546 21.7890 C 23.5936 21.7890 23.9452 22.1641 23.9921 22.7266 L 24.5546 38.4297 C 24.5780 38.9922 24.2265 39.3906 23.6405 39.3906 Z M 27.9530 39.3672 C 27.3905 39.3672 26.9921 38.9922 26.9921 38.4297 L 26.9921 22.7266 C 26.9921 22.1875 27.3671 21.7890 27.9530 21.7890 C 28.5390 21.7890 28.9140 22.1875 28.9140 22.7266 L 28.9140 38.4297 C 28.9140 38.9922 28.5390 39.3672 27.9530 39.3672 Z M 32.2890 39.3906 C 31.7030 39.3906 31.3514 38.9922 31.3749 38.4297 L 31.9374 22.7266 C 31.9609 22.1641 32.3358 21.7890 32.8514 21.7890 C 33.4374 21.7890 33.8358 22.1875 33.8124 22.7266 L 33.1796 38.4531 C 33.1562 39.0156 32.8046 39.3906 32.2890 39.3906 Z"></path></g></svg>
          <div class="deleteLayer dnone">
          <h1>are you sure?</h1>
          <div class="deleteLayer__btns">
            <button class="deleteLayer__btns__cancel" onclick="cancelDeleting()">cancel</button>
            <button class="deleteLayer__btns__delete" onclick="confirmDelete(${index})">delete</button>
         </div>
          </div>
        </div>`
    }).join("");

    root.innerHTML = template;
}



function openNote(id) {
    let currentNote = DATA.find(item => {
        if (item.canvasID == id) {
            return item;
        }
    })

    showNote(currentNote);
}



function showNote(note) {
    const { name, canvasID } = note
    let template = `<section class="artContainer">
    <div class="artContainer__tools">
        <input class="artContainer__title" value="${name}">
        <span>
            <label for="stroke">Color</label>
            <input id="strokeColor" name='stroke' type="color" onchange="changeColor()"> 
        </span>
        <button id="clearBtn" onclick="clearArt(${canvasID})">Clear</button>
    </div>
    <div class="drawing-board">
        <canvas id="drawing-board"></canvas>
    </div>
</section>`

    document.body.innerHTML = template;
    canvas = document.getElementById('drawing-board');
    toolbar = document.querySelector('.artContainer__tools');
    ctx = canvas.getContext('2d');
    canvasOffsetX = canvas.offsetLeft;
    canvasOffsetY = canvas.offsetTop;
    canvas.width = window.innerWidth - canvasOffsetX;
    canvas.height = window.innerHeight - canvasOffsetY;

    drawFromData(note)

    canvas.addEventListener('mousedown', (e) => {
        isPainting = true;
        startX = e.clientX;
        startY = e.clientY;
    });

    canvas.addEventListener('mouseup', e => {
        isPainting = false;
        ctx.stroke();
        ctx.beginPath();
    });

    canvas.addEventListener('mousemove', function () { draw(canvasID) });


}



function deleteFn() {
    let thisNote = event.target.parentNode.lastElementChild;
    thisNote.classList.remove("dnone")
    event.target.parentNode.classList.add("flip");
}

function cancelDeleting() {
    event.target.parentNode.parentNode.classList.add("dnone")
    event.target.parentNode.parentNode.parentNode.classList.remove("flip")
}


function confirmDelete(index) {
    DATA.splice(index, 1);
    localStorage.setItem("DATA", JSON.stringify(DATA))
    renderNotes(DATA)
}



renderNotes(DATA);

box.addEventListener("keyup", addHandler);