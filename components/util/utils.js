import {toast} from "react-toastify";

export default {
    strEllipsis: function (str, maxLen, suffix = '...') {
        return str.length > maxLen ? `${str.substring(0, maxLen)}${suffix}` : str;

    },

    getDateFromUTCTimeStr(utcTimeStr) {
        return utcTimeStr ? utcTimeStr.split('T')[0] : '';
    },

    toasts: {
        showToast(message, type = 'success', options = {}) {
            if (type === 'success') {
                toast.success(message);
            } else if (type === 'error') {
                toast.error(message);
            } else {
                toast(message);
            }
        }
    },

    strings: {
        numStrComp(a, b) {
            return parseInt(a, 10) === parseInt(b, 10);
        }
    }
}