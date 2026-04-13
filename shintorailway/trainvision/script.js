window.open('./panel.html', 'トレインビジョン操作パネル', 'width = 600, height = 400, scrollbars = 0');

let stationNumber = 1;
let destinationNumber = 0;
let lineNumber = 1;
let lineNameFull = "";
let sakuradaiDestinationNumber = 0;

// パネルからのデータ取得
function changeData(stanumber, linnumber) {
    stationNumber = stanumber;
    destinationNumber = gettingNumber(stanumber);
    lineNameFull = gettingLineNameFull(linnumber);
    sakuradaiDestinationNumber = gettingSakuradaiDestination(linnumber);
    console.log(lineNameFull); // テスト用
    stationChange();
}

// 行き先番号の取得
function gettingNumber(stanum) {
    let desnum;
    //stationNumber = 12;
    //destinationNumber = 0;

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

    return desnum;
}

// 路線名をフルで取得
function gettingLineNameFull(num) {
    let lname;

    if (num == 0) { lname = "Sakuradai_Inbound" }
    if (num == 1) { lname = "Sakuradai_Outbound" }
    if (num == 2) { lname = "Kawashima" }
    if (num == 3) { lname = "Tsukushi" }
    if (num == 4) { lname = "Chuo" }
    if (num == 5) { lname = "Kaido" }

    return lname;
}

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