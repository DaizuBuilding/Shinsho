let FulllineName = ""; // フル路線名（桜台線のみ内外つき）


// ビジョン情報変更
const stationsNames = document.querySelectorAll('.stationsname');
const stationsPoints = document.querySelectorAll('.stationspoint');
const linebarsSS = document.querySelectorAll('.linebar');
const staArrow = document.querySelectorAll('.staarrow');
const destArrowSS = document.querySelectorAll('.destarrowss');
const stationNames1 = document.querySelectorAll('.ssname1');
const stationNames2 = document.querySelectorAll('.ssname2');
const stationNames3 = document.querySelectorAll('.ssname3');
const stationNames4 = document.querySelectorAll('.ssname4');
function visionChangeLocal() {
    if (typeNumber == 0) {
        stationsNames.forEach(div => div.classList.add('in'));
        stationsPoints.forEach(div => div.classList.add('in'));
        arrow.forEach(div => div.classList.add('in'));
        staArrow.forEach(div => div.classList.add('in'));
        destArrowSS.forEach(div => div.classList.add('in'));
    } else {
        stationsNames.forEach(div => div.classList.remove('in'));
        stationsPoints.forEach(div => div.classList.remove('in'));
        arrow.forEach(div => div.classList.remove('in'));
        staArrow.forEach(div => div.classList.remove('in'));
        destArrowSS.forEach(div => div.classList.remove('in'));
    } // 内外クラス
    linebarsSS.forEach(img => { // 各駅表示バー
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
