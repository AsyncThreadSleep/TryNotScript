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

  try {
    console.clear();
    console.log("TryNotScript: chocoi_Script Start");

    // 创建 CSS HTML
    const TryNotScriptCSS = document.createElement("style");
    TryNotScriptCSS.innerHTML = `
        .TryNotScript *{
            margin: 0;
            padding: 0;
            user-select: none;
            font-family: initial;
        }
        .TryNotScript{
            --border-radius: 8px;
            --background-color: rgba(95, 158, 160, 1);
            position: absolute;
            top: 6px;
            left: 6px;
            z-index: 9999993;
        }
        .TryNotButton,
        .ScriptTitle,
        .ScriptBox,
        .ScriptButton,
        .Setting{
            border-radius: var(--border-radius);
        }
        .TryNotButton,
        .ScriptTitle,
        .ScriptBox{
            background-color: var(--background-color);
        }
        .TryNotButton{
            width: 64px;
            height: 32px;
            font-size: 16px;
            text-align: center;
            line-height: 28px;
        }
        .ScriptTitle{
            width: 0px;
            height: 32px;
            position: absolute;
            top: 0;
            left: 64px;
            margin-left: 6px;
            box-sizing: border-box;
            padding: 0px;
            font-size: 16px;
            line-height: 18px;
            transition: width 0.5s;
            overflow: hidden;
        }
        .ScriptBox{
            width: 150px;
            height: 0px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            transition: height 0.5s;
            margin-top: 6px;
        }
        .ScriptFunction{
            width: 100%;
            height: 105px;
            display: flex;
            flex-direction: column;
            align-items: center;
            overflow: auto;
            scrollbar-width: none;
        }
        .ScriptButton{
            width: 118px;
            height: 30px;
            background-color: rgba(255, 255, 255, 1);
            border: 1px solid rgba(0, 0, 0, 1);
            margin-top: 15px;
            flex-shrink: 0;
            font-size: 16px;
            text-align: center;
            line-height: 28px;
        }
        .ScriptSetting{
            width: 100%;
            height: 45px;
            padding: 0px 15px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
        }
        .Setting{
            width: 23px;
            height: 23px;
            border: 1px solid rgba(0, 0, 0, 1);
            background-color: rgba(255, 255, 255, 1);
            display: flex;
            align-items: center;
            justify-content: center;
        }
    `;
    const TryNotScriptHTML = document.createElement("div");
    TryNotScriptHTML.className = "TryNotScript";
    TryNotScriptHTML.innerHTML = `
        <div class="TryNotButton">
            <p>TryNot</p>
        </div>
        <div class="ScriptTitle">
            <p>Hello!!!</p>
        </div>
        <div class="ScriptBox">
            <div class="ScriptFunction">
                <div class="ScriptButton RemoveAD">清除广告</div>
                <div class="ScriptButton">下一页</div>
                <div class="ScriptButton">预留</div>
                <div class="ScriptButton">预留</div>
            </div>
            <div class="ScriptSetting">
                <div class="Setting">
                    <svg viewBox="0 0 1092 1024" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1072.15 406.226c-6.33-33.457-26.762-55.073-52.047-55.073-.323 0-.651.003-.83.009l-4.656 0c-73.125 0-132.618-59.492-132.618-132.618 0-23.731 
                                11.447-50.336 11.546-50.566 13.105-29.499 3.023-65.672-23.428-84.127l-1.602-1.127-134.4-74.662-1.7-.745c-8.754-3.806-18.335-5.736-28.48-5.736-20.79 
                                0-41.236 8.344-54.684 22.307-14.742 15.216-65.623 58.649-104.72 58.649-39.451 0-90.634-44.287-105.44-59.785-13.518-14.247-34.128-22.753-55.127-22.753-9.946 
                                0-19.354 1.862-27.959 5.532l-1.746.74-139.142 76.431-1.643 1.14c-26.537 18.438-36.676 54.579-23.585 84.062.116.265 11.58 26.725 11.58 50.635 0 73.126-59.492 
                                132.618-132.618 132.618l-4.582 0c-.319-.006-.636-.011-.952-.011-25.26 0-45.673 21.618-52.002 55.081-.462 2.453-11.314 60.622-11.314 106.118 0 45.494 10.851 
                                103.66 11.315 106.119 6.334 33.458 26.759 55.077 52.036 55.077.32 0 .652-.006.842-.012l4.656 0c73.126 0 132.618 59.492 132.618 132.617 0 23.76-11.444 
                                50.333-11.546 50.566-13.094 29.474-3.042 65.646 23.395 84.152l1.57 1.093 131.838 73.727 1.676.738c8.751 3.842 18.305 5.79 28.398 5.79 21.082 0 41.676-8.706 
                                55.089-23.291 18.724-20.348 69.527-62.363 107.048-62.363 40.626 0 92.725 47.1 107.76 63.584 13.442 14.831 34.176 23.69 55.471 23.696l.006 0c9.895 0 
                                19.279-1.884 27.894-5.598l1.711-.74 136.659-75.532 1.617-1.129c26.493-18.456 36.602-54.6 23.539-84.016-.116-.268-11.595-27.082-11.595-50.676 0-73.125 
                                59.493-132.617 132.618-132.617l4.517-.002c.3.006.599.009.899.009 25.331-.002 45.785-21.62 52.107-55.055.112-.59 11.326-59.507 11.326-106.141 
                                0-46.634-11.855-104.601-12.317-107.048zM377.487 945.656l-115.328-64.488c5.082-13.052 15.438-43.518 15.438-75.017 
                                0-109.383-84.176-199.817-192.587-208.135-2.647-15.427-8.874-54.967-8.874-85.667 0-30.657 6.223-70.232 8.869-85.672 108.416-8.312 192.592-98.746 192.592-208.135 
                                0-31.416-10.3-61.797-15.372-74.854l122.722-67.403c.003 0 .005.002.008.002 4.423 4.519 22.122 22.08 46.558 39.494 39.93 28.462 77.953 42.894 113.014 42.894 
                                34.717 0 72.438-14.152 112.115-42.064 24.283-17.08 41.897-34.302 46.309-38.745.009-.002.018-.005.026-.007l118.302 65.726c-5.078 13.055-15.416 43.5-15.416 
                                74.959 0 109.389 84.175 199.823 192.59 208.135 2.646 15.462 8.873 55.107 8.873 85.672 0 30.688-6.223 70.242-8.869 85.673-108.416 8.312-192.592 98.746-192.592 
                                208.135 0 31.45 10.317 61.851 15.393 74.904l-119.783 66.199c-5.169-5.49-22.604-23.363-46.74-41.288-40.701-30.224-79.662-45.55-115.8-45.55-35.792 
                                0-74.458 15.039-114.927 44.695-24.283 17.08-41.897 34.302-46.309 38.745zM731.272 511.647c0-105.804-86.081-191.88-191.888-191.88-105.804 0-191.88 86.077-191.88 
                                191.88 0 105.804 86.076 191.882 191.88 191.882 105.807 0 191.888-86.078 191.888-191.882zM539.384 395.903c63.826 0 115.751 51.922 115.751 115.743 0 
                                63.826-51.925 115.752-115.751 115.752-63.821 0-115.743-51.926-115.743-115.752 0-63.821 51.922-115.743 115.743-115.743z"
                            fill="#000"
                        />
                    </svg>
                </div>
            </div>
        </div>
    `;
    // 插入 CSS HTML
    document.body.appendChild(TryNotScriptCSS);
    document.body.appendChild(TryNotScriptHTML);

    // 获取 Element
    const TryNotScript = document.querySelector(".TryNotScript");
    const TryNotButton = document.querySelector(".TryNotButton");
    const ScriptTitle = document.querySelector(".ScriptTitle");
    const ScriptBox = document.querySelector(".ScriptBox");
    const ScriptFunction = document.querySelector(".ScriptFunction");
    const RemoveAD = document.querySelector(".RemoveAD");
    const ScriptSetting = document.querySelector(".ScriptSetting");
    const Setting = document.querySelector(".Setting");

    // 创建 状态管理
    const state = {
      TryNotButton: false,
      ScriptTitle: "Hello!!!",
    };

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

    // 函数 - 获取用户配置
    function Message(msg){
        ScriptTitle.style.width = "128px";
        ScriptTitle.style.padding = "6px";
        ScriptTitle.innerHTML = `<p>${msg}</p>`;
        if (!state.TryNotButton) {
          setTimeout(() => {
            ScriptTitle.style.width = "0px";
            ScriptTitle.style.padding = "0px";
          }, 3000);
        }
    }

    // 添加 事件监听 - 打开控制面板
    TryNotButton.addEventListener("click", () => {
      if (state.TryNotButton) {
        ScriptBox.style.height = "0px";
        ScriptTitle.style.width = "0px";
        ScriptTitle.style.padding = "0px";
        state.TryNotButton = false;
      } else {
        ScriptBox.style.height = "150px";
        ScriptTitle.style.width = "128px";
        ScriptTitle.style.padding = "6px";
        state.TryNotButton = true;
      }
    });
    // 添加 事件监听 - 清除广告
    RemoveAD.addEventListener("click", () => {
    //   const RemoveArray = new Array();

    //   const mhFootHint = document.querySelectorAll(".mhFootHint");
    //   const reader_cartoon_image = document.querySelectorAll(".reader-cartoon-image");

    //   RemoveArray.push(document.querySelector(".loginbackwrap"));
    //   RemoveArray.push(document.querySelector("div[data-type='1']"));
    //   RemoveArray.push(document.querySelector(".div_sticky2"));
    //   RemoveArray.push(mhFootHint[0]);
    //   RemoveArray.push(mhFootHint[1]);
    //   RemoveArray.push(reader_cartoon_image[reader_cartoon_image.length - 1]);
    //   const title = document.querySelector(".title").innerText;
    //   RemoveArray.push(document.querySelector(".reader-book-read-navbar"));
    //   RemoveArray.push(
    //     document.querySelector(".reader-book-read-actions-modal")
    //   );

    //   RemoveArray.forEach((element) => {
    //     if (element) element.remove();
    //   });

      Message("已清除");
    });

    console.log("TryNotScript: chocoi_Script Run");

    //
  } catch (error) {
    console.log("TryNotScript: chocoi_Script", error);
  } finally {
    console.log("TryNotScript: chocoi_Script End");
  }
})();
