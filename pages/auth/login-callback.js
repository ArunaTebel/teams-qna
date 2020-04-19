import React, {Component} from 'react'
import fetch from 'isomorphic-unfetch';
import Router from "next/router";

export default class ArchQnALoginCallbackComponent extends Component {

    state = {};

    async componentDidMount() {
        var parsedHash = new URLSearchParams(
            window.location.hash.substr(1)
        );

        fetch(`/api/setAccessTokenCookie?access_token=${parsedHash.get('access_token')}`).then(r => {
            if (r.status === 200) {
                window.location = '/';
            }
        });
    }

    static async getInitialProps(ctx) {
        return {code: ctx.query.code};
    }

    render() {
        return (
            <a href={'/'}>Logging in ...</a>
        )
    }
}
