import React, {Component} from 'react'
import {Grid} from 'semantic-ui-react'
import styles from './styles/QnAQuestionStatsComponent.module.scss'

export default class QnAQuestionStatsComponent extends Component {

    render() {

        const questionStats = this.props.questionStats;

        return (
            <Grid className={styles.questionStatsGrid}>
                <Grid.Row className={styles.questionStatsGridRow}>
                    <Grid.Column className={styles.questionStatsGridRowDiv}>
                        <div className={styles.questionStatsNum}>{questionStats.votes}</div>
                        <small>Votes</small>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row className={styles.questionStatsGridRow}>
                    <Grid.Column className={styles.questionStatsGridRowDiv}>
                        <div className={styles.questionStatsNum}>{questionStats.answers}</div>
                        <small>Answers</small>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row className={styles.questionStatsGridRow}>
                    <Grid.Column className={styles.questionStatsGridRowDiv}>
                        <div className={styles.questionStatsNum}>{questionStats.views}</div>
                        <small>Views</small>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }

}