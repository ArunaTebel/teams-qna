import React, {Component} from 'react'
import QnAMainLayoutComponent from "../../components/layout/QnAMainLayoutComponent";
import QnATeamHomePageComponent from "../../components/qna/QnATeamHomePageComponent";
import C from "../../components/util/consts";
import fetch from 'isomorphic-unfetch';
import {withRouter} from 'next/router';
import QnAHttp from "../../components/util/QnAHttp";

class ArchQnATeamPageComponent extends Component {

    state = {};

    static async getInitialProps(ctx) {
        const responses = await QnAHttp.getBatch([C.API_BASE + `/teams/${ctx.query.id}`]);
        return {
            team: await responses[0].json(),
        };
    }

    render() {
        return (
            <QnAMainLayoutComponent>
                <QnATeamHomePageComponent team={this.props.team}/>
            </QnAMainLayoutComponent>
        )
    }
}

export default withRouter(ArchQnATeamPageComponent)
