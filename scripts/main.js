const LINE_COUNT = 120;
const COL_COUNT = 28;
let num_lines = makeNumLines(LINE_COUNT);     // an array of 50 num_line divs

// const nums = document.querySelectorAll(`.nums`)[0];
// const overlay = document.getElementById(`overlay`);     // text that fades in
//  let timer = setInterval(frame, 40);

num_lines.forEach((line, i) => {
    document.body.appendChild(line);
    line.style.top = `${-i * line.clientHeight}px`;
}) 

setInterval(_ => {
    for (let line of num_lines) {
        line.innerHTML = getRowOfRandomNums(COL_COUNT).innerHTML;
        line.style.top = incrementPixelValue(line.style.top, line.clientHeight);
    }
  }, 100);

// setInterval(_ => {
//     num_lines = num_lines.map(line => {
//         let row = getRowOfRandomNums(COL_COUNT);
//         row.style.top = incrementPixelValue(line.style.top, parseInt(line.clientHeight));
//         return row;
//     });
//   }, 100);

// setInterval(_ => {
//     num_lines = num_lines.map(line => {
//         let row = getRowOfRandomNums(COL_COUNT);
//         row.style.top = incrementPixelValue(line.style.top, line.clientHeight);
//     });
//   }, 100);

// function frame() {
//   if (i <= 1) {     /* test for finished */
//     clearInterval(timer);
//     setTimeout(_ => {
//         digits[0].style.transform = ``;
//     }, 800);
//     setTimeout(_ => {
//         digits[1].style.transform = ``;
//     }, 1700);
//     setTimeout(_ => {
//         digits[2].style.transform = ``;
//     }, 1100);
//     setTimeout(_ => {
//         digits[2].style.transform = ``;
//     }, 2100);
//     setTimeout(_ => {
//         digits[1].style.borderRadius = `20px`;
//     }, 3600);
//     setTimeout(_ => {
//         overlay.style.opacity = `1`;;
//     }, 7100);
//   }
//   else {
//     phi = (i - 1) * 400;
//     digits[0].style.transform = `scale(${i}) rotate(${-phi}deg) translate(${162 * Math.sin(phi * 2) + 64}px, ${128 * Math.cos(phi * 2)}px)`;
//     digits[1].style.transform = `scale(${16 * Math.sin((i - 1) * 8) + 1}) rotate(${phi}deg) translate(${512 * Math.sin(phi)}px, ${-512 * Math.cos(phi)}px)`;
//     digits[2].style.transform = `scale(${phi / 90 + 1}) rotate(${-phi / 2}deg) translate(${-404 * Math.sin(phi)}px, ${808 * Math.cos(phi)}px)`;
//     digits[1].style.borderRadius = `${12.5 * i + 20}%`;
//     i-= 0.061;
//   }
// }

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
        return span;
    });
    spans.forEach(span => row.appendChild(span));
    row.classList.add(`nums`);
    return row;
}

