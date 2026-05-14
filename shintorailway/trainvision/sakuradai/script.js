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

// ビジョン情報変更
const arrow = document.querySelectorAll('.destinationarrow');
const stationsNames = document.querySelectorAll('.stationsname');
const stationsPoints = document.querySelectorAll('.stationspoint');
const linebars = document.querySelectorAll('.linebar');
const stationNames1 = document.querySelectorAll('.ssname1');
const stationNames2 = document.querySelectorAll('.ssname2');
const stationNames3 = document.querySelectorAll('.ssname3');
const stationNames4 = document.querySelectorAll('.ssname4');
const nexts = document.querySelectorAll('.next');
function visionChange() {
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

/*
// アナウンス原稿
let aLineName = '';
let aLineDestination = '';
function setAnnouncementScript() {
    if (lineNumber == 0) { aLineName = lineName } else { aLineName = lineNumbering; }
    aLineDestination = `destination/${lineNumber}${typeNumber}${destinationNumber}`;
    let announceScript = [...(terminalDigitBack ? ['./announcement/00100.wav', './announcement/00201.wav', `./announcement/lines/Shinto_${aLineName}.wav`, `./announcement/${aLineDestination}.mp3`] : []), './announcement/00600.wav', `./announcement/stations/${informations.typesinfo[lineIndex].stops[adjustStationIndex(stationIndex)]}.wav`, `./announcement/stations/${informations.typesinfo[lineIndex].stops[adjustStationIndex(stationIndex)]}.wav`, './announcement/00702.wav'];
    announce(announceScript);
}

// アナウンス放送
function announce(script) {
    if (announceIndex < script.length) {
        audio = new Audio(script[announceIndex]);
        audio.play();
        audio.onended = () => {
            announceIndex++;
            announce(script);
        };
    }
}
*/

// 時刻表示
function clock() {
    let time = new Date();
    let hour = String(time.getHours()).padStart(2, '0');
    let minute = String(time.getMinutes()).padStart(2, '0');
    document.getElementById('clock').innerHTML = hour + ':' + minute;
}
setInterval('clock()', 1000);

// 言語切り替え
const divisions = document.querySelectorAll('.division');
let currentIndexL = 0;
function switchLanguage() {
    divisions.forEach(div => div.classList.remove('displayed')); // 全てのクラスを一旦削除
    divisions[currentIndexL].classList.add('displayed'); // 現在の要素にだけクラス付与
    currentIndexL = (currentIndexL + 1) % divisions.length; // 次のインデックスへ
}
switchLanguage(); // 初回実行
setInterval(switchLanguage, 3000); // 3 秒ごとに繰り返す

/*
// コンテンツ切り替え
const contents = document.querySelectorAll('.content');
let currentIndexC = 0;
function switchContent() {
    contents.forEach(div => div.classList.remove('displayed'));
    contents[currentIndexC].classList.add('displayed');
    currentIndexC = (currentIndexC + 1) % contents.length;
}
switchContent();
setInterval(switchContent, 9000);
*/