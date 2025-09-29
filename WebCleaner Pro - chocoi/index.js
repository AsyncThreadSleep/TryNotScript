// ==UserScript==
// @name         WebCleaner Pro - chocoi
// @namespace    http://tampermonkey.net/
// @version      250929
// @description  适用于iphone 6s safari浏览器的chocoi.net漫画阅读器脚本
// @author       TryNot
// @match        https://chocoi.net/*
// @icon         data:image/svg+xml;utf8,%3Csvg%20viewBox%3D%220%200%201024%201024%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M512%20896c212.8%200%20384-171.2%20384-384S724.8%20128%20512%20128%20128%20299.2%20128%20512s171.2%20384%20384%20384z%20m0-64c-176%200-320-144-320-320s144-320%20320-320%20320%20144%20320%20320-144%20320-320%20320z%20M640%20368c17.6%200%2032%2014.4%2032%2032s-14.4%2032-32%2032h-96v240c0%2017.6-14.4%2032-32%2032s-32-14.4-32-32V432h-96c-17.6%200-32-14.4-32-32s14.4-32%2032-32h256z%22%20fill%3D%22%23000%22%2F%3E%3C%2Fsvg%3E
// @updateURL    https://raw.githubusercontent.com/AsyncThreadSleep/TryNotScript/main/WebCleaner Pro - chocoi/index.js
// @downloadURL  https://raw.githubusercontent.com/AsyncThreadSleep/TryNotScript/main/WebCleaner Pro - chocoi/index.js
// @resource     CSS https://raw.githubusercontent.com/AsyncThreadSleep/TryNotScript/main/WebCleaner Pro - chocoi/index.css
// @resource     HTML https://raw.githubusercontent.com/AsyncThreadSleep/TryNotScript/main/WebCleaner Pro - chocoi/index.html
// @grant        GM_getResourceText
// ==/UserScript==

(function () {
    "use strict";

    try {
        console.clear();
        console.log("TryNotScript: chocoi_Script Start");

        const CSS_Style = GM_getResourceText("CSS");
        const HTML_Code = GM_getResourceText("HTML");

        const TryNot_CSS = document.createElement("style");
        const TryNot_HTML = document.createElement("div");

        TryNot_CSS.innerHTML = CSS_Style;
        TryNot_HTML.innerHTML = HTML_Code;

        document.body.appendChild(TryNot_CSS);
        document.body.appendChild(TryNot_HTML);

        // const urlObj = new URL(window.location.href);
        // console.log("TryNotScript: chocoi_Script URL:", url.pathname.split('/').filter(Boolean));

        // 获取 Element
        const TryNotScript = document.querySelector(".TryNotScript");
        const ScriptTitle = document.querySelector(".ScriptTitle");
        const ScriptBox = document.querySelector(".ScriptBox");
        const ScriptFunction = document.querySelector(".ScriptFunction");
        const ScriptSetting = document.querySelector(".ScriptSetting");
        // 获取 按钮
        const TryNotButton = document.querySelector(".TryNotButton");
        const RemoveAD = document.querySelector(".RemoveAD");
        const NextPage = document.querySelector(".NextPage");
        const Setting = document.querySelector(".Setting");

        // 创建 状态管理
        const state = {
            TryNotButton: false,
            ScriptTitle: false,
        };

        const Message = new class TimedMessage {
            static #defaultMessage = "<p>TryNotScript</p>";
			#ScriptTitle;
			#timerId = null;
            constructor(ScriptTitle) {
				this.#ScriptTitle = ScriptTitle;
            }
            #resetToDefault() {
                this.#ScriptTitle.innerHTML = TimedMessage.#defaultMessage;
            }
            startResetTimer(delay = 3000) {
                if (this.#timerId) clearTimeout(this.#timerId);
                this.#timerId = setTimeout(() => {
					if(!state.TryNotButton) this.#ScriptTitle.style.width = "0px";
                    this.#resetToDefault();
                }, delay);
            }
            updateMessage(newMessage) {
                this.#ScriptTitle.innerHTML = `<p>${newMessage}</p>`;
                this.startResetTimer();
				this.#ScriptTitle.style.width = "128px";
            }
        }(ScriptTitle);

        // 函数 - 获取用户配置
        function GetUserConfig() {
            const Config = localStorage.getItem("TryNotScript chocoi_Script");
            if (Config) {
                return JSON.parse(Config);
            } else {
                localStorage.setItem(
                    "TryNotScript chocoi_Script",
                    JSON.stringify({
                        ScriptButton: "",
                    })
                );
                return GetUserConfig();
            }
        }

        // 函数 - 清除广告
        function ClearAD() {
            const RemoveArray = new Array();

            const mhFootHint = document.querySelectorAll(".mhFootHint");
            const reader_cartoon_image = document.querySelectorAll(".reader-cartoon-image");

            RemoveArray.push(document.querySelector(".loginbackwrap"));
            RemoveArray.push(document.querySelector("div[data-type='1']"));
            RemoveArray.push(document.querySelector(".div_sticky2"));
            RemoveArray.push(mhFootHint[0]);
            RemoveArray.push(mhFootHint[1]);
            RemoveArray.push(reader_cartoon_image[reader_cartoon_image.length - 1]);
            RemoveArray.push(document.querySelector(".reader-book-read-navbar"));

            RemoveArray.push(...document.querySelectorAll(".actions-group"));
            RemoveArray.push(...document.querySelectorAll(".qt_lkphn"));

            RemoveArray.forEach((element) => {
                if (element) element.remove();
            });

            Message.updateMessage("已清除广告");
        }

        // 函数 - 下一页
        function ToNextPage() {
            const NextPage = document.querySelector(".faarrowright");
            Message.updateMessage("即将跳转");
            NextPage ? NextPage.click() : Message.updateMessage("未找到下一页");
        }

        // 添加 事件监听 - 打开控制面板
        TryNotButton.addEventListener("click", () => {
            ScriptBox.style.height = state.TryNotButton ? "0px" : "150px";
            ScriptTitle.style.width = state.TryNotButton ? "0px" : "128px";
            state.TryNotButton = !state.TryNotButton;
            state.ScriptTitle = state.TryNotButton ? true : false;
        });
        // 添加 事件监听 - 清除广告
        RemoveAD.addEventListener("click", ClearAD);
        // 添加 事件监听 - 下一页
        NextPage.addEventListener("click", ToNextPage);

        console.log("TryNotScript: chocoi_Script Run");

        const title = document.querySelector(".title") ? document.querySelector(".title").innerText : "未找到标题";
        ScriptTitle.innerHTML = `<p style="font-size: 12px;line-height: 16px;">${title.replace(/\n/, "<br>")}</p>`;
        ClearAD();
        Setting.addEventListener("click", () => {
            Message.updateMessage("已打开设置");
        });
    } catch (error) {
        console.log("TryNotScript: chocoi_Script", error);
    } finally {
        console.log("TryNotScript: chocoi_Script End");
    }
})();
