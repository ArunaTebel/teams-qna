import React, {Component} from 'react'
import QnAMainLayoutComponent from "../components/layout/QnAMainLayoutComponent";
import QnAHomePageComponent from "../components/qna/QnAHomePageComponent";
import C from "../components/util/consts";
import QnAHttp from "../components/util/QnAHttp";

export default class ArchQnAIndexComponent extends Component {

    state = {};

    static async getInitialProps(ctx) {
        const responses = await QnAHttp.getBatch([C.API_BASE + '/teams']);
        return {
            teams: await responses[0].json(),
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
