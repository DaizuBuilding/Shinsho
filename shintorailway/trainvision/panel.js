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
let selectdestination = document.getElementById('selectdestination');

let informations;
let linesInfos;
async function getInformations() {
    const response = await fetch('./informations.json');
    const data = await response.json();
    informations = data;

    linesInfos = data.linesinfo;
}
getInformations();

function updateOptions() {
    selecttype.innerHTML = '';
    selectdestination.innerHTML = '';
    const lineinfo = linesInfos[selectline.value].types;
    console.log(lineinfo);
    let i = 0;
    lineinfo.forEach(l => {
        const typeoption = document.createElement('option');
        typeoption.value = i;
        typeoption.text = l.type;
        i++;
        selecttype.add(typeoption);
    });
    console.log(selecttype.value);
    const destinfo = linesInfos[selectline.value].types[selecttype.value].destination;
    let j = 0;
    destinfo.forEach(d => {
        const destoption = document.createElement('option');
        destoption.value = j;
        destoption.text = d
        j++;
        selectdestination.add(destoption);
    })
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