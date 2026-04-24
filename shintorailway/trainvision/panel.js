let digit = 0;
document.getElementById('update').addEventListener('click', () => {
    digit = 0;
    returnWindow();
});
document.getElementById('departure').addEventListener('click', () => {
    digit = 1;
    returnWindow();
});
document.getElementById('arrive').addEventListener('click', () => {
    digit = 0;
    window.opener.arriving();
});
document.getElementById('stopping').addEventListener('click', () => {
    digit = 0;
    window.opener.stopping();
})

console.log(document.getElementById('selectsta').value);

function returnWindow() {
    const error = document.getElementById('error');
    if (!window.opener || window.opener.closed) {
        error.innerHTML = 'ビジョン画面が開かれていません。次のサイトにアクセスしてください：https://daizubuilding.github.io/Shinsho/shintorailway/trainvision/';
        return false;
    } else {
        error.innerHTML = '';
    }
    let stanumber = Number(document.getElementById('selectsta').value) + digit;
    window.opener.changeData(stanumber - 1, document.getElementById('selectline').value, document.getElementById('selecttype').value, document.getElementById('selectdestination').value, document.getElementById('selectcar').value);
}