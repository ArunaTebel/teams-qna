import fetch from "isomorphic-unfetch";

export default {
    getBatch: async function (urls) {
        return await Promise.all(urls.map(async (url) => {
            return await fetch(url);
        }));
    }
}

