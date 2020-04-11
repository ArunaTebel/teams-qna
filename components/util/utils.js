import Router from "next/router";

export default {
    strEllipsis: function (str, maxLen, suffix = '...') {
        return str.length > maxLen ? `${str.substring(0, maxLen)}${suffix}` : str;

    },

    getDateFromUTCTimeStr(utcTimeStr) {
        return utcTimeStr ? utcTimeStr.split('T')[0] : '';
    },

    strings: {
        numStrComp(a, b) {
            return parseInt(a, 10) === parseInt(b, 10);
        }
    },

    redirectAfterMills(url, milliseconds) {
        setTimeout(async () => await Router.push(url), milliseconds);
    },
}