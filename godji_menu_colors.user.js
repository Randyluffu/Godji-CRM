// ==UserScript==
// @name         Godji CRM - Цвета кнопок
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  
// @match        https://godji.cloud/*
// @match        https://*.godji.cloud/*
// @updateURL    https://raw.githubusercontent.com/Randyluffu/Godji-CRM/main/godji_menu_colors.user.js
// @downloadURL  https://raw.githubusercontent.com/Randyluffu/Godji-CRM/main/godji_menu_colors.user.js
// @grant        GM_setValue
// @grant        GM_getValue
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

    var enabled = GM_getValue('colorsEnabled', true);

    function colorize() {
        var items = document.querySelectorAll('button[role="menuitem"]');
        for (var i = 0; i < items.length; i++) {
            var btn = items[i];
            var labelEl = btn.querySelector('.mantine-Menu-itemLabel');
            if (!labelEl) continue;
            var text = labelEl.textContent.trim();
            var cfg = COLORS[text];
            if (!cfg) continue;

            if (enabled) {
                btn.style.color = cfg.color;
                btn.style.backgroundColor = cfg.bg;
                btn.style.setProperty('--menu-item-color', cfg.color);
                btn.style.setProperty('--menu-item-hover', cfg.bg);
                var svg = btn.querySelector('svg');
                if (svg) svg.style.stroke = cfg.color;
            } else {
                btn.style.color = '';
                btn.style.backgroundColor = '';
                btn.style.removeProperty('--menu-item-color');
                btn.style.removeProperty('--menu-item-hover');
                var svg2 = btn.querySelector('svg');
                if (svg2) svg2.style.stroke = '';
            }
        }
    }

    function createToggle() {
        var wrap = document.createElement('div');
        wrap.style.cssText = [
            'position:fixed',
            'bottom:20px',
            'left:12px',
            'z-index:99999',
            'display:flex',
            'align-items:center',
            'gap:8px',
            'background:#ffffff',
            'border:1px solid #e8e8e8',
            'border-radius:8px',
            'padding:6px 12px 6px 10px',
            'box-shadow:0 2px 8px rgba(0,0,0,0.10)',
            'cursor:pointer',
            'user-select:none',
            'font-family:inherit',
            'transition:box-shadow 0.2s,border-color 0.2s',
        ].join(';');

        var icon = document.createElement('span');
        icon.textContent = '\uD83C\uDFA8';
        icon.style.cssText = 'font-size:14px;line-height:1;';

        var label = document.createElement('span');
        label.textContent = '\u0426\u0432\u0435\u0442\u0430 \u043c\u0435\u043d\u044e';
        label.style.cssText = [
            'font-size:12px',
            'font-weight:600',
            'color:#333',
            'letter-spacing:0.2px',
            'white-space:nowrap',
        ].join(';');

        var track = document.createElement('div');
        track.style.cssText = [
            'width:36px',
            'height:20px',
            'border-radius:10px',
            'position:relative',
            'flex-shrink:0',
            'transition:background 0.25s',
        ].join(';');

        var thumb = document.createElement('div');
        thumb.style.cssText = [
            'width:14px',
            'height:14px',
            'border-radius:50%',
            'background:#fff',
            'position:absolute',
            'top:3px',
            'transition:left 0.25s',
            'box-shadow:0 1px 3px rgba(0,0,0,0.25)',
        ].join(';');

        function updateVisual() {
            if (enabled) {
                track.style.background = '#cc0001';
                thumb.style.left = '19px';
            } else {
                track.style.background = '#d0d0d0';
                thumb.style.left = '3px';
            }
        }

        track.appendChild(thumb);
        wrap.appendChild(icon);
        wrap.appendChild(label);
        wrap.appendChild(track);
        document.body.appendChild(wrap);

        updateVisual();

        wrap.addEventListener('mouseenter', function () {
            wrap.style.boxShadow = '0 4px 16px rgba(204,0,1,0.15)';
            wrap.style.borderColor = '#cc0001';
        });
        wrap.addEventListener('mouseleave', function () {
            wrap.style.boxShadow = '0 2px 8px rgba(0,0,0,0.10)';
            wrap.style.borderColor = '#e8e8e8';
        });

        wrap.addEventListener('click', function () {
            enabled = !enabled;
            GM_setValue('colorsEnabled', enabled);
            updateVisual();
            colorize();
        });
    }

    createToggle();
    setInterval(colorize, 300);

})();
