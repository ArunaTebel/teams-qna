import React, {Component} from 'react'
import QnAMainLayoutComponent from "../../../../components/layout/QnAMainLayoutComponent";
import C from "../../../../components/util/consts";
import fetch from 'isomorphic-unfetch';
import {withRouter} from 'next/router';
import QnAHttp from "../../../../components/util/QnAHttp";

class ArchQnAQuestionComponent extends Component {

    state = {};

    static async getInitialProps(ctx) {
        const responses = await QnAHttp.getBatch([C.API_BASE + `/questions/${ctx.query.qid}`]);
        return {
            question: await responses[0].json(),
        };
    }

    render() {
        return (
            <QnAMainLayoutComponent>
                {this.props.question.name}
            </QnAMainLayoutComponent>
        )
    }
}

export default withRouter(ArchQnAQuestionComponent)
