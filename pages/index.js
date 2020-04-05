import React, {Component} from 'react'
import QnAMainLayoutComponent from "../components/layout/QnAMainLayoutComponent";
import QnAHomePageComponent from "../components/qna/QnAHomePageComponent";
import ArchQnaApiService from "./api/utils/archQnaApiService";

export default class ArchQnAIndexComponent extends Component {

    state = {};

    static async getInitialProps(ctx) {
        return {
            teams: await ArchQnaApiService.listTeams(ctx.req),
        };
    }

    render() {
        return (
            <QnAMainLayoutComponent>
                <QnAHomePageComponent teams={this.props.teams}/>
            </QnAMainLayoutComponent>
        )
    }
}
