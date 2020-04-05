import React, {Component} from 'react'
import QnAMainLayoutComponent from "../../components/layout/QnAMainLayoutComponent";
import QnATeamHomePageComponent from "../../components/qna/QnATeamHomePageComponent";
import {withRouter} from 'next/router';
import ArchQnaApiService from "../api/utils/archQnaApiService";

class ArchQnATeamPageComponent extends Component {

    state = {};

    static async getInitialProps(ctx) {
        return {
            team: await ArchQnaApiService.getTeam(ctx.req, ctx.query.id),
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
