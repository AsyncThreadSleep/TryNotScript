// ==UserScript==
// @name         chocoi_Script
// @namespace    http://tampermonkey.net/
// @version      250915
// @description  适用于iphone 6s safari浏览器的chocoi.net漫画阅读器脚本
// @author       TryNot
// @match        https://chocoi.net/*
// @icon         data:image/svg+xml;utf8,%3Csvg%20viewBox%3D%220%200%201024%201024%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M512%20896c212.8%200%20384-171.2%20384-384S724.8%20128%20512%20128%20128%20299.2%20128%20512s171.2%20384%20384%20384z%20m0-64c-176%200-320-144-320-320s144-320%20320-320%20320%20144%20320%20320-144%20320-320%20320z%20M640%20368c17.6%200%2032%2014.4%2032%2032s-14.4%2032-32%2032h-96v240c0%2017.6-14.4%2032-32%2032s-32-14.4-32-32V432h-96c-17.6%200-32-14.4-32-32s14.4-32%2032-32h256z%22%20fill%3D%22%23000%22%2F%3E%3C%2Fsvg%3E
// @updateURL    https://raw.githubusercontent.com/AsyncThreadSleep/TryNotScript/main/chocoi_Script.js
// @downloadURL  https://raw.githubusercontent.com/AsyncThreadSleep/TryNotScript/main/chocoi_Script.js
// @grant        none
// ==/UserScript==

const CSS_ClassStyle = {
    ScriptButton: `
        width: 100px;
        height: 32px;
        border-radius: 8px;
        background-color: cadetblue;
        text-align: center;
        font-size: 16px;
        line-height: 32px;
        z-index: 9999993;
        display: block;
        position: absolute;
        top: 8px;
        right: 8px;
        cursor: pointer;
        user-select: none;
    `,
    ScriptBox: `
        width: 200px;
        height: 0px;
        border-radius: 8px;
        background-color: cadetblue;
        z-index: 9999993;
        display: flex;
        position: absolute;
        top: 48px;
        right: 8px;
        flex-direction: column;
        align-items: center;
        overflow: hidden;
        transition: height 0.5s;
    `,
    Script_01: `
        width: 80%;
        height: 32px;
        border: 1px solid black;
        border-radius: 8px;
        background-color: white;
        margin: 8px 0px 8px 0px;
        font-size: 16px;
        line-height: 32px;
        text-align: center;
    `,
};

function CreateButton() {
    const ScriptButton = document.createElement("div");
    ScriptButton.innerHTML = "ScriptButton";
    ScriptButton.style = CSS_ClassStyle.ScriptButton;
    ScriptButton.addEventListener("click", () => {
        ScriptBox.style.height = ScriptBox.style.height === "150px" ? "0px" : "150px";
    });

    const ScriptBox = document.createElement("div");
    ScriptBox.style = CSS_ClassStyle.ScriptBox;

    const Script_01 = document.createElement("div");
    Script_01.innerHTML = "点击关闭广告";
    Script_01.style = CSS_ClassStyle.Script_01;
    Script_01.addEventListener("click", () => {
        RemoveElement();
    });

    const Script_02 = document.createElement("div");
    Script_02.innerHTML = "下一页";
    Script_02.style = CSS_ClassStyle.Script_01;
    Script_02.addEventListener("click", () => {
        NextPage();
    });

    document.body.appendChild(ScriptButton);
    document.body.appendChild(ScriptBox);
    ScriptBox.appendChild(Script_01);
    ScriptBox.appendChild(Script_02);
}

function RemoveElement() {
    const RemoveArray = new Array();

    const mhFootHint = document.querySelectorAll(".mhFootHint");
    const reader_cartoon_image = document.querySelectorAll(".reader-cartoon-image");

    RemoveArray.push(document.querySelector(".loginbackwrap"));
    RemoveArray.push(document.querySelector("div[data-type='1']"));
    RemoveArray.push(document.querySelector(".div_sticky2"));
    RemoveArray.push(mhFootHint[0]);
    RemoveArray.push(mhFootHint[1]);
    RemoveArray.push(reader_cartoon_image[reader_cartoon_image.length - 1]);

    RemoveArray.forEach((element) => {
        element.remove();
    });
}

function NextPage() {
    const NextPage = document.querySelector(".faarrowright");
    NextPage.click();
}

function ScriptStart() {
    CreateButton();
}

try {
    console.log("TryNotScript Start");

    window.onload = function () {
        ScriptStart();
    };
} catch (error) {
    console.log("TryNotScript", error);
} finally {
    console.log("TryNotScript End");
}
