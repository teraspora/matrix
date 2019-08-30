// `The Matrix` intro emulator 

const D = new Date();
const TIME = D.toTimeString().slice(0, 8);
const DATE = D.toLocaleDateString().replace(/\//g, `-`);
const PHRASE1 = `Call trans opt: received. ${DATE} ${TIME} REC:Log>     \nTrace program: running          \n:Fatal error: code 404     :option: red / blue?`;
// const PHRASE1 = `Call trans opt: received. 2-19-98 13:24:18 REC:Log>`;
const p1_chars = PHRASE1.split(``).map(char => {
    let span = document.createElement(`span`);
    span.innerText = char;
    return span;
});

const LINE_COUNT = 50;
const COL_COUNT = 28;
let num_lines = makeNumLines(LINE_COUNT);     // an array of 50 num_line divs
const DROP_COUNT = 72;  // number of times lines drop before timer cleared
let tick = 0;
const block = document.getElementById(`block`);
const teletype = document.getElementById(`teletype`);

// Create the rows of digits sitting offscreen, i.e. above the top of the viewport
num_lines.forEach((line, i) => {
    document.body.appendChild(line);
    line.style.top = `${-i * line.clientHeight + document.body.clientHeight}px`;
}) 

// Now start letting them fall down, 1 row per 100ms, each time changing the numbers
let clock = setInterval(_ => {
    for (let line of num_lines) {
        let break_col = tick < 16 ? 0 : tick < 32 ? 10 : tick < 48 ? 5 : -1;
        line.innerHTML = getRowOfRandomNums(COL_COUNT, break_col).innerHTML;
        line.style.top = incrementPixelValue(line.style.top, line.clientHeight);
        // line.style.transform = `scale(${0.5 + tick / 48})`;
    }
    if (tick++ > DROP_COUNT) {
        clearInterval(clock);
        runPhase2();
    }
  }, 108);

// create an array of `nums` divs
function makeNumLines(line_count = 1) {
    return Array(line_count).fill(0).map(item => getRowOfRandomNums(COL_COUNT));``
}

// Given a pixel string, e.g.`512px`, and an increment, e.g. 32, return an incremented pixel string: `544px`
function incrementPixelValue(pxstr = `0px`, pxinc = 1, limit = 1200) {
    const pxint = parseInt(pxstr.slice(0, -2)) + pxinc;
    return pxint < limit ?`${(pxint).toString()}px` : pxstr;
}
// Return a div stuffed with `cols` number of spans, each containing a digit, or blank for each multiple of `break_col` (if break_col != 0)
function getRowOfRandomNums(cols, break_col) {
    let row = document.createElement(`div`);
    let spans = Array(cols).fill(0).map((x, i) => {
        let span = document.createElement(`span`);
        // if break_col < 0, indicates to make blocks of 1, 2 and 4 columns
        let cond = (break_col === undefined) ? false : (break_col >= 0) ? (i % break_col == 0) : [1, 4, 9].includes(i % 10);
        span.innerText = cond ? `\xa0 ` : Math.floor(Math.random() * 10).toString() + ` `;
        let n = Math.random() * 100;
        if (n > 3 && n < 10) {
            if (n == 9) {
                span.style.filter = `blur(5px)`;
                span.style.color = `#dfffe2`;
            }
            else {
                span.style.filter = `blur(${n}px)`;
            }
        }
        return span;
    });
    spans.forEach(span => row.appendChild(span));
    row.classList.add(`nums`);
    return row;
}

// Make a flashing, glowing block
function runPhase2() {
    tick = 0;
    block.style.opacity = 1;
    clock = setInterval(_ => {
        block.style.opacity = 1.1 - block.style.opacity;
        if (tick++ >= 10) {
            clearInterval(clock);
            block.style.opacity = 1;
            runPhase3();
        }
    }, 300);
}

// Make text type across screen like a teletype machine
function runPhase3() {
    tick = 0;
    clock = setInterval(_ => {
        teletype.insertBefore(p1_chars[tick++], block);
        if (tick >= p1_chars.length) {
            clearInterval(clock);
            runPhase4();
        }
    }, 40);
}
// Fade in image of hands holding blue and red pills
function runPhase4() {
    document.getElementById(`pills`).style.opacity = 1;
}
