export default {
    strEllipsis: function (str, maxLen, suffix = '...') {
        return str.length > maxLen ? `${str.substring(0, maxLen)}${suffix}` : str;

    },

    getDateFromUTCTimeStr(utcTimeStr) {
        return utcTimeStr.split('T')[0];
    }
}