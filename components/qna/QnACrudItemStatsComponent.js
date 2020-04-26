import React, {Component} from 'react'
import {Grid, Icon} from 'semantic-ui-react'
import styles from './styles/QnACrudItemStatsComponent.module.scss'
import C from "../util/consts";

export default class QnACrudItemStatsComponent extends Component {

    componentConfig = C.components.QnACrudItemStatsComponent;

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
        let upVoteLink;
        let downVoteLink;
        if (this.props.detailedView) {
            const currentVoteType = this.props.currentVoteType;
            const upVoteLinkColor = currentVoteType === this.componentConfig.actions.UP ? this.componentConfig.activeIconColor : this.componentConfig.inactiveIconColor;
            const downVoteLinkColor = currentVoteType === this.componentConfig.actions.DOWN ? this.componentConfig.activeIconColor : this.componentConfig.inactiveIconColor;

            upVoteLink = <Icon onClick={() => this.props.onVote(this.componentConfig.actions.UP)} link name='chevron circle up' size={'big'}
                               className={styles.questionStatsVoteIcon} color={upVoteLinkColor}/>;
            downVoteLink =
                <Icon onClick={() => this.props.onVote(this.componentConfig.actions.DOWN)} link name='chevron circle down' size={'big'}
                      className={styles.questionStatsVoteIcon} color={downVoteLinkColor}/>;
        }

        return (
            <Grid className={styles.questionStatsGrid}>
                <Grid.Column>
                    <Grid.Row className={styles.questionStatsGridRow}>
                        {upVoteLink}
                        <Grid.Column className={styles.questionStatsGridRowDiv}>
                            <div className={styles.questionStatsNum}>{parseInt(crudItem.up_votes, 10) - parseInt(crudItem.down_votes, 10)}</div>
                            <small>Votes</small>
                        </Grid.Column>
                        {downVoteLink}
                    </Grid.Row>
                    {questionSpecificStats}
                </Grid.Column>
            </Grid>
        );
    }

}