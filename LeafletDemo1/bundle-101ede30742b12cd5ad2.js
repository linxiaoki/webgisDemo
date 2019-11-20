/*! 版权所有?_? */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/app.js":
/*!********************!*\
  !*** ./app/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
//app.js


var typhoonImg = __webpack_require__(/*! ./typhoon.png */ "./app/typhoon.png");

var mapAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">世界地图</a> contributors, ' + 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
var mapboxUrl = "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=" + "pk.eyJ1IjoiemhhbmdzMTIzIiwiYSI6ImNrMXR6NjZobzAweW0zY3BrcnB4YmF6M3YifQ.nHmNai_UTcEJdy1VTbCXfg";
var satellite = L.tileLayer(mapboxUrl, {
  id: 'mapbox.satellite',
  attribution: mapAttr
});
var streets = L.tileLayer(mapboxUrl, {
  id: 'mapbox.streets',
  attribution: mapAttr
});
var grayscale = L.tileLayer(mapboxUrl, {
  id: 'mapbox.light'
});
var map = L.map("mapDiv", {
  center: [45.51, -122.2],
  zoom: 6,
  layers: [satellite, streets, grayscale]
});
var basemap = {
  "影像图": satellite,
  "<span style='color: gray'>街道图</span>": streets //'grayscale': grayscale,

};
L.control.layers(basemap).addTo(map);
jquery__WEBPACK_IMPORTED_MODULE_0___default.a.ajax('http://typhoon.zjwater.gov.cn/Api/TyphoonInfo/201926', {
  type: 'GET',
  dataType: 'jsonp',
  jsonp: 'callback',
  success: function success(typhoonData) {
    // 动态画线
    function animateDrawLine(points, icon, popupContent) {
      var drawPoints = [points[0]];
      var marker = L.marker(drawPoints[drawPoints.length - 1], {
        icon: icon
      }).addTo(map);
      var lineLayers;
      var count = 0;
      var time = setInterval(function () {
        if (count < points.length - 1) {
          count += 1;
          drawPoints.push(points[count]); // lineLaers && map.removeLayer(lineLayers);

          lineLayers && map.removeLayer(lineLayers);
          lineLayers = null;
          map.removeLayer(marker);
          lineLayers = L.polyline(drawPoints, {
            color: 'blue'
          }).addTo(map);
          marker = L.marker(drawPoints[drawPoints.length - 1], {
            icon: icon
          }).addTo(map);

          if (count == points.length - 1) {
            marker.bindPopup(popupContent).openPopup();
          } //console.log("add")

        } else {
          clearInterval(time);
        }
      }, 200);
    } //typhoonCenter=[Number(typhoonData[0]["centerlat"]), Number(typhoonData[0]["centerlng"])];
    //map.panTo(typhoonCenter); 


    var forecast = typhoonData[0]["points"];
    var polylinePoints = [];
    forecast.forEach(function (point) {
      polylinePoints.push([Number(point['lat']), Number(point['lng'])]);
    });
    map.panTo(polylinePoints[0]); // 图标

    var typhoonIcon = L.icon({
      iconUrl: typhoonImg,
      //'./tornado.png',
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });
    var popupContent = '<b>' + typhoonData[0]['name'] + '</b></br>' + forecast[forecast.length - 1]['jl']; // 动态画线

    animateDrawLine(polylinePoints, typhoonIcon, popupContent);
  }
});
/*
var documentHead = $("head")[0];
var js=document.createElement('script');
js.src="http://typhoon.zjwater.gov.cn/Api/TyphoonInfo/201926?callback=addPolylineAndMarker";
documentHead.append(js);
*/

