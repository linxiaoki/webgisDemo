# webgis-demo [主页](https://linxiaoki.github.io/webgisDemo)：
- [leaflet demo1](https://linxiaoki.github.io/webgisDemo/LeafletDemo1/):基于Leaflet实现台风实时路径渲染。
- [OpenLayers Demo](https://linxiaoki.github.io/webgisDemo/openlayersDemo/)

### Leaflet - 链式调用 - [api参考文档](https://leafletjs.com/reference-1.6.0.html#marker)
#### 展示地图

##### 地图初始化
`var mymap = L.map('mapid').setView([51.505, -0.09], 13);`

##### 图层叠加
```
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",{
        id: 'mapbox/streets-v11',
        accessToken: 'your-access-token',
        maxZoom: 18,
        tileSize: 512,
        zoomOffset: -1,
    })
```
问题： 关于 zoomOffset 是什么？  tiles/{tilesize}   和  tileSize的关系是？[mapbox api网址](https://docs.mapbox.com/api/maps/#retrieve-raster-tiles-from-styles)
关于zoomOffset，默认是0。因为api返回的瓦片是 512\*512，leaflet 默认是 256\*256，所以需要 zoomOffset 改为 -1 ？ 图片的 z-1》
id 这个参数该怎么填：参考[mapbox docs/ styles id](https://docs.mapbox.com/help/glossary/style-id/)

[mapbox 地图API文档](https://docs.mapbox.com/api/maps/#static-tiles)


#### 覆盖物：标注，矢量图形元素，信息窗口
```js
L.marker/circle/polygon(坐标，样式).addTo(地图)
.bindPopup(一些话，可以识别html标签).openPopup()

// openOn(地图)会关闭之前已经弹出的窗口, addTo(地图) 则不会关闭。
L.popup().setLatLng(坐标).setContent(内容).openOn(地图)  
```


#### 控件


#### 事件（触发Js事件）
map.on('click',函数内容)

#### 地图工具（标注，绘制（画矩形、圆），测距，测面）


#### 右键菜单


#### 服务


#### 其他



