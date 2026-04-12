const divisions = document.querySelectorAll('.division');
let currentIndex = 0;

let stationnumber = 6;

// const headerNumberings = document.querySelectorAll('.headernumbering');
const headerStaNames = document.querySelectorAll('.headerstaname');

function stationChange() {
    headerStaNames.forEach(img => {
        const base = img.dataset.base;
        img.src = `${base}${stationnumber}.png`;
    });
}


function switchClass() {
    stationnumber = 3;
    stationChange();

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