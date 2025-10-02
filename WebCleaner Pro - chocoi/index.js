// ==UserScript==
// @name         WebCleaner Pro - chocoi
// @author       TryNot
// @namespace    https://github.com/AsyncThreadSleep
// @homepage     https://github.com/AsyncThreadSleep/TryNotScript
// @version      251001
// @description  适用于iphone 6s safari浏览器的chocoi.net漫画阅读器脚本
// @run-at       document-idle
// @match        https://chocoi.net/*
// @exclude      tsyndicate.com
// @exclude      ib.eu.ggmnd.com
// @exclude      techyra.com
// @icon         data:image/svg+xml;utf8,%3Csvg%20viewBox%3D%220%200%201024%201024%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M512%20896c212.8%200%20384-171.2%20384-384S724.8%20128%20512%20128%20128%20299.2%20128%20512s171.2%20384%20384%20384z%20m0-64c-176%200-320-144-320-320s144-320%20320-320%20320%20144%20320%20320-144%20320-320%20320z%20M640%20368c17.6%200%2032%2014.4%2032%2032s-14.4%2032-32%2032h-96v240c0%2017.6-14.4%2032-32%2032s-32-14.4-32-32V432h-96c-17.6%200-32-14.4-32-32s14.4-32%2032-32h256z%22%20fill%3D%22%23000%22%2F%3E%3C%2Fsvg%3E
// @updateURL    https://raw.githubusercontent.com/AsyncThreadSleep/TryNotScript/main/WebCleaner Pro - chocoi/index.js
// @downloadURL  https://raw.githubusercontent.com/AsyncThreadSleep/TryNotScript/main/WebCleaner Pro - chocoi/index.js
// @resource     CSS https://raw.githubusercontent.com/AsyncThreadSleep/TryNotScript/main/WebCleaner Pro - chocoi/index.css
// @resource     HTML https://raw.githubusercontent.com/AsyncThreadSleep/TryNotScript/main/WebCleaner Pro - chocoi/index.html
// @grant        unsafeWindow
// @grant        GM_getResourceText
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_listValues
// @grant        GM_addValueChangeListener
// ==/UserScript==

(function () {
    "use strict";

    function init() {
        const is_CSS = GM_getResourceText("CSS");
        const is_HTML = GM_getResourceText("HTML");

        if (!is_CSS || !is_HTML) throw new Error("资源加载失败");

        const TryNot_CSS = document.createElement("style");
        const TryNot_HTML = document.createElement("div");

        TryNot_CSS.innerHTML = is_CSS;
        TryNot_HTML.innerHTML = is_HTML;

        document.body.appendChild(TryNot_CSS);
        document.body.appendChild(TryNot_HTML);

        const doms = {
            TryNotScript: document.querySelector(".TryNotScript"),
            ScriptTitle: document.querySelector(".ScriptTitle"),
            ScriptBox: document.querySelector(".ScriptBox"),
            ScriptFunction: document.querySelector(".ScriptFunction"),
            ScriptSetting: document.querySelector(".ScriptSetting"),
            TryNotButton: document.querySelector(".TryNotButton"),
            RemoveAD: document.querySelector(".RemoveAD"),
            NextPage: document.querySelector(".NextPage"),
            Setting: document.querySelector(".Setting"),
            PageNumber: document.querySelector(".PageNumber"),
        };

        if (Object.values(doms).some((v) => v === null)) throw new Error("元素加载失败");

        return {
            doms: doms,
            data: {
                TimeId: null,
                ScriptTitle: "<p>TryNotScript</p>",
            },
            state: {
                is_TryNotButton: false,
                is_ScriptTitle: false,
            },
            functions: {
                removeDoms: function (RemoveArray) {
                    if (!Array.isArray(RemoveArray)) return false;
                    RemoveArray.forEach((element) => {
                        if (element) element.remove();
                    });
                    return true;
                },
                safeCallPageFunction: function (functionName, ...args) {
                    try {
                        if (unsafeWindow[functionName] && typeof unsafeWindow[functionName] === "function") {
                            return unsafeWindow[functionName](...args);
                        }
                        return null;
                    } catch (error) {
                        return null;
                    }
                },
                timedMessage: function ({ MessageElement, DefaultMessage, is_TryNotButton, TimeId, title = "", style = "" }) {
                    if (TimeId) clearTimeout(TimeId);

                    MessageElement.innerHTML = `<p style="${style}">${title}</p>`;
                    MessageElement.style.width = "128px";

                    TimeId = setTimeout(() => {
                        if (!is_TryNotButton) MessageElement.style.width = "0px";
                        MessageElement.innerHTML = DefaultMessage;
                    }, 3000);
                },
            },
        };
    }

    try {
        const TryNot = init();

        TryNot.doms.TryNotButton.addEventListener("click", () => {
            const { is_TryNotButton } = TryNot.state;

            TryNot.doms.ScriptBox.style.height = is_TryNotButton ? "0px" : "150px";
            TryNot.doms.ScriptTitle.style.width = is_TryNotButton ? "0px" : "128px";

            TryNot.state.is_TryNotButton = !is_TryNotButton;
            TryNot.state.is_ScriptTitle = !is_TryNotButton;
        });

        TryNot.doms.RemoveAD.addEventListener("click", () => {
            const mhFootHint = document.querySelectorAll(".mhFootHint");
            const reader_cartoon_image = document.querySelectorAll(".reader-cartoon-image");

            TryNot.functions.removeDoms([
                document.querySelector(".loginbackwrap"),
                document.querySelector("div[data-type='1']"),
                document.querySelector(".div_sticky2"),
                mhFootHint[0],
                mhFootHint[1],
                reader_cartoon_image[reader_cartoon_image.length - 1],
                document.querySelector(".reader-book-read-navbar"),
                ...document.querySelectorAll(".actions-group"),
                ...document.querySelectorAll(".qt_lkphn"),
            ]);

            TryNot.functions.timedMessage({
                MessageElement: TryNot.doms.ScriptTitle,
                DefaultMessage: TryNot.data.ScriptTitle,
                is_TryNotButton: TryNot.state.is_TryNotButton,
                TimeId: TryNot.data.TimeId,
                title: "已清除广告",
            });
        });

        TryNot.doms.NextPage.addEventListener("click", () => {
            TryNot.functions.timedMessage({
                MessageElement: TryNot.doms.ScriptTitle,
                DefaultMessage: TryNot.data.ScriptTitle,
                is_TryNotButton: TryNot.state.is_TryNotButton,
                TimeId: TryNot.data.TimeId,
                title: "即将跳转",
            });
            TryNot.functions.safeCallPageFunction("getNearByChapter", 1);
        });

        const title = document.querySelector(".title");
        if (title) {
            const titleArray = title.innerText.split("\n");
            titleArray.forEach((v, i) => {
                /^\s*$/.test(v) ? titleArray.splice(i, 1) : null;
            });
            TryNot.doms.PageNumber.innerHTML = `<p>${titleArray[1]}</p>` || "当前话数";
            TryNot.doms.ScriptTitle.innerHTML = `<p>${titleArray[0]}</p>` || "TryNotScript";
        }

        TryNot.doms.TryNotScript.style.display = "block";
        TryNot.doms.RemoveAD.click();
    } catch (error) {
        console.log("TryNotScript: WebCleaner Pro - chocoi ErrorMessage : ", error.message);
    } finally {
        console.log("TryNotScript: WebCleaner Pro - chocoi End");
    }
})();
