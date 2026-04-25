document.getElementById('loading').addEventListener('click', () => {
    window.open('./panel.html', 'トレインビジョン操作パネル', 'width = 600, height = 400, scrollbars = 0');
});

let stationIndex; // 駅番号インデックス（0 スタート）
let destinationNumber; // 行き先番号
let lineNumber; // 路線番号
let lineIndex; // 路線インデックス（Json 参照用）
let typeNumber; // 種別番号
let lineName = ""; // 路線名
let lineNumbering = ""; // 路線ナンバリング
let carNo; // 号車
let stopsLength; // 停車駅数
let terminalDigit = 0; // 主要駅判定
let terminalDigitBack = 0; // 1 つ前の主要駅判定
let informations; // informations.json

let announceScript; // アナウンス原稿
let announceIndex = 0; // アナウンスインデックス
let audio = null; // audio インスタンス

// Json 読み込み
async function getJson(stanum, linenum) {
    const response = await fetch('./informations.json');
    const data = await response.json();
    informations = await data;

    lineName = `${data.typesinfo[String(lineIndex)].line}_${data.typesinfo[lineIndex].name}`; // 路線名
    lineNumbering = data.typesinfo[lineIndex].numbering; // 路線ナンバリング
    stopsLength = data.typesinfo[lineIndex].stops.length; // 停車駅数
    terminalDigit = data.stationsinfo[adjustStationIndex(stanum)].terminal; // 主要駅判定
    terminalDigitBack = data.stationsinfo[adjustStationIndex(stanum - 1)].terminal; // 1 つ前の主要駅判定
}

// パネルからのデータ取得と変更
async function changeData(stanum, linenum, typenum, destnum, carnum) {
    if (audio != null) { audio.pause(); }
    lineIndex = setLineIndex(linenum, typenum, destnum);
    await getJson(stanum, linenum); // Json データ取得
    stationIndex = adjustStationIndex(stanum);
    lineNumber = linenum;
    typeNumber = typenum;
    destinationNumber = setDestinationNumber(stationIndex, linenum, typenum, destnum);
    carNo = carnum;
    visionChange();
    setAnnouncementScript();
}

// 路線インデックスの設定
function setLineIndex(linenum, typenum, destnum) {
    let num = '00';
    if (linenum == 0) { num = String(linenum) + String(typenum); }
    if (linenum > 0) { num = String(linenum) + String(destnum); }
    return num;
}

// 停車駅インデックスの調整
function adjustStationIndex(num) {
    return (Number(num) + stopsLength) % stopsLength;
}

// 行き先番号
function setDestinationNumber(stanum, linenum, typenum, destnum) {
    let num;
    if (linenum == 0) {
        if (typenum == 0) {
            if (stanum >= 24) { num = 9; }
            else if (stanum >= 21) { num = 8; }
            else if (stanum >= 19) { num = 7; }
            else if (stanum >= 16) { num = 6; }
            else if (stanum >= 14) { num = 5; }
            else if (stanum >= 11) { num = 4; }
            else if (stanum >= 7) { num = 3; }
            else if (stanum >= 4) { num = 2; }
            else if (stanum >= 2) { num = 1; }
            else if (stanum >= 0) { num = 0; }
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
const border = document.getElementById('border');
const headerLines = document.querySelectorAll('.line');
const headerNumberings = document.querySelectorAll('.headernumbering');
const headerStaNames = document.querySelectorAll('.headerstaname');
const destinations = document.querySelectorAll('.destination');
const carNos = document.getElementById('carno');
const stationNames1 = document.querySelectorAll('.ssname1');
const stationNames2 = document.querySelectorAll('.ssname2');
const stationNames3 = document.querySelectorAll('.ssname3');
const stationNames4 = document.querySelectorAll('.ssname4');
const nexts = document.querySelectorAll('.next');
function visionChange() {
    border.src = `./img/Linecolor_${lineNumbering}.png`;
    headerLines.forEach(img => { // 路線名
        const base = img.dataset.base;
        img.src = `${base}${lineName}.png`;
    });
    headerNumberings.forEach(img => { // ナンバリング
        const base = img.dataset.base;
        img.src = `${base}${lineNumbering}_${stationIndex + 1}.png`;
    });
    headerStaNames.forEach(img => { // ヘッダー駅名表示
        const base = img.dataset.base;
        img.src = `${base}${stationIndex + 1}.png`;
    });
    destinations.forEach(img => { // 行先
        const base = img.dataset.base;
        img.src = `${base}${lineNumber}${typeNumber}${destinationNumber}.png`;
    });
    carNos.src = `${carNos.dataset.base}${carNo}.png`; // 号車表示
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
    nexts.forEach(img => { // 次は
        const base = img.dataset.base;
        img.src = `${base}next.png`;
    });
    document.getElementById('loading').classList.add('hidden'); // 起動画面の切り替え
}

// 到着
function arriving() {
    nexts.forEach(img => {
        const base = img.dataset.base;
        img.src = `${base}soon.png`;
    });
}

// 停車中
function stopping() {
    nexts.forEach(img => {
        const base = img.dataset.base;
        img.src = `${base}now.png`;
    });
}

// アナウンス原稿
let aLineName = '';
let aLineDestination = '';
function setAnnouncementScript() {
    if (lineNumber == 0) { aLineName = lineName } else { aLineName = lineNumbering; }
    aLineDestination = `'destination/'${lineNumber}${typeNumber}${destinationNumber}`;
    let announceScript = [...(terminalDigitBack ? ['./announcement/00100.wav', './announcement/00201.wav', `./announcement/lines/Shinto_${aLineName}.wav`, `./announcement/${aLineDestination}.wav`] : []), './announcement/00600.wav', `./announcement/stations/${stationIndex + 1}.wav`, `./announcement/stations/${stationIndex + 1}.wav`, './announcement/00702.wav'];
    console.log(announceScript);
    announce(announceScript);
}

// アナウンス放送
function announce(script) {
    console.log(script);
    if (announceIndex < script.length) {
        audio = new Audio(script[announceIndex]);
        audio.play();
        audio.onended = () => {
            announceIndex++;
            announce(script);
        };
    }
}

// 時刻表示
function clock() {
    let time = new Date();
    let hour = time.getHours();
    let minute = time.getMinutes();
    document.getElementById('clock').innerHTML = hour + ':' + minute;
}
setInterval('clock()', 1000);

// 言語切り替え
const divisions = document.querySelectorAll('.division');
let currentIndex = 0;
function switchClass() {
    divisions.forEach(div => div.classList.remove('displayed')); // 全てのクラスを一旦削除
    divisions[currentIndex].classList.add('displayed'); // 現在の要素にだけクラス付与
    currentIndex = (currentIndex + 1) % divisions.length; // 次のインデックスへ（ループさせる）
}
switchClass(); // 初回実行
setInterval(switchClass, 3000); // 3 秒ごとに繰り返す