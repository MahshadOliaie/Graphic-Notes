let canvas = document.getElementById('drawing-board') || "";
let toolbar = document.querySelector('.artContainer__tools') || "";
let recentStroke = []

let isPainting = false;
let lineWidth = 5;



function clearArt(noteId) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    DATA.map(item => {
        if (item.canvasID == noteId) {
            item.content = [];
        }
    })
    localStorage.setItem("DATA", JSON.stringify(DATA))
}



function changeColor() {
    ctx.strokeStyle = event.target.value;
}


function draw(noteId) {
    if (!isPainting) {
        return;
    }

    ctx.strokeStyle = document.getElementById("strokeColor").value
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';


    ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    ctx.stroke();

    let content = { "x": event.clientX - canvasOffsetX, "y": event.clientY - canvas.offsetTop, "color": ctx.strokeStyle }

    recentStroke.push(content)

}



function drawFromData(note) {
    let lines = note.content;
    if (lines.length > 0) {
        lines.map(lineArr => {
            lineArr.map((obj, index) => {
                ctx.beginPath();
                ctx.strokeStyle = obj.color;
                ctx.lineWidth = 5;
                if (index == 0) {
                    ctx.moveTo(obj.x, obj.y);
                    ctx.lineTo(lineArr[1].x, lineArr[1].y);
                }
                else {
                    ctx.moveTo(lineArr[index - 1].x, lineArr[index - 1].y);
                    ctx.lineTo(obj.x, obj.y);
                }
                ctx.stroke();
            })

        })

    }
}


function changeName(noteId) {
    let name = event.target.value;
    DATA.map(item => {
        if (item.canvasID == noteId) {
            item.name = name;
        }
    })
    localStorage.setItem("DATA", JSON.stringify(DATA))

}


function showNote(note) {
    const { name, canvasID} = note
    let template = `<section class="artContainer">
    <div class="artContainer__tools">
    <svg xmlns="http://www.w3.org/2000/svg" height="25" width="20" viewBox="0 0 320 512" class="backBtn" onclick="refresh()"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
        <input class="artContainer__title" value="${name}" onchange="changeName(${canvasID})">
        <span>
            <label for="stroke">Color</label>
            <input id="strokeColor" name='stroke' type="color" onchange="changeColor()"> 
        </span>
        <button id="clearBtn" onclick="undo(${canvasID})">Undo</button>
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
    canvas.width = window.innerWidth - canvasOffsetX - 50;
    canvas.height = window.innerHeight - canvasOffsetY - 50;

    drawFromData(note)
    
    

    canvas.addEventListener('mousedown', (e) => {
        isPainting = true;
        ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop)

    });

    canvas.addEventListener('mouseup', e => {
        isPainting = false;
        DATA.map(item => {
            if (item.canvasID == canvasID) {
                item.content.push(recentStroke)
                recentStroke = []
            }
        })
        localStorage.setItem("DATA", JSON.stringify(DATA))

        ctx.stroke();
        ctx.beginPath();
    
    });

    canvas.addEventListener('mousemove', function () { draw(canvasID) });

    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        isPainting = true;
        ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop)
    });

    canvas.addEventListener('touchend', e => {
        e.preventDefault();
        isPainting = false;
        ctx.stroke();
        ctx.beginPath();
    });

    canvas.addEventListener('touchmove', function () { e.preventDefault(); draw(canvasID) });


}


function undo(noteId){
    DATA.map(item => {
        if (item.canvasID == noteId) {
            item.content.pop()
            showNote(item)
        }
    })
    localStorage.setItem("DATA", JSON.stringify(DATA))
}