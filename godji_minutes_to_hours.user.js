// ==UserScript==
// @name         Godji CRM - Конвертер времени
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  
// @match        https://godji.cloud/*
// @match        https://*.godji.cloud/*
// @updateURL    https://raw.githubusercontent.com/Randyluffu/Godji-CRM/main/godji_minutes_to_hours.user.js
// @downloadURL  https://raw.githubusercontent.com/Randyluffu/Godji-CRM/main/godji_minutes_to_hours.user.js
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    function format(totalMin) {
        var h = Math.floor(totalMin / 60);
        var m = totalMin % 60;
        if (h === 0) return totalMin + ' мин';
        if (m === 0) return h + ' ч';
        return h + ' ч ' + m + ' мин';
    }

    function convertAll() {
        var result = document.evaluate(
            '//text()[contains(., "мин")]',
            document.body, null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
        );
        for (var i = 0; i < result.snapshotLength; i++) {
            var node = result.snapshotItem(i);
            var orig = node.nodeValue;
            var updated = orig.replace(/(\d+)\s*мин[утаы]*/g, function(match, num) {
                return format(parseInt(num, 10));
            });
            if (updated !== orig) {
                node.nodeValue = updated;
            }
        }
    }

    convertAll();
    setInterval(convertAll, 500);

})();
