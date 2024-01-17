let canvas = document.getElementById('drawing-board') || "";
let toolbar = document.querySelector('.artContainer__tools') || "";


let isPainting = false;
let lineWidth = 5;
let startX;
let startY;



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

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    ctx.lineTo(event.clientX - canvasOffsetX, event.clientY);
    ctx.stroke();

    let content = { "x": event.clientX - canvasOffsetX, "y": event.clientY, "color": ctx.strokeStyle }

    DATA.map(item => {
        if (item.canvasID == noteId) {
            item.content.push(content)
        }
    })
    localStorage.setItem("DATA", JSON.stringify(DATA))

}



function drawFromData(note) {
    let lines = note.content;
    if (lines.length > 0) {
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.moveTo(lines[0].x, lines[0].y);
        lines.map(item => {
            ctx.lineTo(item.x, item.y);
            ctx.strokeStyle = item.color;
        })
        ctx.stroke();
    }
}
