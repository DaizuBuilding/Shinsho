window.open('./panel.html', 'トレインビジョン操作パネル', 'width = 600, height = 400, scrollbars = 0');

let stationNumber = 1;
let destinationNumber = 0;
let lineNumber = 1;
let lineNameFull = "";
let sakuradaiDestinationNumber = 0;
let carNo = 0;
let lin = 0;

function settingAnnouncement(stanum, linnum) {
    if (linnum == 0) { lin = '00302' }
    if (linnum == 1) { lin = '00301' }
    if (linnum == 2 || linnum == 3) { lin = 'lines/Shinto_SK' }
    if (linnum == 4 || linnum == 5) { lin = 'lines/Shinto_ST' }
    if (linnum == 6 || linnum == 7) { lin = 'lines/Shinto_SC' }
    if (linnum == 8 || linnum == 9) { lin = 'lines/Shinto_SA' }
    let announcements = ['./announcement/00100.wav', './announcement/00201.wav', `./announcement/${lin}.wav`, './announcement/stations/17.wav', './announcement/00597.wav', './announcement/00600.wav', `./announcement/stations/${stanum}.wav`, `./announcement/stations/${stanum}.wav`, './announcement/00702.wav'];
    announce(announcements);
}

let announcementIndex = 0;
let audio = null;

function announce(script) {
    if (announcementIndex < script.length) {
        audio = new Audio(script[announcementIndex]);
        audio.play();
        audio.onended = () => {
            announcementIndex++;
            announce(script);
        };
    }
}

// パネルからのデータ取得
function changeData(stanumber, linnumber, carnumber) {
    audio.pause();
    stationNumber = stanumber;
    destinationNumber = gettingNumber(stanumber, linnumber);
    lineNameFull = gettingLineNameFull(linnumber);
    sakuradaiDestinationNumber = gettingSakuradaiDestination(linnumber);
    carNo = carnumber;
    // console.log(carNo); // テスト用
    stationChange();
    announcementIndex = 0;
    settingAnnouncement(stanumber, linnumber);
}

// 行き先番号の取得
function gettingNumber(stanum, linnum) {
    let desnum;
    //stationNumber = 12;
    //destinationNumber = 0;

    if (linnum == 0) {
        if (stanum >= 25) { desnum = 9; }
        else if (stanum >= 22) { desnum = 8; }
        else if (stanum >= 20) { desnum = 7; }
        else if (stanum >= 17) { desnum = 6; }
        else if (stanum >= 15) { desnum = 5; }
        else if (stanum >= 12) { desnum = 4; }
        else if (stanum >= 8) { desnum = 3; }
        else if (stanum >= 5) { desnum = 2; }
        else if (stanum >= 3) { desnum = 1; }
        else if (stanum >= 1) { desnum = 0; }
    } else {
        if (stanum == 1 || stanum >= 26) { desnum = 0; }
        else if (stanum >= 23) { desnum = 9; }
        else if (stanum >= 21) { desnum = 8; }
        else if (stanum >= 18) { desnum = 7; }
        else if (stanum >= 16) { desnum = 6; }
        else if (stanum >= 13) { desnum = 5; }
        else if (stanum >= 9) { desnum = 4; }
        else if (stanum >= 6) { desnum = 3; }
        else if (stanum >= 4) { desnum = 2; }
        else if (stanum >= 2) { desnum = 1; }
    }
    
    return desnum;
}

// 路線名をフルで取得
function gettingLineNameFull(num) {
    let lname;

    if (num == 0) { lname = "Sakuradai_Inbound" }
    if (num == 1) { lname = "Sakuradai_Outbound" }
    if (num == 2) { lname = "Kawashima_North" }
    if (num == 3) { lname = "Kawashima_South" }
    if (num == 4) { lname = "Tsukushi_Up" }
    if (num == 5) { lname = "Tsukushi_Down" }
    if (num == 6) { lname = "Chuo_Up" }
    if (num == 7) { lname = "Chuo_Down" }
    if (num == 8) { lname = "Kaido_North" }
    if (num == 9) { lname = "Kaido_South" }

    return lname;
}

// 行き先番号 2 桁目（桜台線行き先番号）の値設定
function gettingSakuradaiDestination(num) {
    let snum;

    if (num > 1) { snum = 0; } else { snum = num; }

    return snum;
}

// 路線および駅情報の変更

const headerLines = document.querySelectorAll('.line');
const headerNumberings = document.querySelectorAll('.headernumbering');
const headerStaNames = document.querySelectorAll('.headerstaname');
const destinations = document.querySelectorAll('.destination');
const carNos = document.getElementById('carno');

function stationChange() {
    headerLines.forEach(img => {
        const base = img.dataset.base;
        img.src = `${base}${lineNameFull}.png`;
    });

    headerNumberings.forEach(img => {
        const base = img.dataset.base;
        img.src = `${base}SS_${stationNumber}.png`;
    });

    headerStaNames.forEach(img => {
        const base = img.dataset.base;
        img.src = `${base}${stationNumber}.png`;
    });

    destinations.forEach(img => {
        const base = img.dataset.base;
        img.src = `${base}9${sakuradaiDestinationNumber}${destinationNumber}.png`;
    });

    carNos.src = `${carNos.dataset.base}${carNo}.png`;
}

// 言語切り替え

const divisions = document.querySelectorAll('.division');
let currentIndex = 0;

function switchClass() {
    // 全てのクラスを一旦削除
    divisions.forEach(div => div.classList.remove('displayed'));
    // 現在の要素にだけクラス付与
    divisions[currentIndex].classList.add('displayed');
    // 次のインデックスへ（ループさせる）
    currentIndex = (currentIndex + 1) % divisions.length;
}

// 初回実行
switchClass();

document.getElementById('shintorailway').classList.add('hidden');

// 3 秒ごとに繰り返す
setInterval(switchClass, 3000);