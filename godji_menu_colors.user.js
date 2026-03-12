// ==UserScript==
// @name         Godji CRM - Цветные кнопки
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  
// @match        https://godji.cloud/*
// @match        https://*.godji.cloud/*
// @updateURL    https://raw.githubusercontent.com/Randyluffu/Godji-CRM/main/godji_menu_colors.user.js
// @downloadURL  https://raw.githubusercontent.com/Randyluffu/Godji-CRM/main/godji_menu_colors.user.js
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    var COLORS = {
        'Посадить за ПК':       { color: '#2e7d32', bg: '#e8f5e9' },
        'Бронирование':         { color: '#f57f17', bg: '#fffde7' },
        'Пополнить наличными':  { color: '#2e7d32', bg: '#e8f5e9' },
        'Пополнить бонусами':   { color: '#2e7d32', bg: '#e8f5e9' },
        'Смена места':          { color: '#1565c0', bg: '#e3f2fd' },
        'Продление сеанса':     { color: '#f57f17', bg: '#fffde7' },
        'Завершить сессию':     { color: '#c62828', bg: '#ffebee' },
        'Выйти из аккаунта':    { color: '#a05a2c', bg: '#fbe9e7' },
        'Выключить':            { color: '#ffffff', bg: '#7f0000' },
        'Включить':             { color: '#ffffff', bg: '#1b5e20' },
        'Перезагрузить':        { color: '#e65100', bg: '#fff3e0' },
        'Снять защиту':         { color: '#ffffff', bg: '#283593' },
        'Командная строка':     { color: '#1a237e', bg: '#e8eaf6' },
        'Диспетчер задач':      { color: '#a05a2c', bg: '#fbe9e7' },
        'Редактировать':        { color: '#555555', bg: '#f5f5f5' },
        'Удалить':              { color: '#b71c1c', bg: '#fce4ec' },
    };

    function colorize() {
        var items = document.querySelectorAll('button[role="menuitem"]');
        for (var i = 0; i < items.length; i++) {
            var btn = items[i];
            var labelEl = btn.querySelector('.mantine-Menu-itemLabel');
            if (!labelEl) continue;
            var text = labelEl.textContent.trim();
            var cfg = COLORS[text];
            if (!cfg) continue;
            btn.style.color = cfg.color;
            btn.style.backgroundColor = cfg.bg;
            btn.style.setProperty('--menu-item-color', cfg.color);
            btn.style.setProperty('--menu-item-hover', cfg.bg);
            var svg = btn.querySelector('svg');
            if (svg) svg.style.stroke = cfg.color;
        }
    }

    setInterval(colorize, 010);

})();
