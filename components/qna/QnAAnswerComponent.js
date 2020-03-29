import React, {Component} from 'react'
import {Item} from 'semantic-ui-react'
import styles from './styles/QnAAnswerComponent.module.scss'
import QnAUserDetailsComponent from "./QnAUserDetailsComponent";
import QnAAnswerStatsComponent from "./QnAAnswerStatsComponent";
import QnACommentsComponent from "./QnACommentsComponent";

export default class QnAAnswerComponent extends Component {

    render() {
        const answer = this.props.answer;
        const content = answer.content;
        const answerTimeStr = `Answered on ${answer.created_at.split('T')[0]} at ${answer.created_at.split('T')[1].split('Z')[0]}`;

        return (

            <Item>
                <QnAAnswerStatsComponent answerStats={answer.stats}/>
                <Item.Content className={styles.answerItemContent}>
                    <Item.Description>
                        {content}
                    </Item.Description>
                    <Item.Meta>
                        <span className={styles.answerTime}>{answerTimeStr}</span>
                    </Item.Meta>
                    <Item.Extra>
                        <QnAUserDetailsComponent user={answer.asked_by}/>
                    </Item.Extra>
                    <QnACommentsComponent collapsed={true} comments={answer.comments}/>

                </Item.Content>
            </Item>
        );
    }

}