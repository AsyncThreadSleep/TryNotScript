// ==UserScript==
// @name         LiveStreaming - Stripchat
// @author       TryNot
// @namespace    https://github.com/AsyncThreadSleep
// @homepage     https://github.com/AsyncThreadSleep/TryNotScript
// @version      251112
// @description  
// @run-at       document-end
// @match        https://*.stripchat.global/*
// @icon         data:image/svg+xml;utf8,%3Csvg%20viewBox%3D%220%200%201024%201024%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M512%20896c212.8%200%20384-171.2%20384-384S724.8%20128%20512%20128%20128%20299.2%20128%20512s171.2%20384%20384%20384z%20m0-64c-176%200-320-144-320-320s144-320%20320-320%20320%20144%20320%20320-144%20320-320%20320z%20M640%20368c17.6%200%2032%2014.4%2032%2032s-14.4%2032-32%2032h-96v240c0%2017.6-14.4%2032-32%2032s-32-14.4-32-32V432h-96c-17.6%200-32-14.4-32-32s14.4-32%2032-32h256z%22%20fill%3D%22%23000%22%2F%3E%3C%2Fsvg%3E
// @updateURL    https://raw.githubusercontent.com/AsyncThreadSleep/TryNotScript/main/LiveStreaming - Stripchat/index.js
// @downloadURL  https://raw.githubusercontent.com/AsyncThreadSleep/TryNotScript/main/LiveStreaming - Stripchat/index.js
// @resource     
// @resource     
// @grant        unsafeWindow
// @grant        GM_getResourceText
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_listValues
// @grant        GM_addValueChangeListener
// ==/UserScript==

(function() {
    'use strict';

    const stripchat = document.querySelectorAll('.stripchat-dark-theme');

    stripchat.remove();

})