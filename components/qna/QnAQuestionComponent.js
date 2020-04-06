import React, {Component} from 'react'
import {Item} from 'semantic-ui-react'
import styles from './styles/QnAQuestionComponent.module.scss'
import C from './../util/consts'
import Utils from './../util/utils'
import QnAQuestionTagsComponent from "./QnAQuestionTagsComponent";
import QnAQuestionStatsComponent from "./QnAQuestionStatsComponent";
import QnAUserDetailsComponent from "./QnAUserDetailsComponent";

export default class QnAQuestionComponent extends Component {

    render() {

        const question = this.props.question;
        const team = this.props.team;
        const detailed = this.props.detailed;
        const questionUrl = !detailed ? `/teams/${team.id}/questions/${question.id}` : '';
        const content = detailed ? question.content : Utils.strEllipsis(question.content, C.question.content_max_len);
        const questionTimeStr = `Asked on ${Utils.getDateFromUTCTimeStr(question.created_at)}`;
        return (

            <Item className={detailed ? '' : styles.questionItem}>
                <QnAQuestionStatsComponent question={question}/>
                <Item.Content className={detailed ? styles.questionItemContent : ''}>
                    <Item.Header as='a' href={questionUrl}>
                        {question.name}
                    </Item.Header>
                    <Item.Meta>
                        <span>{question.sub_title}</span>
                        <span className={styles.questionTime}>{questionTimeStr}</span>
                    </Item.Meta>
                    <Item.Description>
                        {content}
                    </Item.Description>
                    <Item.Extra>
                        <QnAQuestionTagsComponent tags={question.tags}/>
                        <QnAUserDetailsComponent user={question.owner}/>
                    </Item.Extra>

                </Item.Content>

            </Item>
        );
    }

}