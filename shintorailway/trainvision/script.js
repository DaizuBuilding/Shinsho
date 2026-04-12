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

// 指定時間ごとに繰り返す（例：1秒）
setInterval(switchClass, 3000);