/*
//回调函数： 动态画线
function addPolylineAndMarker(typhoonData) {
    // 动态画线
    function animateDrawLine(points, icon, popupContent) {
        var drawPoints = [points[0]];
        var marker = L.marker(drawPoints[drawPoints.length - 1], { icon: icon }).addTo(map);
        var lineLayers;
        var count = 0;
        var time = setInterval(() => {
            if (count < points.length - 1) {
                count += 1;
                drawPoints.push(points[count]);
                // lineLaers && map.removeLayer(lineLayers);
                lineLayers && map.removeLayer(lineLayers);
                lineLayers = null;
                map.removeLayer(marker);
                lineLayers = L.polyline(drawPoints, { color: 'blue' }).addTo(map);
                marker = L.marker(drawPoints[drawPoints.length - 1], { icon: icon }).addTo(map);
                if (count == points.length - 1) {
                    marker.bindPopup(popupContent).openPopup();
                }
                //console.log("add")
            } else {
                clearInterval(time);
            }
        }, 200)
    }
    //typhoonCenter=[Number(typhoonData[0]["centerlat"]), Number(typhoonData[0]["centerlng"])];
    //map.panTo(typhoonCenter);
    var forecast = typhoonData[0]["points"];
    var polylinePoints = [];
    forecast.forEach(point => {
        polylinePoints.push([Number(point['lat']), Number(point['lng'])])
    });
    map.panTo(polylinePoints[0]);
    // 图标
    var typhoonIcon = L.icon({
        iconUrl: typhoonImg , //'./tornado.png',
        iconSize: [28, 28],
        iconAnchor: [14, 14]
    });
    popupContent = '<b>' + typhoonData[0]['name'] + '</b></br>' +
        forecast[forecast.length - 1]['jl'];
    // 动态画线
    animateDrawLine(polylinePoints, typhoonIcon, popupContent);
};*/

/***/ }),

/***/ "./app/main.js":
/*!*********************!*\
  !*** ./app/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.js */ "./app/app.js");


/***/ }),

