export default {
    strEllipsis: function (str, maxLen, suffix = '...') {
        return str.length > maxLen ? `${str.substring(0, maxLen)}${suffix}` : str;

    },

    getDateFromUTCTimeStr(utcTimeStr) {
        return utcTimeStr ? utcTimeStr.split('T')[0] : '';
    }
}