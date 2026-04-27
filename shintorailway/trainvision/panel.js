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

let selectline = document.getElementById('selectline');
let selecttype = document.getElementById('selecttype');

let informations;
let linesInfos;
async function getInformations() {
    const response = await fetch('./informations.json');
    const data = await response.json();
    informations = data;

    linesInfos = data.linesinfo;
}
getInformations();

selecttype.innerHTML = '';

function updateOptions() {
    const lineinfo = linesInfos[selectline.value].types;
    let i = 0;
    lineinfo.forEach(type => {
        const option = document.createElement('option');
        option.value = i;
        option.text = type;
        i++;
        selecttype.add(option);
    });
    // if (document.getElementById('selectline').value == 0) {
        // const lineinfo = linesInfos[0].types;
        // let i = 0;
        // lineinfo.forEach(type => {
            // const option = document.createElement('option');
            // option.value = i;
            // option.text = type;
            // i++;
            //  document.getElementById('selecttype').add(option);
        // });
}

console.log(document.getElementById('selectsta').value);

function returnWindow() {
    const error = document.getElementById('error');
    if (!window.opener || window.opener.closed) {
        error.innerHTML = 'ビジョン画面が開かれていません。次のサイトにアクセスしてください：https://daizubuilding.github.io/Shinsho/shintorailway/trainvision/';
        return false;
    } else {
        error.innerHTML = '';
    }
    document.getElementById('selectsta').value = Number(document.getElementById('selectsta').value) + digit;
    window.opener.changeData(document.getElementById('selectsta').value - 1, document.getElementById('selectline').value, document.getElementById('selecttype').value, document.getElementById('selectdestination').value, document.getElementById('selectcar').value);
}