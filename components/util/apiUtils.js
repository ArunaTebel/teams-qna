import Router from "next/router";
import moment from "moment";
import utils from "./utils";
import C from "../../pages/api/utils/consts";


export default {
    getProxyRequestWithTokenHeaders: () => {
        return {headers: {cookie: `access-token=${utils.getCookieValue(C.OAUTH.access_token_cookie_name)}`}};
    },

}
