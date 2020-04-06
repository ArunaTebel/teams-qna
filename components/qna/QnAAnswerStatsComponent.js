import React, {Component} from 'react'
import {Grid} from 'semantic-ui-react'
import styles from './styles/QnAAnswerStatsComponent.module.scss'

export default class QnAAnswerStatsComponent extends Component {

    render() {

        const answer = this.props.answer;

        return (
            <Grid className={styles.answerStatsGrid}>
                <Grid.Row className={styles.answerStatsGridRow}>
                    <Grid.Column className={styles.answerStatsGridRowDiv}>
                        <div className={styles.answerStatsNum}>{answer.up_votes - answer.down_votes}</div>
                        <small>Votes</small>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }

}