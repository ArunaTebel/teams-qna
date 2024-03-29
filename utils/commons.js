export default {
    jsonToUri: (obj) => {
        return Object.keys(obj)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]))
            .join('&');
    },
    UriToJson: (uri) => {
        return Object.fromEntries(new URLSearchParams(uri));
    },
};
