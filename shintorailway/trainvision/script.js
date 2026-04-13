window.open('./panel.html', 'トレインビジョン操作パネル', 'width = 600, height = 400, scrollbars = 0');

let stationNumber = 1;
let destinationNumber = 0;
let lineNumber = 0;

function changeStation(stanumber, linnumber) {
    stationNumber = stanumber;
    destinationNumber = gettingNumber(stanumber);
    lineNameFull = gettingLineNameFull(linnumber);
    console.log(lineNameFull);
    stationChange();
}

console.log(stationNumber);
console.log(destinationNumber);

const divisions = document.querySelectorAll('.division');
let currentIndex = 0;


function gettingNumber(stanum) {
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

function gettingLineNameFull(num) {
    switch(num) {
        case 0:
            lname = "Sakuradai_Inbound";
            break;
        case 1:
            lname = "Sakuradai_Outbound";
            break;
        case 2: 
            lname = "Kawashima";
            break;
        case 3:
            lname = "Tsukushi";
            break;
        case 4:
            lname = "Chuo";
            break;
        case 5:
            lname = "Kaido";
            break;
        default: 
            lname = "Sakuradai_Outbound";
            break;
    }
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
    // gettingNumber(); // 番号取得（いずれ削除する）
    // stationChange(); // 駅変更（いずれ削除する）

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