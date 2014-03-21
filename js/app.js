/* -*- Mode: js; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- /
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */

'use strict';

var initialized = false;
var light = null;
var mask = null;
var battery = null;
window.onload = function() {
  if (initialized) {
    return;
  }

  initialized = true;

  // Cache DOM Elements
  light = document.getElementById('light');
  mask = document.getElementById('mask');
  battery = document.getElementById('battery');

  // Battery
  var batteryAPI = navigator.battery || navigator.mozBattery;

  function setBattery() {
    if (!batteryAPI) {
      return;
    }
    // Clean styles
    battery.className = '';

    // Add style taking into account battery level
    if (batteryAPI.charging) {
      battery.classList.add('charging');
      return;
    }

    if (batteryAPI.value < 0.2) {
      battery.classList.add('charging');
    } else if (batteryAPI.value  < 0.4) {
      battery.classList.add('first');
    } else if (batteryAPI.value  < 0.6) {
      battery.classList.add('second');
    } else if (batteryAPI.value  < 0.8) {
      battery.classList.add('third');
    } else {
      battery.classList.add('complete');
    }
  }

  // Add battery listeners
  batteryAPI.addEventListener("levelchange", function () {
    setBattery();
  });

  batteryAPI.addEventListener("chargingchange", function () {
    setBattery();
  });

  // Init the battery icon
  setBattery();

  // Add listener for tracking change in ambient light
  window.addEventListener("devicelight", function(event) {
    var lux = event.value;  
    var value = lux * 100 / 100000;
    // Update light of the candle
    light.style.opacity = value;
    // Update the style!
    if (value > 0.9) {
      mask.classList.add('noFlame');
    } else {
      mask.classList.remove('noFlame');
    }
  });
};