/***/ "./app/typhoon.png":
/*!*************************!*\
  !*** ./app/typhoon.png ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "0b8585de68477f196c7e782cd28f408a.png";

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvdHlwaG9vbi5wbmciLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwialF1ZXJ5XCIiXSwibmFtZXMiOlsidHlwaG9vbkltZyIsInJlcXVpcmUiLCJtYXBBdHRyIiwibWFwYm94VXJsIiwic2F0ZWxsaXRlIiwiTCIsInRpbGVMYXllciIsImlkIiwiYXR0cmlidXRpb24iLCJzdHJlZXRzIiwiZ3JheXNjYWxlIiwibWFwIiwiY2VudGVyIiwiem9vbSIsImxheWVycyIsImJhc2VtYXAiLCJjb250cm9sIiwiYWRkVG8iLCJqcXVlcnkiLCJhamF4IiwidHlwZSIsImRhdGFUeXBlIiwianNvbnAiLCJzdWNjZXNzIiwidHlwaG9vbkRhdGEiLCJhbmltYXRlRHJhd0xpbmUiLCJwb2ludHMiLCJpY29uIiwicG9wdXBDb250ZW50IiwiZHJhd1BvaW50cyIsIm1hcmtlciIsImxlbmd0aCIsImxpbmVMYXllcnMiLCJjb3VudCIsInRpbWUiLCJzZXRJbnRlcnZhbCIsInB1c2giLCJyZW1vdmVMYXllciIsInBvbHlsaW5lIiwiY29sb3IiLCJiaW5kUG9wdXAiLCJvcGVuUG9wdXAiLCJjbGVhckludGVydmFsIiwiZm9yZWNhc3QiLCJwb2x5bGluZVBvaW50cyIsImZvckVhY2giLCJwb2ludCIsIk51bWJlciIsInBhblRvIiwidHlwaG9vbkljb24iLCJpY29uVXJsIiwiaWNvblNpemUiLCJpY29uQW5jaG9yIl0sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FB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QzRCLENBa0M1Qjs7QUFDQSxRQUFJSyxXQUFXLEdBQUc1QyxDQUFDLENBQUNzQixJQUFGLENBQU87QUFDckJ1QixhQUFPLEVBQUVsRCxVQURZO0FBQ0E7QUFDckJtRCxjQUFRLEVBQUUsQ0FBQyxFQUFELEVBQUssRUFBTCxDQUZXO0FBR3JCQyxnQkFBVSxFQUFFLENBQUMsRUFBRCxFQUFLLEVBQUw7QUFIUyxLQUFQLENBQWxCO0FBS0EsUUFBSXhCLFlBQVksR0FBRyxRQUFRSixXQUFXLENBQUMsQ0FBRCxDQUFYLENBQWUsTUFBZixDQUFSLEdBQWlDLFdBQWpDLEdBQ2ZtQixRQUFRLENBQUNBLFFBQVEsQ0FBQ1osTUFBVCxHQUFrQixDQUFuQixDQUFSLENBQThCLElBQTlCLENBREosQ0F4QzRCLENBMEM1Qjs7QUFDQU4sbUJBQWUsQ0FBQ21CLGNBQUQsRUFBaUJLLFdBQWpCLEVBQThCckIsWUFBOUIsQ0FBZjtBQUNIO0FBaEQrRCxDQUFwRTtBQWtEQTs7Ozs7OztBQU9BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckZBO0FBQUE7Ozs7Ozs7Ozs7OztBQ0FBLGlCQUFpQixxQkFBdUIsMEM7Ozs7Ozs7Ozs7O0FDQXhDLHdCIiwiZmlsZSI6ImJ1bmRsZS0xMDFlZGUzMDc0MmIxMmNkNWFkMi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYXBwL21haW4uanNcIik7XG4iLCIvL2FwcC5qc1xyXG5pbXBvcnQganF1ZXJ5IGZyb20gJ2pxdWVyeSdcclxuXHJcbnZhciB0eXBob29uSW1nID0gcmVxdWlyZSgnLi90eXBob29uLnBuZycpXHJcbnZhciBtYXBBdHRyID0gJ01hcCBkYXRhICZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvXCI+5LiW55WM5Zyw5Zu+PC9hPiBjb250cmlidXRvcnMsICcgK1xyXG4gICAgJ0ltYWdlcnkgwqkgPGEgaHJlZj1cImh0dHBzOi8vd3d3Lm1hcGJveC5jb20vXCI+TWFwYm94PC9hPic7XHJcbnZhciBtYXBib3hVcmwgPSBcImh0dHBzOi8vYXBpLnRpbGVzLm1hcGJveC5jb20vdjQve2lkfS97en0ve3h9L3t5fS5wbmc/YWNjZXNzX3Rva2VuPVwiICtcclxuICAgIFwicGsuZXlKMUlqb2llbWhoYm1kek1USXpJaXdpWVNJNkltTnJNWFI2Tmpab2J6QXdlVzB6WTNCcmNuQjRZbUY2TTNZaWZRLm5IbU5haV9VVGNFSmR5MVZUYkNYZmdcIjtcclxuXHJcbnZhciBzYXRlbGxpdGUgPSBMLnRpbGVMYXllcihtYXBib3hVcmwsIHsgaWQ6ICdtYXBib3guc2F0ZWxsaXRlJywgYXR0cmlidXRpb246IG1hcEF0dHIgfSk7XHJcbnZhciBzdHJlZXRzID0gTC50aWxlTGF5ZXIobWFwYm94VXJsLCB7IGlkOiAnbWFwYm94LnN0cmVldHMnLCBhdHRyaWJ1dGlvbjogbWFwQXR0ciB9KTtcclxudmFyIGdyYXlzY2FsZSA9IEwudGlsZUxheWVyKG1hcGJveFVybCwgeyBpZDogJ21hcGJveC5saWdodCcgfSk7XHJcblxyXG52YXIgbWFwID0gTC5tYXAoXCJtYXBEaXZcIiwge1xyXG4gICAgY2VudGVyOiBbNDUuNTEsIC0xMjIuMl0sXHJcbiAgICB6b29tOiA2LFxyXG4gICAgbGF5ZXJzOiBbXHJcbiAgICAgICAgc2F0ZWxsaXRlLCBzdHJlZXRzLCBncmF5c2NhbGVcclxuICAgIF1cclxufSk7XHJcbnZhciBiYXNlbWFwID0ge1xyXG4gICAgXCLlvbHlg4/lm75cIjogc2F0ZWxsaXRlLFxyXG4gICAgXCI8c3BhbiBzdHlsZT0nY29sb3I6IGdyYXknPuihl+mBk+Wbvjwvc3Bhbj5cIjogc3RyZWV0cyxcclxuICAgIC8vJ2dyYXlzY2FsZSc6IGdyYXlzY2FsZSxcclxufTtcclxuTC5jb250cm9sLmxheWVycyhiYXNlbWFwKS5hZGRUbyhtYXApO1xyXG5cclxuXHJcbmpxdWVyeS5hamF4KCdodHRwOi8vdHlwaG9vbi56andhdGVyLmdvdi5jbi9BcGkvVHlwaG9vbkluZm8vMjAxOTI2Jywge1xyXG4gICAgdHlwZTogJ0dFVCcsXHJcbiAgICBkYXRhVHlwZTogJ2pzb25wJyxcclxuICAgIGpzb25wOiAnY2FsbGJhY2snLFxyXG4gICAgc3VjY2VzczogZnVuY3Rpb24gKHR5cGhvb25EYXRhKSB7XHJcbiAgICAgICAgLy8g5Yqo5oCB55S757q/XHJcbiAgICAgICAgZnVuY3Rpb24gYW5pbWF0ZURyYXdMaW5lKHBvaW50cywgaWNvbiwgcG9wdXBDb250ZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBkcmF3UG9pbnRzID0gW3BvaW50c1swXV07XHJcbiAgICAgICAgICAgIHZhciBtYXJrZXIgPSBMLm1hcmtlcihkcmF3UG9pbnRzW2RyYXdQb2ludHMubGVuZ3RoIC0gMV0sIHsgaWNvbjogaWNvbiB9KS5hZGRUbyhtYXApO1xyXG4gICAgICAgICAgICB2YXIgbGluZUxheWVycztcclxuICAgICAgICAgICAgdmFyIGNvdW50ID0gMDtcclxuICAgICAgICAgICAgdmFyIHRpbWUgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY291bnQgPCBwb2ludHMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ICs9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgZHJhd1BvaW50cy5wdXNoKHBvaW50c1tjb3VudF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGxpbmVMYWVycyAmJiBtYXAucmVtb3ZlTGF5ZXIobGluZUxheWVycyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZUxheWVycyAmJiBtYXAucmVtb3ZlTGF5ZXIobGluZUxheWVycyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZUxheWVycyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFwLnJlbW92ZUxheWVyKG1hcmtlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZUxheWVycyA9IEwucG9seWxpbmUoZHJhd1BvaW50cywgeyBjb2xvcjogJ2JsdWUnIH0pLmFkZFRvKG1hcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFya2VyID0gTC5tYXJrZXIoZHJhd1BvaW50c1tkcmF3UG9pbnRzLmxlbmd0aCAtIDFdLCB7IGljb246IGljb24gfSkuYWRkVG8obWFwKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY291bnQgPT0gcG9pbnRzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyLmJpbmRQb3B1cChwb3B1cENvbnRlbnQpLm9wZW5Qb3B1cCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiYWRkXCIpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIDIwMClcclxuICAgICAgICB9XHJcbiAgICAgICAgLy90eXBob29uQ2VudGVyPVtOdW1iZXIodHlwaG9vbkRhdGFbMF1bXCJjZW50ZXJsYXRcIl0pLCBOdW1iZXIodHlwaG9vbkRhdGFbMF1bXCJjZW50ZXJsbmdcIl0pXTtcclxuICAgICAgICAvL21hcC5wYW5Ubyh0eXBob29uQ2VudGVyKTsgXHJcbiAgICAgICAgdmFyIGZvcmVjYXN0ID0gdHlwaG9vbkRhdGFbMF1bXCJwb2ludHNcIl07XHJcbiAgICAgICAgdmFyIHBvbHlsaW5lUG9pbnRzID0gW107XHJcbiAgICAgICAgZm9yZWNhc3QuZm9yRWFjaChwb2ludCA9PiB7XHJcbiAgICAgICAgICAgIHBvbHlsaW5lUG9pbnRzLnB1c2goW051bWJlcihwb2ludFsnbGF0J10pLCBOdW1iZXIocG9pbnRbJ2xuZyddKV0pXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbWFwLnBhblRvKHBvbHlsaW5lUG9pbnRzWzBdKTtcclxuICAgICAgICAvLyDlm77moIdcclxuICAgICAgICB2YXIgdHlwaG9vbkljb24gPSBMLmljb24oe1xyXG4gICAgICAgICAgICBpY29uVXJsOiB0eXBob29uSW1nLCAvLycuL3Rvcm5hZG8ucG5nJyxcclxuICAgICAgICAgICAgaWNvblNpemU6IFsyOCwgMjhdLFxyXG4gICAgICAgICAgICBpY29uQW5jaG9yOiBbMTQsIDE0XVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHZhciBwb3B1cENvbnRlbnQgPSAnPGI+JyArIHR5cGhvb25EYXRhWzBdWyduYW1lJ10gKyAnPC9iPjwvYnI+JyArXHJcbiAgICAgICAgICAgIGZvcmVjYXN0W2ZvcmVjYXN0Lmxlbmd0aCAtIDFdWydqbCddO1xyXG4gICAgICAgIC8vIOWKqOaAgeeUu+e6v1xyXG4gICAgICAgIGFuaW1hdGVEcmF3TGluZShwb2x5bGluZVBvaW50cywgdHlwaG9vbkljb24sIHBvcHVwQ29udGVudCk7XHJcbiAgICB9XHJcbn0pO1xyXG4vKlxyXG52YXIgZG9jdW1lbnRIZWFkID0gJChcImhlYWRcIilbMF07XHJcbnZhciBqcz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuanMuc3JjPVwiaHR0cDovL3R5cGhvb24uemp3YXRlci5nb3YuY24vQXBpL1R5cGhvb25JbmZvLzIwMTkyNj9jYWxsYmFjaz1hZGRQb2x5bGluZUFuZE1hcmtlclwiO1xyXG5kb2N1bWVudEhlYWQuYXBwZW5kKGpzKTtcclxuKi9cclxuXHJcbi8qXHJcbi8v5Zue6LCD5Ye95pWw77yaIOWKqOaAgeeUu+e6v1xyXG5mdW5jdGlvbiBhZGRQb2x5bGluZUFuZE1hcmtlcih0eXBob29uRGF0YSkge1xyXG4gICAgLy8g5Yqo5oCB55S757q/XHJcbiAgICBmdW5jdGlvbiBhbmltYXRlRHJhd0xpbmUocG9pbnRzLCBpY29uLCBwb3B1cENvbnRlbnQpIHtcclxuICAgICAgICB2YXIgZHJhd1BvaW50cyA9IFtwb2ludHNbMF1dO1xyXG4gICAgICAgIHZhciBtYXJrZXIgPSBMLm1hcmtlcihkcmF3UG9pbnRzW2RyYXdQb2ludHMubGVuZ3RoIC0gMV0sIHsgaWNvbjogaWNvbiB9KS5hZGRUbyhtYXApO1xyXG4gICAgICAgIHZhciBsaW5lTGF5ZXJzO1xyXG4gICAgICAgIHZhciBjb3VudCA9IDA7XHJcbiAgICAgICAgdmFyIHRpbWUgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjb3VudCA8IHBvaW50cy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudCArPSAxO1xyXG4gICAgICAgICAgICAgICAgZHJhd1BvaW50cy5wdXNoKHBvaW50c1tjb3VudF0pO1xyXG4gICAgICAgICAgICAgICAgLy8gbGluZUxhZXJzICYmIG1hcC5yZW1vdmVMYXllcihsaW5lTGF5ZXJzKTtcclxuICAgICAgICAgICAgICAgIGxpbmVMYXllcnMgJiYgbWFwLnJlbW92ZUxheWVyKGxpbmVMYXllcnMpO1xyXG4gICAgICAgICAgICAgICAgbGluZUxheWVycyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBtYXAucmVtb3ZlTGF5ZXIobWFya2VyKTtcclxuICAgICAgICAgICAgICAgIGxpbmVMYXllcnMgPSBMLnBvbHlsaW5lKGRyYXdQb2ludHMsIHsgY29sb3I6ICdibHVlJyB9KS5hZGRUbyhtYXApO1xyXG4gICAgICAgICAgICAgICAgbWFya2VyID0gTC5tYXJrZXIoZHJhd1BvaW50c1tkcmF3UG9pbnRzLmxlbmd0aCAtIDFdLCB7IGljb246IGljb24gfSkuYWRkVG8obWFwKTtcclxuICAgICAgICAgICAgICAgIGlmIChjb3VudCA9PSBwb2ludHMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcmtlci5iaW5kUG9wdXAocG9wdXBDb250ZW50KS5vcGVuUG9wdXAoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJhZGRcIilcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAyMDApXHJcbiAgICB9XHJcbiAgICAvL3R5cGhvb25DZW50ZXI9W051bWJlcih0eXBob29uRGF0YVswXVtcImNlbnRlcmxhdFwiXSksIE51bWJlcih0eXBob29uRGF0YVswXVtcImNlbnRlcmxuZ1wiXSldO1xyXG4gICAgLy9tYXAucGFuVG8odHlwaG9vbkNlbnRlcik7XHJcbiAgICB2YXIgZm9yZWNhc3QgPSB0eXBob29uRGF0YVswXVtcInBvaW50c1wiXTtcclxuICAgIHZhciBwb2x5bGluZVBvaW50cyA9IFtdO1xyXG4gICAgZm9yZWNhc3QuZm9yRWFjaChwb2ludCA9PiB7XHJcbiAgICAgICAgcG9seWxpbmVQb2ludHMucHVzaChbTnVtYmVyKHBvaW50WydsYXQnXSksIE51bWJlcihwb2ludFsnbG5nJ10pXSlcclxuICAgIH0pO1xyXG4gICAgbWFwLnBhblRvKHBvbHlsaW5lUG9pbnRzWzBdKTtcclxuICAgIC8vIOWbvuagh1xyXG4gICAgdmFyIHR5cGhvb25JY29uID0gTC5pY29uKHtcclxuICAgICAgICBpY29uVXJsOiB0eXBob29uSW1nICwgLy8nLi90b3JuYWRvLnBuZycsXHJcbiAgICAgICAgaWNvblNpemU6IFsyOCwgMjhdLFxyXG4gICAgICAgIGljb25BbmNob3I6IFsxNCwgMTRdXHJcbiAgICB9KTtcclxuICAgIHBvcHVwQ29udGVudCA9ICc8Yj4nICsgdHlwaG9vbkRhdGFbMF1bJ25hbWUnXSArICc8L2I+PC9icj4nICtcclxuICAgICAgICBmb3JlY2FzdFtmb3JlY2FzdC5sZW5ndGggLSAxXVsnamwnXTtcclxuICAgIC8vIOWKqOaAgeeUu+e6v1xyXG4gICAgYW5pbWF0ZURyYXdMaW5lKHBvbHlsaW5lUG9pbnRzLCB0eXBob29uSWNvbiwgcG9wdXBDb250ZW50KTtcclxufTsqL1xyXG5cclxuXHJcblxyXG4iLCJpbXBvcnQgJy4vYXBwLmpzJzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCIwYjg1ODVkZTY4NDc3ZjE5NmM3ZTc4MmNkMjhmNDA4YS5wbmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IGpRdWVyeTsiXSwic291cmNlUm9vdCI6IiJ9