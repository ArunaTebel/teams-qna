import React, {Component} from 'react'
import fetch from 'isomorphic-unfetch';
import Router from "next/router";

export default class ArchQnALoginCallbackComponent extends Component {

    state = {};

    async componentDidMount() {
        fetch(`/api/setAccessTokenCookie?code=${this.props.code}`).then(r => {
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
