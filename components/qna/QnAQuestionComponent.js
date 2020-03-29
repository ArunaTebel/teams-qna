import React, {Component} from 'react'
import {Item} from 'semantic-ui-react'
import styles from './styles/QnAQuestionComponent.module.scss'
import C from './../util/consts'
import QnAQuestionTagsComponent from "./QnAQuestionTagsComponent";
import QnAQuestionStatsComponent from "./QnAQuestionStatsComponent";
import QnAUserDetailsComponent from "./QnAUserDetailsComponent";

export default class QnAQuestionComponent extends Component {

    render() {

        const question = this.props.question;
        const team = this.props.team;
        const detailed = this.props.detailed;
        const questionUrl = !detailed ? `/teams/${team.id}/questions/${question.id}` : '';
        const content = detailed ? question.content : question.content.length > C.question.content_max_len ? `${question.content.substring(0, C.question.content_max_len)}...` : question.content;
        const questionTimeStr = `Asked on ${question.created_at.split('T')[0]} at ${question.created_at.split('T')[1].split('Z')[0]}`
        return (

            <Item className={detailed ? '' : styles.questionItem}>
                <QnAQuestionStatsComponent questionStats={question.stats}/>
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
                        <QnAUserDetailsComponent user={question.asked_by}/>
                    </Item.Extra>

                </Item.Content>

            </Item>
        );
    }

}