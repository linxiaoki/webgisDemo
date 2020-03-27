//app.js
var map;

function onLoad(){
    var zoom = 11;
    map = L.map('mapDiv').setView([51.505,-0.09], 11);
    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",{
        id: 'mapbox/streets-v11',
        //accessToken: {{}}
        accessToken: 'pk.eyJ1Ijoia2Fzcy0xIiwiYSI6ImNrODlsNGRhMTA4OW0zZm5yNW1leGQwdngifQ.C4h5d62ciJWjKq1cDsEjzQ',
        maxZoom: 18,
        tileSize: 512,
        zoomOffset: -1,
    }).addTo(map);

}

module.exports = {
    onLoad: onLoad
}