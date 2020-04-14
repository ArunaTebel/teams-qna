import React, {Component} from 'react'
import {Grid} from 'semantic-ui-react'
import styles from './styles/QnACrudItemStatsComponent.module.scss'
import C from "../util/consts";

export default class QnACrudItemStatsComponent extends Component {

    render() {

        const crudItem = this.props.crudItem;
        let questionSpecificStats = '';

        if (this.props.crudItemType === C.components.QnACrudItemComponent.crudItemTypes.question) {
            questionSpecificStats = [
                <Grid.Row key={'question_specific_stats_answer_count'} className={styles.questionStatsGridRow}>
                    <Grid.Column className={styles.questionStatsGridRowDiv}>
                        <div className={styles.questionStatsNum}>{crudItem.answer_count}</div>
                        <small>Answers</small>
                    </Grid.Column>
                </Grid.Row>,
                <Grid.Row key={'question_specific_stats_view'} className={styles.questionStatsGridRow}>
                    <Grid.Column className={styles.questionStatsGridRowDiv}>
                        <div className={styles.questionStatsNum}>{crudItem.views}</div>
                        <small>Views</small>
                    </Grid.Column>
                </Grid.Row>
            ];
        }

        return (
            <Grid className={styles.questionStatsGrid}>
                <Grid.Column>
                    <Grid.Row className={styles.questionStatsGridRow}>
                        <Grid.Column className={styles.questionStatsGridRowDiv}>
                            <div className={styles.questionStatsNum}>{crudItem.up_votes}</div>
                            <small>Votes</small>
                        </Grid.Column>
                    </Grid.Row>
                    {questionSpecificStats}
                </Grid.Column>
            </Grid>
        );
    }

}