// ==UserScript==
// @name         chocoi_Script
// @namespace    http://tampermonkey.net/
// @version      250925
// @description  适用于iphone 6s safari浏览器的chocoi.net漫画阅读器脚本
// @author       TryNot
// @match        https://chocoi.net/*
// @icon         data:image/svg+xml;utf8,%3Csvg%20viewBox%3D%220%200%201024%201024%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M512%20896c212.8%200%20384-171.2%20384-384S724.8%20128%20512%20128%20128%20299.2%20128%20512s171.2%20384%20384%20384z%20m0-64c-176%200-320-144-320-320s144-320%20320-320%20320%20144%20320%20320-144%20320-320%20320z%20M640%20368c17.6%200%2032%2014.4%2032%2032s-14.4%2032-32%2032h-96v240c0%2017.6-14.4%2032-32%2032s-32-14.4-32-32V432h-96c-17.6%200-32-14.4-32-32s14.4-32%2032-32h256z%22%20fill%3D%22%23000%22%2F%3E%3C%2Fsvg%3E
// @updateURL    https://raw.githubusercontent.com/AsyncThreadSleep/TryNotScript/main/chocoi_Script.js
// @downloadURL  https://raw.githubusercontent.com/AsyncThreadSleep/TryNotScript/main/chocoi_Script.js
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  // 脚本容器
  function ScriptStart() {
    class CreateElement {
      Element = null;
      constructor(options = {}) {
        const {
          element = "div",
          appendElement = document.body,
          style = "",
          innerHTML = "",
          event = {
            str: '',
            call: null
          }
        } = options;
        this.Element = document.createElement(element);
        this.Element.style = style;
        this.Element.innerHTML = innerHTML;
        if(typeof event.call === 'function'){
          this.Element.addEventListener(event.str,event.call);
        }
        appendElement.appendChild(this.Element);
      }
    }
    // 创建TryNot按钮
    const ScriptButton = new CreateElement({
      innerHTML: "TryNot",
      style: `
            width: 64px;
            height: 32px;
            border-radius: 8px;
            background-color: cadetblue;
            text-align: center;
            font-size: 16px;
            line-height: 32px;
            z-index: 9999993;
            display: block;
            position: absolute;
            top: 6px;
            left: 6px;
            cursor: pointer;
            user-select: none;
        `,
      event: {
        str: "click",
        call: () => {
          ScriptBox.Element.style.height = ScriptBox.Element.style.height === "150px" ? "0px" : "150px";
        },
      },
    });
    // 创建脚本框
    const ScriptBox = new CreateElement({
      style: `
            width: 100px;
            height: 0px;
            border-radius: 8px;
            background-color: cadetblue;
            z-index: 9999993;
            display: flex;
            position: absolute;
            top: 44px;
            left: 6px;
            flex-direction: column;
            align-items: center;
            overflow: hidden;
            transition: height 0.5s;
        `
    });
    // 创建脚本消息框
    const ScriptMessage = new CreateElement({
      style: `
            width: 128px;
            height: 32px;
            border-radius: 8px;
            background-color: rgba(255, 255, 255, 0.75);
            font-size: 12px;
            line-height: 32px;
            z-index: 9999993;
            display: none;
            position: absolute;
            text-align: center;
            top: 6px;
            left: calc(50% - 64px);
        `
    });
    function Message(msg) {
      ScriptMessage.Element.innerHTML = msg;
      ScriptMessage.Element.style.display = "block";
      setTimeout(() => {
        ScriptMessage.Element.style.display = "none";
      }, 1500);
    }
    // 创建脚本框内容 - 清除广告
    const Script_01 = new CreateElement({
      appendElement: ScriptBox.Element,
      innerHTML: "清除广告",
      style: `
            width: 80%;
            height: 24px;
            border: 1px solid black;
            border-radius: 8px;
            background-color: white;
            margin: 8px 0px 0px 0px;
            font-size: 12px;
            line-height: 24px;
            text-align: center;
        `,
      event: {
        str: "click",
        call: () => {
          const RemoveArray = new Array();

          const mhFootHint = document.querySelectorAll(".mhFootHint");
          const reader_cartoon_image = document.querySelectorAll(
            ".reader-cartoon-image"
          );

          RemoveArray.push(document.querySelector(".loginbackwrap"));
          RemoveArray.push(document.querySelector("div[data-type='1']"));
          RemoveArray.push(document.querySelector(".div_sticky2"));
          RemoveArray.push(mhFootHint[0]);
          RemoveArray.push(mhFootHint[1]);
          RemoveArray.push(
            reader_cartoon_image[reader_cartoon_image.length - 1]
          );

          RemoveArray.forEach((element) => {
            if (element) element.remove();
          });

          Message("已清除");
        },
      },
    });
    // 创建脚本框内容 - 下一页
    const Script_02 = new CreateElement({
      appendElement: ScriptBox.Element,
      innerHTML: "下一页",
      style: `
            width: 80%;
            height: 24px;
            border: 1px solid black;
            border-radius: 8px;
            background-color: white;
            margin: 8px 0px 0px 0px;
            font-size: 12px;
            line-height: 24px;
            text-align: center;
        `,
      event: {
        str: "click",
        call: () => {
          const NextPage = document.querySelector(".faarrowright");
          if(NextPage) NextPage.click();
        },
      },
    });
  }

  // 脚本运行
  try {
    console.log("TryNotScript: chocoi_Script Start");

    window.onload = function () {
      ScriptStart();
    };
  } catch (error) {
    console.log("TryNotScript: chocoi_Script", error);
  } finally {
    console.log("TryNotScript: chocoi_Script End");
  }
})();
