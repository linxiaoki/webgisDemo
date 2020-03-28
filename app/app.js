//app.js
var map;

function onLoad(){
    var zoom = 11;
    map = L.map('mapDiv').setView([51.505,-0.09], 11);
    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",{
        id: 'mapbox/streets-v11',
        accessToken: 'pk.eyJ1Ijoia2Fzcy0xIiwiYSI6ImNrODlsNGRhMTA4OW0zZm5yNW1leGQwdngifQ.C4h5d62ciJWjKq1cDsEjzQ',
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors,<a href="https://creativecommons.org/licenses/by-sa/2.0/"CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/"Mapbox</a>',
        maxZoom: 18,
        tileSize: 512,
        zoomOffset: -1,
    }).addTo(map);

    // 创建标记marker，圆circle，多边形polygon，提示窗口，绑定 popup
    createOverlay();

    // 点击事件
    map.on('click',function(e){
        var lat = e.latlng["lat"].toFixed(6).toString();
        var lng = e.latlng["lng"].toFixed(6).toString();
        console.log(e.latlng);
        console.log(e.latlng["lat"]);
        //L.popup().setLatLng(e.latlng).setContent(e.latlng.toString()).openOn(map);
        L.popup().setLatLng(e.latlng).setContent("纬度："+ lat +"，经度：" + lng).openOn(map);
    })
}

// marker, circle, polygon, popup
function createOverlay(){
    var marker = L.marker([51.5,-0.09]).addTo(map);
    var circle = L.circle([51.508, -0.11],{
        color: 'red',
        weight: 4,
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(map).bindPopup("I am a circle.");
    var polygon = L.polygon([[51.509,-0.08],[51.503,-0.06],[51.51,-0.047]],{
        color: 'red'
    }).addTo(map).bindPopup("Im am a popygon.");
    marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

    var popup = L.popup().setLatLng([51.55, -0.09]).setContent("I am a standalone popup.").addTo(map);
}

// mobile_map
function onLoad_mobile(){
    //map = L.map('mapDiv').setView([51.505,-0.09], 11);
    map = L.map('mapDiv').fitWorld();
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',{
        id: 'mapbox/streets-v11',
        accessToken: 'pk.eyJ1Ijoia2Fzcy0xIiwiYSI6ImNrODlsNGRhMTA4OW0zZm5yNW1leGQwdngifQ.C4h5d62ciJWjKq1cDsEjzQ',
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/"OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/"CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        tileSize: 512,
        zoomOffset: -1
    }).addTo(map);
    // 定位
    map.locate({setView: true, maxZoom: 16});
    map.on('locationfound',onLocationFound);
    map.on('locationerror',onLocationError);
}

function onLocationFound(e){
    var radius = e.accuracy;
    console.log("radius:",radius);
    L.marker(e.latlng).add.To(map).bindPopup("You are within "+ radius + "meters from this point").openPopup();
    L.circle(e.latlnt,radius).addTo(map);
}
function onLocationError(e){
    alert("报错了");
    alert(e.message);
}

module.exports = {
    onLoad: onLoad,
    onLoad_mobile: onLoad_mobile
}