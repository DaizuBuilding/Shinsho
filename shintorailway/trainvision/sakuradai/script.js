let FulllineName = ""; // フル路線名（桜台線のみ内外つき）

// 行き先番号
function setDestinationNumber(stanum, linenum, typenum, destnum) {
    let num;
    if (linenum == 0) {
        if (typenum == 0) {
            if (stanum <= 2) { num = 9; }
            else if (stanum <= 5) { num = 8; }
            else if (stanum <= 7) { num = 7; }
            else if (stanum <= 10) { num = 6; }
            else if (stanum <= 12) { num = 5; }
            else if (stanum <= 15) { num = 4; }
            else if (stanum <= 19) { num = 3; }
            else if (stanum <= 22) { num = 2; }
            else if (stanum <= 24) { num = 1; }
            else if (stanum <= 26) { num = 0; }
        } else if (typenum == 1) {
            if (stanum == 0 || stanum >= 25) { num = 0; }
            else if (stanum >= 22) { num = 9; }
            else if (stanum >= 20) { num = 8; }
            else if (stanum >= 17) { num = 7; }
            else if (stanum >= 15) { num = 6; }
            else if (stanum >= 12) { num = 5; }
            else if (stanum >= 8) { num = 4; }
            else if (stanum >= 5) { num = 3; }
            else if (stanum >= 3) { num = 2; }
            else if (stanum >= 1) { num = 1; }
        }
    } else { num = destnum; }

    return num;
}
destinationNumber = setDestinationNumber(stationIndex, lineNumber, typeNumber, destinationNumber);

// ビジョン情報変更
const stationsNames = document.querySelectorAll('.stationsname');
const stationsPoints = document.querySelectorAll('.stationspoint');
const linebars = document.querySelectorAll('.linebar');
const stationNames1 = document.querySelectorAll('.ssname1');
const stationNames2 = document.querySelectorAll('.ssname2');
const stationNames3 = document.querySelectorAll('.ssname3');
const stationNames4 = document.querySelectorAll('.ssname4');
const nexts = document.querySelectorAll('.next');
function visionChangeLocal() {
    arrow.forEach(img => { // 矢印
        const base = img.dataset.base;
        img.src = `${base}${lineName}.png`;
    });
    if (typeNumber == 0) { stationsNames.forEach(div => div.classList.add('in')); stationsPoints.forEach(div => div.classList.add('in')); } else { stationsNames.forEach(div => div.classList.remove('in')); stationsPoints.forEach(div => div.classList.remove('in')); } // 内外クラス
    linebars.forEach(img => { // 各駅表示バー
        const base = img.dataset.base;
        img.src = `${base}${lineName}.png`;
    });
    stationNames1.forEach(img => { 
        const base = img.dataset.base;
        img.src = `${base}${informations.typesinfo[lineIndex].stops[adjustStationIndex(stationIndex)]}.png`;
    });
    stationNames2.forEach(img => {
        const base = img.dataset.base;
        img.src = `${base}${informations.typesinfo[lineIndex].stops[adjustStationIndex(stationIndex + 1)]}.png`;
    });
    stationNames3.forEach(img => {
        const base = img.dataset.base;
        img.src = `${base}${informations.typesinfo[lineIndex].stops[adjustStationIndex(stationIndex + 2)]}.png`;
    });
    stationNames4.forEach(img => {
        const base = img.dataset.base;
        img.src = `${base}${informations.typesinfo[lineIndex].stops[adjustStationIndex(stationIndex + 3)]}.png`;
    });
    arrow.forEach(div => div.classList.remove('arrowstopping'));
}

/*
// 到着
function arriving() {
    arrow.forEach(div => div.classList.remove('arrowstopping'));
    arrow.forEach(img => { // 矢印
        const base = img.dataset.base;
        img.src = `${base}${lineName}.png`;
    });
}

// 停車中
function stopping() {
    arrow.forEach(img => { // 矢印
        const base = img.dataset.base;
        img.src = `${base}stopping.png`;
    });
}
*/
