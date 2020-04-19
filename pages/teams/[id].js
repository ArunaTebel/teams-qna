import React, {Component} from 'react'
import QnAMainLayoutComponent from "../../components/layout/QnAMainLayoutComponent";
import QnATeamHomePageComponent from "../../components/qna/QnATeamHomePageComponent";
import {withRouter} from 'next/router';
import API from "../../components/util/API";

class ArchQnATeamPageComponent extends Component {

    state = {};

    static async getInitialProps(ctx) {
        return {
            team: await API.fetchTeam(ctx.query.id, ctx.req),
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
