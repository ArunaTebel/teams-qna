import Router from "next/router";
import moment from "moment";


const datetimeConfig = {
    full_date_format: 'MMMM Do YYYY',
    full_time_format: 'h:mm:ss a',
    full_date_time_format: 'MMMM Do YYYY, h:mm:ss a',
};


export default {
    strEllipsis: function (str, maxLen, suffix = '...') {
        return str.length > maxLen ? `${str.substring(0, maxLen)}${suffix}` : str;

    },

    datetime: {

        todatetime: (utcTimeStr) => {
            return moment(new Date(utcTimeStr)).format(datetimeConfig.full_date_time_format);
        },
        totime: (utcTimeStr) => {
            return moment(new Date(utcTimeStr)).format(datetimeConfig.full_time_format);
        },
        todate: (utcTimeStr) => {
            return moment(new Date(utcTimeStr)).format(datetimeConfig.full_date_format);
        },
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