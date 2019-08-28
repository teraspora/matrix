// `The Matrix` intro emulator 

const PHRASE1 = `Call trans opt: received 2-19-98 13:24:18 REC: Log>`;
const p1_chars = PHRASE1.split(``).map(char => {
    let span = document.createElement(`span`);
    span.innerText = char;
    span.style.fontSize = `2.4vw`;
    span.style.color = `#fff`;
    span.style.filter = `blur(2px)`;
    span.style.opacity = 1;
    return span;
});

const LINE_COUNT = 40;
const COL_COUNT = 28;
let num_lines = makeNumLines(LINE_COUNT);     // an array of 50 num_line divs
const DROP_COUNT = 53;  // number of times lines drop before timer cleared
let tick = 0;
const block = document.getElementById(`block`);
const teletype = document.getElementById(`teletype`);

num_lines.forEach((line, i) => {
    document.body.appendChild(line);
    line.style.top = `${-i * line.clientHeight}px`;
}) 

let clock = setInterval(_ => {
    for (let line of num_lines) {
        line.innerHTML = getRowOfRandomNums(COL_COUNT).innerHTML;
        line.style.top = incrementPixelValue(line.style.top, line.clientHeight);
    }
    if (tick++ > DROP_COUNT) {
        clearInterval(clock);
        runPhase2();
    }
  }, 200);

function makeNumLines(line_count = 1) {
    // create an array of `nums` divs
    return Array(line_count).fill(0).map(item => getRowOfRandomNums(COL_COUNT));``
}

// Given a pixel string, e.g.`512px`, and an increment, e.g. 32, return an incremented pixel string: `544px`
function incrementPixelValue(pxstr = `0px`, pxinc = 1, limit = 1200) {
    const pxint = parseInt(pxstr.slice(0, -2)) + pxinc;
    return pxint < limit ?`${(pxint).toString()}px` : pxstr;
}

// function getRandomNumString() {
//     return Math.floor(Math.random() * 1000000000).toString().replace(/(\d)/g, `$1 `).repeat(3);
// }

// function getRandomNumString(cols) {
//     return Array(cols).fill(0).map(x => Math.floor(Math.random() * 10).toString() + ` `).join(``);
// }

function getRowOfRandomNums(cols) {
    let row = document.createElement(`div`);
    let spans = Array(cols).fill(0).map(x => {
        let span = document.createElement(`span`);
        span.innerText = Math.floor(Math.random() * 10).toString() + ` `;

        let n = Math.random() * 100;
        if (n > 3 && n < 15) {
            if (n == 14) {
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
    }, 500);
}

function runPhase3() {
    tick = 0;
    clock = setInterval(_ => {
        teletype.appendChild(p1_chars[tick++]);
        if (tick >= p1_chars.length) {
            clearInterval(clock);
            runPhase4();
        }
    }, 100);
}

function runPhase4() {

}
