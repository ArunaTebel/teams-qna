import React, {Component} from 'react'
import FormData from "isomorphic-form-data";
import C from "../api/utils/consts";
import fetch from "isomorphic-unfetch";
import cookieUtils from "../api/utils/cookies";
import Router from 'next/router'

export default class ArchQnALoginCallbackComponent extends Component {

    state = {};

    static async getInitialProps(ctx) {

        let data = new FormData();
        data.append("token", cookieUtils.extractAccessToken(ctx.req));
        data.append("client_id", C.OAUTH.client_id);
        data.append("client_secret", C.OAUTH.client_secret);

        const revokeTokenResponseStatus = await fetch(`${C.API_BASE}/o/revoke_token/`, {
            method: 'POST',
            body: data
        }).then(async r => {
            return r.status;
        }).catch(error => console.log('error', error));

        return {revokeTokenResponseStatus: revokeTokenResponseStatus};
    }

    componentDidMount() {
        if (this.props.revokeTokenResponseStatus === 200) {
            fetch('/api/removeAccessTokenCookie').then(r => {
                window.location = '/';
            });
        }
    }

    render() {
        return (
            <a href={'/'}>Logging out...</a>
        )
    }
}
