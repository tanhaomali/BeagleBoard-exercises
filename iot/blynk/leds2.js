#!/usr/bin/env node
// From Blinks various LEDs
const Blynk = require('blynk-library');
const b = require('bonescript');
const util = require('util');

const LEDs = ['GP1_4', 'GREEN', 'RED'];
const button = 'GP1_3';

var i;
for(i=0; i<LEDs.length; i++) {
    // console.log("pinMode: " + i);
    b.pinMode(LEDs[i], b.OUTPUT);
}
b.pinMode(button, b.INPUT);

const AUTH = 'dc1c083949324ca28fbf393231f8cf09';

var blynk = new Blynk.Blynk(AUTH);

var v;
for(i=0; i<LEDs.length; i++) {
    // console.log("VirtualPin: " + i);
    v = new blynk.VirtualPin(i);
    // console.log(util.inspect(v));
    v.on('write', function(param) {
        // console.log("this: " + util.inspect(this));
        // console.log("param: " + util.inspect(param));
        // console.log("pin: " + this.pin);
        console.log('V' + this.pin + ':', param[0]);
        b.digitalWrite(LEDs[this.pin], param[0]);
    });
}


var v10 = new blynk.WidgetLED(10);

v10.setValue(0);    // Initiallly off
b.attachInterrupt(button, toggle, b.CHANGE);

function toggle(x) {
    console.log("V10: ", x.value);
    x.value ? v10.turnOff() : v10.turnOn();
}
