// ==UserScript==
// @name         WebCleaner Pro - chocoi
// @author       TryNot
// @namespace    https://github.com/AsyncThreadSleep
// @homepage     https://github.com/AsyncThreadSleep/TryNotScript
// @version      251004
// @description  适用于iphone 6s safari浏览器的chocoi.net漫画阅读器脚本
// @run-at       document-idle
// @match        https://chocoi.net/*
// @match        https://boylove.cc/*
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

    const Tool = {
        elementArrayForRemove: function (RemoveArray) {
            if (!Array.isArray(RemoveArray)) throw new Error("RemoveArray参数错误");
            RemoveArray.forEach((element) => {
                if (element && element.nodeType === Node.ELEMENT_NODE) element.remove();
            });
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
        }
    };

    const TryNot = new (class {
        Elements;
        #title = "TryNotScript";
        #page = "page";
        #switch = false;
        #TimeId;
        constructor() {
            const is_CSS = GM_getResourceText("CSS");
            const is_HTML = GM_getResourceText("HTML");

            if (!is_CSS || !is_HTML) throw new Error("资源加载失败");

            const TryNot_CSS = document.createElement("style");
            const TryNot_HTML = document.createElement("div");

            TryNot_CSS.innerHTML = is_CSS;
            TryNot_HTML.innerHTML = is_HTML;

            document.body.appendChild(TryNot_CSS);
            document.body.appendChild(TryNot_HTML);

            const Elements = {
                TryNotScript: TryNot_HTML.querySelector(".TryNotScript"),
                TryNotButton: TryNot_HTML.querySelector(".TopBar_Button"),
                ScriptTitle: TryNot_HTML.querySelector(".TopBar_Title"),
                ScriptBox: TryNot_HTML.querySelector(".MainBox"),
                ScriptFunction: TryNot_HTML.querySelector(".MainBox_Main"),
                previousPage: TryNot_HTML.querySelector(".CutPage_Next"),
                NextPage: TryNot_HTML.querySelector(".CutPage_To"),
                RemoveAD: TryNot_HTML.querySelector(".RemoveAD"),
                ScriptSetting: TryNot_HTML.querySelector(".MainBox_Bottom"),
                Setting: TryNot_HTML.querySelector(".Setting_Button"),
                PageNumber: TryNot_HTML.querySelector(".PageNumber"),
            };

            if (Object.values(Elements).some((v) => v === null)) throw new Error("元素加载失败");

            this.Elements = Elements;
        }
        #switchTitle(cout){
            if (cout) {
                this.Elements.ScriptTitle.style.width = "128px";
                this.Elements.ScriptTitle.style.padding = "0px 8px";
            } else {
                if(this.#switch) return;
                this.Elements.ScriptTitle.style.width = "0px";
                this.Elements.ScriptTitle.style.padding = "0px 0px";
            }
        }
        #switchMain(cout){
            if(cout){
                this.Elements.ScriptBox.style.height = "150px";
                this.Elements.ScriptBox.style.padding = "6px 8px";
                this.#switch = true;
            }else{ 
                this.Elements.ScriptBox.style.height = "0px";
                this.Elements.ScriptBox.style.padding = "0px 8px";
                this.#switch = false;
            }
            this.#switchTitle(cout);
        }
        timedMessage(Message) {
            if (this.#TimeId) clearTimeout(this.#TimeId);

            this.Elements.ScriptTitle.innerHTML = `<p>${Message}</p>`;
            this.#switchTitle(true);

            this.#TimeId = setTimeout(() => {
                if (!this.#switch) this.#switchTitle(false);
                this.Elements.ScriptTitle.innerHTML = `<p>${this.#title}</p>`;
            }, 3000);
        }
        switchTryNot() {
            this.#switchMain(!this.#switch);
        }
        updataTitle(title, page = null) {
            this.#title = title;
            if (page) this.#page = page;
            this.Elements.ScriptTitle.innerHTML = `<p>${this.#title}</p>`;
            TryNot.Elements.PageNumber.innerHTML = `<p>${this.#page}</p>`;
        }
    })();

    TryNot.Elements.TryNotButton.addEventListener("click", () => {
        TryNot.switchTryNot();
    });

    TryNot.Elements.previousPage.addEventListener("click", () => {
        TryNot.timedMessage("即将跳转");
        Tool.safeCallPageFunction("getNearByChapter", 0);
    });

    TryNot.Elements.NextPage.addEventListener("click", () => {
        TryNot.timedMessage("即将跳转");
        Tool.safeCallPageFunction("getNearByChapter", 1);
    });

    TryNot.Elements.RemoveAD.addEventListener("click", () => {
        Tool.elementArrayForRemove([
            document.querySelector(".loginbackwrap"),
            document.querySelector(".div_sticky2"),
            document.querySelector(".reader-cartoon-image>a"),
            document.querySelector(".reader-book-read-navbar"),
            ...document.querySelectorAll(".mhFootHint"),
            ...document.querySelectorAll(".actions-group"),
            ...document.querySelectorAll(".qt_lkphn"),
            ...document.querySelectorAll(".wpvwcwve"),
        ]);

        TryNot.timedMessage("已清除广告");
    });

    const title = document.querySelector(".title");
    if (title) {
        const titleArray = title.innerText.split("\n");
        titleArray.forEach((v, i) => {
            /^\s*$/.test(v) ? titleArray.splice(i, 1) : null;
        });
        TryNot.updataTitle(titleArray[0] || "TryNotScript", titleArray[1]);
    }

    TryNot.Elements.TryNotScript.style.display = "block";
    TryNot.Elements.RemoveAD.click();
})();
