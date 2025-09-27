// ==UserScript==
// @name         chocoi_Script
// @namespace    http://tampermonkey.net/
// @version      250927
// @description  适用于iphone 6s safari浏览器的chocoi.net漫画阅读器脚本
// @author       TryNot
// @match        https://*/*
// @icon         data:image/svg+xml;utf8,%3Csvg%20viewBox%3D%220%200%201024%201024%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M512%20896c212.8%200%20384-171.2%20384-384S724.8%20128%20512%20128%20128%20299.2%20128%20512s171.2%20384%20384%20384z%20m0-64c-176%200-320-144-320-320s144-320%20320-320%20320%20144%20320%20320-144%20320-320%20320z%20M640%20368c17.6%200%2032%2014.4%2032%2032s-14.4%2032-32%2032h-96v240c0%2017.6-14.4%2032-32%2032s-32-14.4-32-32V432h-96c-17.6%200-32-14.4-32-32s14.4-32%2032-32h256z%22%20fill%3D%22%23000%22%2F%3E%3C%2Fsvg%3E
// @updateURL    https://raw.githubusercontent.com/AsyncThreadSleep/TryNotScript/main/chocoi_Script.js
// @downloadURL  https://raw.githubusercontent.com/AsyncThreadSleep/TryNotScript/main/chocoi_Script.js
// @grant        none
// ==/UserScript==

(function () {
    "use strict";

    // 获取用户配置
    function GetUserConfig() {
        const Config = localStorage.getItem("TryNotScript chocoi_Script");
        if (Config) {
            return JSON.parse(Config);
        } else {
            localStorage.setItem("TryNotScript chocoi_Script",JSON.stringify({
                ScriptButton: "",
            }));
            return GetUserConfig();
        }
    }

    // 脚本运行
    window.onload = function () {
        try {
            console.clear();
            console.log("TryNotScript: chocoi_Script Start");

            // const config = GetUserConfig();
            // console.log("TryNotScript: chocoi_Script GetUserConfig :", config);
            
            ScriptStart(CSS_Style,title);
        } catch (error) {
            console.log("TryNotScript: chocoi_Script", error);
        } finally {
            console.log("TryNotScript: chocoi_Script End");
        }
    };
})();
