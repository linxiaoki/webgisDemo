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
jquery__WEBPACK_IMPORTED_MODULE_0___default.a.ajax('//typhoon.zjwater.gov.cn/Api/TyphoonInfo/201926', {
  type: 'GET',
  dataType: 'jsonp',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvdHlwaG9vbi5wbmciLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwialF1ZXJ5XCIiXSwibmFtZXMiOlsidHlwaG9vbkltZyIsInJlcXVpcmUiLCJtYXBBdHRyIiwibWFwYm94VXJsIiwic2F0ZWxsaXRlIiwiTCIsInRpbGVMYXllciIsImlkIiwiYXR0cmlidXRpb24iLCJzdHJlZXRzIiwiZ3JheXNjYWxlIiwibWFwIiwiY2VudGVyIiwiem9vbSIsImxheWVycyIsImJhc2VtYXAiLCJjb250cm9sIiwiYWRkVG8iLCJqcXVlcnkiLCJhamF4IiwidHlwZSIsImRhdGFUeXBlIiwic3VjY2VzcyIsInR5cGhvb25EYXRhIiwiYW5pbWF0ZURyYXdMaW5lIiwicG9pbnRzIiwiaWNvbiIsInBvcHVwQ29udGVudCIsImRyYXdQb2ludHMiLCJtYXJrZXIiLCJsZW5ndGgiLCJsaW5lTGF5ZXJzIiwiY291bnQiLCJ0aW1lIiwic2V0SW50ZXJ2YWwiLCJwdXNoIiwicmVtb3ZlTGF5ZXIiLCJwb2x5bGluZSIsImNvbG9yIiwiYmluZFBvcHVwIiwib3BlblBvcHVwIiwiY2xlYXJJbnRlcnZhbCIsImZvcmVjYXN0IiwicG9seWxpbmVQb2ludHMiLCJmb3JFYWNoIiwicG9pbnQiLCJOdW1iZXIiLCJwYW5UbyIsInR5cGhvb25JY29uIiwiaWNvblVybCIsImljb25TaXplIiwiaWNvbkFuY2hvciJdLCJtYXBwaW5ncyI6Ijs7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEw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RzNDLENBQUMsQ0FBQ3FCLElBQUYsQ0FBTztBQUNyQnVCLGFBQU8sRUFBRWpELFVBRFk7QUFDQTtBQUNyQmtELGNBQVEsRUFBRSxDQUFDLEVBQUQsRUFBSyxFQUFMLENBRlc7QUFHckJDLGdCQUFVLEVBQUUsQ0FBQyxFQUFELEVBQUssRUFBTDtBQUhTLEtBQVAsQ0FBbEI7QUFLQSxRQUFJeEIsWUFBWSxHQUFHLFFBQVFKLFdBQVcsQ0FBQyxDQUFELENBQVgsQ0FBZSxNQUFmLENBQVIsR0FBaUMsV0FBakMsR0FDZm1CLFFBQVEsQ0FBQ0EsUUFBUSxDQUFDWixNQUFULEdBQWtCLENBQW5CLENBQVIsQ0FBOEIsSUFBOUIsQ0FESixDQXhDNEIsQ0EwQzVCOztBQUNBTixtQkFBZSxDQUFDbUIsY0FBRCxFQUFpQkssV0FBakIsRUFBOEJyQixZQUE5QixDQUFmO0FBQ0g7QUEvQzBELENBQS9EO0FBaURBOzs7Ozs7O0FBT0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwRkE7QUFBQTs7Ozs7Ozs7Ozs7O0FDQUEsaUJBQWlCLHFCQUF1QiwwQzs7Ozs7Ozs7Ozs7QUNBeEMsd0IiLCJmaWxlIjoiYnVuZGxlLWVmMDIzMGJlMjRkZjA4Yzk3MDEyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9hcHAvbWFpbi5qc1wiKTtcbiIsIi8vYXBwLmpzXHJcbmltcG9ydCBqcXVlcnkgZnJvbSAnanF1ZXJ5J1xyXG5cclxudmFyIHR5cGhvb25JbWcgPSByZXF1aXJlKCcuL3R5cGhvb24ucG5nJylcclxudmFyIG1hcEF0dHIgPSAnTWFwIGRhdGEgJmNvcHk7IDxhIGhyZWY9XCJodHRwczovL3d3dy5vcGVuc3RyZWV0bWFwLm9yZy9cIj7kuJbnlYzlnLDlm748L2E+IGNvbnRyaWJ1dG9ycywgJyArXHJcbiAgICAnSW1hZ2VyeSDCqSA8YSBocmVmPVwiaHR0cHM6Ly93d3cubWFwYm94LmNvbS9cIj5NYXBib3g8L2E+JztcclxudmFyIG1hcGJveFVybCA9IFwiaHR0cHM6Ly9hcGkudGlsZXMubWFwYm94LmNvbS92NC97aWR9L3t6fS97eH0ve3l9LnBuZz9hY2Nlc3NfdG9rZW49XCIgK1xyXG4gICAgXCJway5leUoxSWpvaWVtaGhibWR6TVRJeklpd2lZU0k2SW1Ock1YUjZOalpvYnpBd2VXMHpZM0JyY25CNFltRjZNM1lpZlEubkhtTmFpX1VUY0VKZHkxVlRiQ1hmZ1wiO1xyXG5cclxudmFyIHNhdGVsbGl0ZSA9IEwudGlsZUxheWVyKG1hcGJveFVybCwgeyBpZDogJ21hcGJveC5zYXRlbGxpdGUnLCBhdHRyaWJ1dGlvbjogbWFwQXR0ciB9KTtcclxudmFyIHN0cmVldHMgPSBMLnRpbGVMYXllcihtYXBib3hVcmwsIHsgaWQ6ICdtYXBib3guc3RyZWV0cycsIGF0dHJpYnV0aW9uOiBtYXBBdHRyIH0pO1xyXG52YXIgZ3JheXNjYWxlID0gTC50aWxlTGF5ZXIobWFwYm94VXJsLCB7IGlkOiAnbWFwYm94LmxpZ2h0JyB9KTtcclxuXHJcbnZhciBtYXAgPSBMLm1hcChcIm1hcERpdlwiLCB7XHJcbiAgICBjZW50ZXI6IFs0NS41MSwgLTEyMi4yXSxcclxuICAgIHpvb206IDYsXHJcbiAgICBsYXllcnM6IFtcclxuICAgICAgICBzYXRlbGxpdGUsIHN0cmVldHMsIGdyYXlzY2FsZVxyXG4gICAgXVxyXG59KTtcclxudmFyIGJhc2VtYXAgPSB7XHJcbiAgICBcIuW9seWDj+WbvlwiOiBzYXRlbGxpdGUsXHJcbiAgICBcIjxzcGFuIHN0eWxlPSdjb2xvcjogZ3JheSc+6KGX6YGT5Zu+PC9zcGFuPlwiOiBzdHJlZXRzLFxyXG4gICAgLy8nZ3JheXNjYWxlJzogZ3JheXNjYWxlLFxyXG59O1xyXG5MLmNvbnRyb2wubGF5ZXJzKGJhc2VtYXApLmFkZFRvKG1hcCk7XHJcblxyXG5cclxuanF1ZXJ5LmFqYXgoJy8vdHlwaG9vbi56andhdGVyLmdvdi5jbi9BcGkvVHlwaG9vbkluZm8vMjAxOTI2Jywge1xyXG4gICAgdHlwZTogJ0dFVCcsXHJcbiAgICBkYXRhVHlwZTogJ2pzb25wJyxcclxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICh0eXBob29uRGF0YSkge1xyXG4gICAgICAgIC8vIOWKqOaAgeeUu+e6v1xyXG4gICAgICAgIGZ1bmN0aW9uIGFuaW1hdGVEcmF3TGluZShwb2ludHMsIGljb24sIHBvcHVwQ29udGVudCkge1xyXG4gICAgICAgICAgICB2YXIgZHJhd1BvaW50cyA9IFtwb2ludHNbMF1dO1xyXG4gICAgICAgICAgICB2YXIgbWFya2VyID0gTC5tYXJrZXIoZHJhd1BvaW50c1tkcmF3UG9pbnRzLmxlbmd0aCAtIDFdLCB7IGljb246IGljb24gfSkuYWRkVG8obWFwKTtcclxuICAgICAgICAgICAgdmFyIGxpbmVMYXllcnM7XHJcbiAgICAgICAgICAgIHZhciBjb3VudCA9IDA7XHJcbiAgICAgICAgICAgIHZhciB0aW1lID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvdW50IDwgcG9pbnRzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudCArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGRyYXdQb2ludHMucHVzaChwb2ludHNbY291bnRdKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBsaW5lTGFlcnMgJiYgbWFwLnJlbW92ZUxheWVyKGxpbmVMYXllcnMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxpbmVMYXllcnMgJiYgbWFwLnJlbW92ZUxheWVyKGxpbmVMYXllcnMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxpbmVMYXllcnMgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcC5yZW1vdmVMYXllcihtYXJrZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxpbmVMYXllcnMgPSBMLnBvbHlsaW5lKGRyYXdQb2ludHMsIHsgY29sb3I6ICdibHVlJyB9KS5hZGRUbyhtYXApO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcmtlciA9IEwubWFya2VyKGRyYXdQb2ludHNbZHJhd1BvaW50cy5sZW5ndGggLSAxXSwgeyBpY29uOiBpY29uIH0pLmFkZFRvKG1hcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50ID09IHBvaW50cy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlci5iaW5kUG9wdXAocG9wdXBDb250ZW50KS5vcGVuUG9wdXAoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImFkZFwiKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCAyMDApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vdHlwaG9vbkNlbnRlcj1bTnVtYmVyKHR5cGhvb25EYXRhWzBdW1wiY2VudGVybGF0XCJdKSwgTnVtYmVyKHR5cGhvb25EYXRhWzBdW1wiY2VudGVybG5nXCJdKV07XHJcbiAgICAgICAgLy9tYXAucGFuVG8odHlwaG9vbkNlbnRlcik7IFxyXG4gICAgICAgIHZhciBmb3JlY2FzdCA9IHR5cGhvb25EYXRhWzBdW1wicG9pbnRzXCJdO1xyXG4gICAgICAgIHZhciBwb2x5bGluZVBvaW50cyA9IFtdO1xyXG4gICAgICAgIGZvcmVjYXN0LmZvckVhY2gocG9pbnQgPT4ge1xyXG4gICAgICAgICAgICBwb2x5bGluZVBvaW50cy5wdXNoKFtOdW1iZXIocG9pbnRbJ2xhdCddKSwgTnVtYmVyKHBvaW50WydsbmcnXSldKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG1hcC5wYW5Ubyhwb2x5bGluZVBvaW50c1swXSk7XHJcbiAgICAgICAgLy8g5Zu+5qCHXHJcbiAgICAgICAgdmFyIHR5cGhvb25JY29uID0gTC5pY29uKHtcclxuICAgICAgICAgICAgaWNvblVybDogdHlwaG9vbkltZywgLy8nLi90b3JuYWRvLnBuZycsXHJcbiAgICAgICAgICAgIGljb25TaXplOiBbMjgsIDI4XSxcclxuICAgICAgICAgICAgaWNvbkFuY2hvcjogWzE0LCAxNF1cclxuICAgICAgICB9KTtcclxuICAgICAgICB2YXIgcG9wdXBDb250ZW50ID0gJzxiPicgKyB0eXBob29uRGF0YVswXVsnbmFtZSddICsgJzwvYj48L2JyPicgK1xyXG4gICAgICAgICAgICBmb3JlY2FzdFtmb3JlY2FzdC5sZW5ndGggLSAxXVsnamwnXTtcclxuICAgICAgICAvLyDliqjmgIHnlLvnur9cclxuICAgICAgICBhbmltYXRlRHJhd0xpbmUocG9seWxpbmVQb2ludHMsIHR5cGhvb25JY29uLCBwb3B1cENvbnRlbnQpO1xyXG4gICAgfVxyXG59KTtcclxuLypcclxudmFyIGRvY3VtZW50SGVhZCA9ICQoXCJoZWFkXCIpWzBdO1xyXG52YXIganM9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcbmpzLnNyYz1cImh0dHA6Ly90eXBob29uLnpqd2F0ZXIuZ292LmNuL0FwaS9UeXBob29uSW5mby8yMDE5MjY/Y2FsbGJhY2s9YWRkUG9seWxpbmVBbmRNYXJrZXJcIjtcclxuZG9jdW1lbnRIZWFkLmFwcGVuZChqcyk7XHJcbiovXHJcblxyXG4vKlxyXG4vL+Wbnuiwg+WHveaVsO+8miDliqjmgIHnlLvnur9cclxuZnVuY3Rpb24gYWRkUG9seWxpbmVBbmRNYXJrZXIodHlwaG9vbkRhdGEpIHtcclxuICAgIC8vIOWKqOaAgeeUu+e6v1xyXG4gICAgZnVuY3Rpb24gYW5pbWF0ZURyYXdMaW5lKHBvaW50cywgaWNvbiwgcG9wdXBDb250ZW50KSB7XHJcbiAgICAgICAgdmFyIGRyYXdQb2ludHMgPSBbcG9pbnRzWzBdXTtcclxuICAgICAgICB2YXIgbWFya2VyID0gTC5tYXJrZXIoZHJhd1BvaW50c1tkcmF3UG9pbnRzLmxlbmd0aCAtIDFdLCB7IGljb246IGljb24gfSkuYWRkVG8obWFwKTtcclxuICAgICAgICB2YXIgbGluZUxheWVycztcclxuICAgICAgICB2YXIgY291bnQgPSAwO1xyXG4gICAgICAgIHZhciB0aW1lID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY291bnQgPCBwb2ludHMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgY291bnQgKz0gMTtcclxuICAgICAgICAgICAgICAgIGRyYXdQb2ludHMucHVzaChwb2ludHNbY291bnRdKTtcclxuICAgICAgICAgICAgICAgIC8vIGxpbmVMYWVycyAmJiBtYXAucmVtb3ZlTGF5ZXIobGluZUxheWVycyk7XHJcbiAgICAgICAgICAgICAgICBsaW5lTGF5ZXJzICYmIG1hcC5yZW1vdmVMYXllcihsaW5lTGF5ZXJzKTtcclxuICAgICAgICAgICAgICAgIGxpbmVMYXllcnMgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgbWFwLnJlbW92ZUxheWVyKG1hcmtlcik7XHJcbiAgICAgICAgICAgICAgICBsaW5lTGF5ZXJzID0gTC5wb2x5bGluZShkcmF3UG9pbnRzLCB7IGNvbG9yOiAnYmx1ZScgfSkuYWRkVG8obWFwKTtcclxuICAgICAgICAgICAgICAgIG1hcmtlciA9IEwubWFya2VyKGRyYXdQb2ludHNbZHJhd1BvaW50cy5sZW5ndGggLSAxXSwgeyBpY29uOiBpY29uIH0pLmFkZFRvKG1hcCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY291bnQgPT0gcG9pbnRzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXJrZXIuYmluZFBvcHVwKHBvcHVwQ29udGVudCkub3BlblBvcHVwKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiYWRkXCIpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMjAwKVxyXG4gICAgfVxyXG4gICAgLy90eXBob29uQ2VudGVyPVtOdW1iZXIodHlwaG9vbkRhdGFbMF1bXCJjZW50ZXJsYXRcIl0pLCBOdW1iZXIodHlwaG9vbkRhdGFbMF1bXCJjZW50ZXJsbmdcIl0pXTtcclxuICAgIC8vbWFwLnBhblRvKHR5cGhvb25DZW50ZXIpO1xyXG4gICAgdmFyIGZvcmVjYXN0ID0gdHlwaG9vbkRhdGFbMF1bXCJwb2ludHNcIl07XHJcbiAgICB2YXIgcG9seWxpbmVQb2ludHMgPSBbXTtcclxuICAgIGZvcmVjYXN0LmZvckVhY2gocG9pbnQgPT4ge1xyXG4gICAgICAgIHBvbHlsaW5lUG9pbnRzLnB1c2goW051bWJlcihwb2ludFsnbGF0J10pLCBOdW1iZXIocG9pbnRbJ2xuZyddKV0pXHJcbiAgICB9KTtcclxuICAgIG1hcC5wYW5Ubyhwb2x5bGluZVBvaW50c1swXSk7XHJcbiAgICAvLyDlm77moIdcclxuICAgIHZhciB0eXBob29uSWNvbiA9IEwuaWNvbih7XHJcbiAgICAgICAgaWNvblVybDogdHlwaG9vbkltZyAsIC8vJy4vdG9ybmFkby5wbmcnLFxyXG4gICAgICAgIGljb25TaXplOiBbMjgsIDI4XSxcclxuICAgICAgICBpY29uQW5jaG9yOiBbMTQsIDE0XVxyXG4gICAgfSk7XHJcbiAgICBwb3B1cENvbnRlbnQgPSAnPGI+JyArIHR5cGhvb25EYXRhWzBdWyduYW1lJ10gKyAnPC9iPjwvYnI+JyArXHJcbiAgICAgICAgZm9yZWNhc3RbZm9yZWNhc3QubGVuZ3RoIC0gMV1bJ2psJ107XHJcbiAgICAvLyDliqjmgIHnlLvnur9cclxuICAgIGFuaW1hdGVEcmF3TGluZShwb2x5bGluZVBvaW50cywgdHlwaG9vbkljb24sIHBvcHVwQ29udGVudCk7XHJcbn07Ki9cclxuXHJcblxyXG5cclxuIiwiaW1wb3J0ICcuL2FwcC5qcyc7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiMGI4NTg1ZGU2ODQ3N2YxOTZjN2U3ODJjZDI4ZjQwOGEucG5nXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBqUXVlcnk7Il0sInNvdXJjZVJvb3QiOiIifQ==