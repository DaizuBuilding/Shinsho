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
    typesInfos = data.typesinfo;
    StationsInfos = data.stationsinfo;
}
getInformations();

function updateTypeOptions() {
    selecttype.innerHTML = '';
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
    updateDestinationOptions();
}

function updateDestinationOptions() {
    selectdestination.innerHTML = '';
    console.log(selecttype.value);
    const destinfo = linesInfos[selectline.value].types[selecttype.value].destination;
    let j = 0;
    destinfo.forEach(d => {
        const destoption = document.createElement('option');
        destoption.value = j;
        destoption.text = d;
        j++;
        selectdestination.add(destoption);
    });
    updateStationOptions();
}

function updateStationOptions() {
    selectsta.innerHTML = '';
    const stopinfo = typesInfos[String(selectline.value) + String(selecttype.value)].stops;
    let k = 0;
    stopinfo.forEach(s => {
        const stopoption = document.createElement('option');
        stopoption.value = k;
        stopoption.text = `${String(StationsInfos[s].number).padStart(5, '0')}_${StationsInfos[s].name}`;
        k++;
        selectdestination.add(stopoption);
    });
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
    window.opener.changeData(document.getElementById('selectsta').value, document.getElementById('selectline').value, document.getElementById('selecttype').value, document.getElementById('selectdestination').value, document.getElementById('selectcar').value);
}