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

var mapAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">世界地图</a> contributors, ' + '<a href="http://giscafer.com/">giscafer</a>, ' + 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
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
    popupContent = '<b>' + typhoonData[0]['name'] + '</b></br>' + forecast[forecast.length - 1]['jl']; // 动态画线

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvdHlwaG9vbi5wbmciLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwialF1ZXJ5XCIiXSwibmFtZXMiOlsidHlwaG9vbkltZyIsInJlcXVpcmUiLCJtYXBBdHRyIiwibWFwYm94VXJsIiwic2F0ZWxsaXRlIiwiTCIsInRpbGVMYXllciIsImlkIiwiYXR0cmlidXRpb24iLCJzdHJlZXRzIiwiZ3JheXNjYWxlIiwibWFwIiwiY2VudGVyIiwiem9vbSIsImxheWVycyIsImJhc2VtYXAiLCJjb250cm9sIiwiYWRkVG8iLCJqcXVlcnkiLCJhamF4IiwidHlwZSIsImRhdGFUeXBlIiwic3VjY2VzcyIsInR5cGhvb25EYXRhIiwiYW5pbWF0ZURyYXdMaW5lIiwicG9pbnRzIiwiaWNvbiIsInBvcHVwQ29udGVudCIsImRyYXdQb2ludHMiLCJtYXJrZXIiLCJsZW5ndGgiLCJsaW5lTGF5ZXJzIiwiY291bnQiLCJ0aW1lIiwic2V0SW50ZXJ2YWwiLCJwdXNoIiwicmVtb3ZlTGF5ZXIiLCJwb2x5bGluZSIsImNvbG9yIiwiYmluZFBvcHVwIiwib3BlblBvcHVwIiwiY2xlYXJJbnRlcnZhbCIsImZvcmVjYXN0IiwicG9seWxpbmVQb2ludHMiLCJmb3JFYWNoIiwicG9pbnQiLCJOdW1iZXIiLCJwYW5UbyIsInR5cGhvb25JY29uIiwiaWNvblVybCIsImljb25TaXplIiwiaWNvbkFuY2hvciJdLCJtYXBwaW5ncyI6Ijs7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEw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SUssV0FBVyxHQUFHM0MsQ0FBQyxDQUFDcUIsSUFBRixDQUFPO0FBQ3JCdUIsYUFBTyxFQUFFakQsVUFEWTtBQUNBO0FBQ3JCa0QsY0FBUSxFQUFFLENBQUMsRUFBRCxFQUFLLEVBQUwsQ0FGVztBQUdyQkMsZ0JBQVUsRUFBRSxDQUFDLEVBQUQsRUFBSyxFQUFMO0FBSFMsS0FBUCxDQUFsQjtBQUtBeEIsZ0JBQVksR0FBRyxRQUFRSixXQUFXLENBQUMsQ0FBRCxDQUFYLENBQWUsTUFBZixDQUFSLEdBQWlDLFdBQWpDLEdBQ1htQixRQUFRLENBQUNBLFFBQVEsQ0FBQ1osTUFBVCxHQUFrQixDQUFuQixDQUFSLENBQThCLElBQTlCLENBREosQ0F4QzRCLENBMEM1Qjs7QUFDQU4sbUJBQWUsQ0FBQ21CLGNBQUQsRUFBaUJLLFdBQWpCLEVBQThCckIsWUFBOUIsQ0FBZjtBQUNIO0FBL0MwRCxDQUEvRDtBQWlEQTs7Ozs7OztBQU9BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckZBO0FBQUE7Ozs7Ozs7Ozs7OztBQ0FBLGlCQUFpQixxQkFBdUIsMEM7Ozs7Ozs7Ozs7O0FDQXhDLHdCIiwiZmlsZSI6ImJ1bmRsZS00ZjcyY2U3NDNhYmQwYzliZjc0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYXBwL21haW4uanNcIik7XG4iLCIvL2FwcC5qc1xyXG5pbXBvcnQganF1ZXJ5IGZyb20gJ2pxdWVyeSdcclxuXHJcbnZhciB0eXBob29uSW1nID0gcmVxdWlyZSgnLi90eXBob29uLnBuZycpXHJcbnZhciBtYXBBdHRyID0gJ01hcCBkYXRhICZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvXCI+5LiW55WM5Zyw5Zu+PC9hPiBjb250cmlidXRvcnMsICcgK1xyXG4gICAgJzxhIGhyZWY9XCJodHRwOi8vZ2lzY2FmZXIuY29tL1wiPmdpc2NhZmVyPC9hPiwgJyArXHJcbiAgICAnSW1hZ2VyeSDCqSA8YSBocmVmPVwiaHR0cHM6Ly93d3cubWFwYm94LmNvbS9cIj5NYXBib3g8L2E+JztcclxudmFyIG1hcGJveFVybCA9IFwiaHR0cHM6Ly9hcGkudGlsZXMubWFwYm94LmNvbS92NC97aWR9L3t6fS97eH0ve3l9LnBuZz9hY2Nlc3NfdG9rZW49XCIgK1xyXG4gICAgXCJway5leUoxSWpvaWVtaGhibWR6TVRJeklpd2lZU0k2SW1Ock1YUjZOalpvYnpBd2VXMHpZM0JyY25CNFltRjZNM1lpZlEubkhtTmFpX1VUY0VKZHkxVlRiQ1hmZ1wiO1xyXG5cclxudmFyIHNhdGVsbGl0ZSA9IEwudGlsZUxheWVyKG1hcGJveFVybCwgeyBpZDogJ21hcGJveC5zYXRlbGxpdGUnLCBhdHRyaWJ1dGlvbjogbWFwQXR0ciB9KTtcclxudmFyIHN0cmVldHMgPSBMLnRpbGVMYXllcihtYXBib3hVcmwsIHsgaWQ6ICdtYXBib3guc3RyZWV0cycsIGF0dHJpYnV0aW9uOiBtYXBBdHRyIH0pO1xyXG52YXIgZ3JheXNjYWxlID0gTC50aWxlTGF5ZXIobWFwYm94VXJsLCB7IGlkOiAnbWFwYm94LmxpZ2h0JyB9KTtcclxuXHJcbnZhciBtYXAgPSBMLm1hcChcIm1hcERpdlwiLCB7XHJcbiAgICBjZW50ZXI6IFs0NS41MSwgLTEyMi4yXSxcclxuICAgIHpvb206IDYsXHJcbiAgICBsYXllcnM6IFtcclxuICAgICAgICBzYXRlbGxpdGUsIHN0cmVldHMsIGdyYXlzY2FsZVxyXG4gICAgXVxyXG59KTtcclxudmFyIGJhc2VtYXAgPSB7XHJcbiAgICBcIuW9seWDj+WbvlwiOiBzYXRlbGxpdGUsXHJcbiAgICBcIjxzcGFuIHN0eWxlPSdjb2xvcjogZ3JheSc+6KGX6YGT5Zu+PC9zcGFuPlwiOiBzdHJlZXRzLFxyXG4gICAgLy8nZ3JheXNjYWxlJzogZ3JheXNjYWxlLFxyXG59O1xyXG5MLmNvbnRyb2wubGF5ZXJzKGJhc2VtYXApLmFkZFRvKG1hcCk7XHJcblxyXG5cclxuanF1ZXJ5LmFqYXgoJy8vdHlwaG9vbi56andhdGVyLmdvdi5jbi9BcGkvVHlwaG9vbkluZm8vMjAxOTI2Jywge1xyXG4gICAgdHlwZTogJ0dFVCcsXHJcbiAgICBkYXRhVHlwZTogJ2pzb25wJyxcclxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICh0eXBob29uRGF0YSkge1xyXG4gICAgICAgIC8vIOWKqOaAgeeUu+e6v1xyXG4gICAgICAgIGZ1bmN0aW9uIGFuaW1hdGVEcmF3TGluZShwb2ludHMsIGljb24sIHBvcHVwQ29udGVudCkge1xyXG4gICAgICAgICAgICB2YXIgZHJhd1BvaW50cyA9IFtwb2ludHNbMF1dO1xyXG4gICAgICAgICAgICB2YXIgbWFya2VyID0gTC5tYXJrZXIoZHJhd1BvaW50c1tkcmF3UG9pbnRzLmxlbmd0aCAtIDFdLCB7IGljb246IGljb24gfSkuYWRkVG8obWFwKTtcclxuICAgICAgICAgICAgdmFyIGxpbmVMYXllcnM7XHJcbiAgICAgICAgICAgIHZhciBjb3VudCA9IDA7XHJcbiAgICAgICAgICAgIHZhciB0aW1lID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvdW50IDwgcG9pbnRzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudCArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGRyYXdQb2ludHMucHVzaChwb2ludHNbY291bnRdKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBsaW5lTGFlcnMgJiYgbWFwLnJlbW92ZUxheWVyKGxpbmVMYXllcnMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxpbmVMYXllcnMgJiYgbWFwLnJlbW92ZUxheWVyKGxpbmVMYXllcnMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxpbmVMYXllcnMgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcC5yZW1vdmVMYXllcihtYXJrZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxpbmVMYXllcnMgPSBMLnBvbHlsaW5lKGRyYXdQb2ludHMsIHsgY29sb3I6ICdibHVlJyB9KS5hZGRUbyhtYXApO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcmtlciA9IEwubWFya2VyKGRyYXdQb2ludHNbZHJhd1BvaW50cy5sZW5ndGggLSAxXSwgeyBpY29uOiBpY29uIH0pLmFkZFRvKG1hcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50ID09IHBvaW50cy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlci5iaW5kUG9wdXAocG9wdXBDb250ZW50KS5vcGVuUG9wdXAoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImFkZFwiKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCAyMDApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vdHlwaG9vbkNlbnRlcj1bTnVtYmVyKHR5cGhvb25EYXRhWzBdW1wiY2VudGVybGF0XCJdKSwgTnVtYmVyKHR5cGhvb25EYXRhWzBdW1wiY2VudGVybG5nXCJdKV07XHJcbiAgICAgICAgLy9tYXAucGFuVG8odHlwaG9vbkNlbnRlcik7IFxyXG4gICAgICAgIHZhciBmb3JlY2FzdCA9IHR5cGhvb25EYXRhWzBdW1wicG9pbnRzXCJdO1xyXG4gICAgICAgIHZhciBwb2x5bGluZVBvaW50cyA9IFtdO1xyXG4gICAgICAgIGZvcmVjYXN0LmZvckVhY2gocG9pbnQgPT4ge1xyXG4gICAgICAgICAgICBwb2x5bGluZVBvaW50cy5wdXNoKFtOdW1iZXIocG9pbnRbJ2xhdCddKSwgTnVtYmVyKHBvaW50WydsbmcnXSldKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG1hcC5wYW5Ubyhwb2x5bGluZVBvaW50c1swXSk7XHJcbiAgICAgICAgLy8g5Zu+5qCHXHJcbiAgICAgICAgdmFyIHR5cGhvb25JY29uID0gTC5pY29uKHtcclxuICAgICAgICAgICAgaWNvblVybDogdHlwaG9vbkltZywgLy8nLi90b3JuYWRvLnBuZycsXHJcbiAgICAgICAgICAgIGljb25TaXplOiBbMjgsIDI4XSxcclxuICAgICAgICAgICAgaWNvbkFuY2hvcjogWzE0LCAxNF1cclxuICAgICAgICB9KTtcclxuICAgICAgICBwb3B1cENvbnRlbnQgPSAnPGI+JyArIHR5cGhvb25EYXRhWzBdWyduYW1lJ10gKyAnPC9iPjwvYnI+JyArXHJcbiAgICAgICAgICAgIGZvcmVjYXN0W2ZvcmVjYXN0Lmxlbmd0aCAtIDFdWydqbCddO1xyXG4gICAgICAgIC8vIOWKqOaAgeeUu+e6v1xyXG4gICAgICAgIGFuaW1hdGVEcmF3TGluZShwb2x5bGluZVBvaW50cywgdHlwaG9vbkljb24sIHBvcHVwQ29udGVudCk7XHJcbiAgICB9XHJcbn0pO1xyXG4vKlxyXG52YXIgZG9jdW1lbnRIZWFkID0gJChcImhlYWRcIilbMF07XHJcbnZhciBqcz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuanMuc3JjPVwiaHR0cDovL3R5cGhvb24uemp3YXRlci5nb3YuY24vQXBpL1R5cGhvb25JbmZvLzIwMTkyNj9jYWxsYmFjaz1hZGRQb2x5bGluZUFuZE1hcmtlclwiO1xyXG5kb2N1bWVudEhlYWQuYXBwZW5kKGpzKTtcclxuKi9cclxuXHJcbi8qXHJcbi8v5Zue6LCD5Ye95pWw77yaIOWKqOaAgeeUu+e6v1xyXG5mdW5jdGlvbiBhZGRQb2x5bGluZUFuZE1hcmtlcih0eXBob29uRGF0YSkge1xyXG4gICAgLy8g5Yqo5oCB55S757q/XHJcbiAgICBmdW5jdGlvbiBhbmltYXRlRHJhd0xpbmUocG9pbnRzLCBpY29uLCBwb3B1cENvbnRlbnQpIHtcclxuICAgICAgICB2YXIgZHJhd1BvaW50cyA9IFtwb2ludHNbMF1dO1xyXG4gICAgICAgIHZhciBtYXJrZXIgPSBMLm1hcmtlcihkcmF3UG9pbnRzW2RyYXdQb2ludHMubGVuZ3RoIC0gMV0sIHsgaWNvbjogaWNvbiB9KS5hZGRUbyhtYXApO1xyXG4gICAgICAgIHZhciBsaW5lTGF5ZXJzO1xyXG4gICAgICAgIHZhciBjb3VudCA9IDA7XHJcbiAgICAgICAgdmFyIHRpbWUgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjb3VudCA8IHBvaW50cy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudCArPSAxO1xyXG4gICAgICAgICAgICAgICAgZHJhd1BvaW50cy5wdXNoKHBvaW50c1tjb3VudF0pO1xyXG4gICAgICAgICAgICAgICAgLy8gbGluZUxhZXJzICYmIG1hcC5yZW1vdmVMYXllcihsaW5lTGF5ZXJzKTtcclxuICAgICAgICAgICAgICAgIGxpbmVMYXllcnMgJiYgbWFwLnJlbW92ZUxheWVyKGxpbmVMYXllcnMpO1xyXG4gICAgICAgICAgICAgICAgbGluZUxheWVycyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBtYXAucmVtb3ZlTGF5ZXIobWFya2VyKTtcclxuICAgICAgICAgICAgICAgIGxpbmVMYXllcnMgPSBMLnBvbHlsaW5lKGRyYXdQb2ludHMsIHsgY29sb3I6ICdibHVlJyB9KS5hZGRUbyhtYXApO1xyXG4gICAgICAgICAgICAgICAgbWFya2VyID0gTC5tYXJrZXIoZHJhd1BvaW50c1tkcmF3UG9pbnRzLmxlbmd0aCAtIDFdLCB7IGljb246IGljb24gfSkuYWRkVG8obWFwKTtcclxuICAgICAgICAgICAgICAgIGlmIChjb3VudCA9PSBwb2ludHMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcmtlci5iaW5kUG9wdXAocG9wdXBDb250ZW50KS5vcGVuUG9wdXAoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJhZGRcIilcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAyMDApXHJcbiAgICB9XHJcbiAgICAvL3R5cGhvb25DZW50ZXI9W051bWJlcih0eXBob29uRGF0YVswXVtcImNlbnRlcmxhdFwiXSksIE51bWJlcih0eXBob29uRGF0YVswXVtcImNlbnRlcmxuZ1wiXSldO1xyXG4gICAgLy9tYXAucGFuVG8odHlwaG9vbkNlbnRlcik7XHJcbiAgICB2YXIgZm9yZWNhc3QgPSB0eXBob29uRGF0YVswXVtcInBvaW50c1wiXTtcclxuICAgIHZhciBwb2x5bGluZVBvaW50cyA9IFtdO1xyXG4gICAgZm9yZWNhc3QuZm9yRWFjaChwb2ludCA9PiB7XHJcbiAgICAgICAgcG9seWxpbmVQb2ludHMucHVzaChbTnVtYmVyKHBvaW50WydsYXQnXSksIE51bWJlcihwb2ludFsnbG5nJ10pXSlcclxuICAgIH0pO1xyXG4gICAgbWFwLnBhblRvKHBvbHlsaW5lUG9pbnRzWzBdKTtcclxuICAgIC8vIOWbvuagh1xyXG4gICAgdmFyIHR5cGhvb25JY29uID0gTC5pY29uKHtcclxuICAgICAgICBpY29uVXJsOiB0eXBob29uSW1nICwgLy8nLi90b3JuYWRvLnBuZycsXHJcbiAgICAgICAgaWNvblNpemU6IFsyOCwgMjhdLFxyXG4gICAgICAgIGljb25BbmNob3I6IFsxNCwgMTRdXHJcbiAgICB9KTtcclxuICAgIHBvcHVwQ29udGVudCA9ICc8Yj4nICsgdHlwaG9vbkRhdGFbMF1bJ25hbWUnXSArICc8L2I+PC9icj4nICtcclxuICAgICAgICBmb3JlY2FzdFtmb3JlY2FzdC5sZW5ndGggLSAxXVsnamwnXTtcclxuICAgIC8vIOWKqOaAgeeUu+e6v1xyXG4gICAgYW5pbWF0ZURyYXdMaW5lKHBvbHlsaW5lUG9pbnRzLCB0eXBob29uSWNvbiwgcG9wdXBDb250ZW50KTtcclxufTsqL1xyXG5cclxuXHJcblxyXG4iLCJpbXBvcnQgJy4vYXBwLmpzJzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCIwYjg1ODVkZTY4NDc3ZjE5NmM3ZTc4MmNkMjhmNDA4YS5wbmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IGpRdWVyeTsiXSwic291cmNlUm9vdCI6IiJ9