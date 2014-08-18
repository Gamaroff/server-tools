/*!
 * server-tools - lib/server-tools.js
 * Copyright(c) 2014 gamaroff <gamaroff@gmail.com>
 * MIT Licensed
 */

module.exports = function () {
    'use strict';

    var self = this;

    self.escape = function (html) {
        return String(html)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    };

    self.unescape = function (html) {
        return String(html)
            .replace(/&amp;/g, '&')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, '\'')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>');
    };
};



