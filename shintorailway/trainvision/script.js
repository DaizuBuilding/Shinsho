window.open('./panel.html', 'トレインビジョン操作パネル', 'width = 600px, height = 400px');

let stationNumber = 1;
let destinationNumber = 0;

function changeStation(number) {
    stationNumber = number;
    destinationNumber = gettingNumber(number);
    stationChange();
}

console.log(stationNumber);

const divisions = document.querySelectorAll('.division');
let currentIndex = 0;


function gettingNumber(stanum) {
    //stationNumber = 12;
    //destinationNumber = 0;

    switch (stanum) {
        case 26:
        case 27:
        case 1:
            desnum = 0;
            break;
        case 2:
        case 3:
            desnum = 1;
            break;
        case 4:
        case 5:
            desnum = 2;
            break;
        case 6:
        case 7:
        case 8:
            desnum = 3;
            break;
        case 9:
        case 10:
        case 11:
        case 12:
            desnum = 4;
            break;
        case 13: 
        case 14: 
        case 15:
            desnum = 5;
            break;
        case 16:
        case 17:
            desnum = 6;
            break;
        case 18:
        case 19:
        case 20:
            desnum = 7;
            break;
        case 21:
        case 22:
            desnum = 8;
            break;
        case 23:
        case 24:
        case 25:
            desnum = 9;
            break;
        default:
            desnum = 0;
    }

    return desnum;
}


const headerNumberings = document.querySelectorAll('.headernumbering');
const headerStaNames = document.querySelectorAll('.headerstaname');
const destinations = document.querySelectorAll('.destination');

function stationChange() {
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
        img.src = `${base}91${destinationNumber}.png`;
    });
}

function switchClass() {
    gettingNumber(); // 番号取得（いずれ削除する）
    stationChange(); // 駅変更（いずれ削除する）

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

// 指定時間ごとに繰り返す（例：1秒）
setInterval(switchClass, 3000);