import fetch from "isomorphic-unfetch";

export default {

    get: async (url, init) => await fetch(url, init),

    post: async (url, data, init = {headers: {'Content-Type': 'application/json'}}) => {
        init.body = JSON.stringify(data);
        init.method = 'POST';
        return await fetch(url, init);
    },

    put: async (url, data, init = {headers: {'Content-Type': 'application/json'}}) => {
        init.body = JSON.stringify(data);
        init.method = 'PUT';
        return await fetch(url, init);
    },

    patch: async (url, data, init = {headers: {'Content-Type': 'application/json'}}) => {
        init.body = JSON.stringify(data);
        init.method = 'PATCH';
        return await fetch(url, init);
    },

    delete: async (url, init = {}) => {
        init.method = 'DELETE';
        return await fetch(url, init);
    },
}
