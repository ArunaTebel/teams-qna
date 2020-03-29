import React, {Component} from 'react'
import QnAQuestionComponent from "./QnAQuestionComponent";

export default class QnAQuestionListQuestionComponent extends Component {

    state = {};

    render() {
        return (
            <QnAQuestionComponent question={this.props.question} team={this.props.team}/>
        );
    }
}