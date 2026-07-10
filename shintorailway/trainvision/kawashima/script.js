let positionSFX = 0;
let positionSFY = 0;
let positionSFR = 0;
let adjustFSPosition = 0;

const stationNames1 = document.querySelectorAll('.staname1');
const stationNames2 = document.querySelectorAll('.staname2');
const stationNames3 = document.querySelectorAll('.staname3');
const stationNames4 = document.querySelectorAll('.staname4');
const stationNames5 = document.querySelectorAll('.staname5');
const stationNames6 = document.querySelectorAll('.staname6');
function visionChangeLocal() {
    stationNames1.forEach(img => { 
        const base = img.dataset.base;
        img.src = `${base}${informations.typesinfo[lineIndex].stops[adjustStationIndex(stationIndex)]}.png`;
    });
    stationNames2.forEach(img => {
        const base = img.dataset.base;
        img.src = `${base}${informations.typesinfo[lineIndex].stops[adjustStationIndex(stationIndex + 1)]}.png`;
    });
    stationNames3.forEach(img => {
        const base = img.dataset.base;
        img.src = `${base}${informations.typesinfo[lineIndex].stops[adjustStationIndex(stationIndex + 2)]}.png`;
    });
    stationNames4.forEach(img => {
        const base = img.dataset.base;
        img.src = `${base}${informations.typesinfo[lineIndex].stops[adjustStationIndex(stationIndex + 3)]}.png`;
    });
}