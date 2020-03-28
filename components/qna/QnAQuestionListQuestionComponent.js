import React, {Component} from 'react'
import {Grid, Item, Label, Comment, Icon} from 'semantic-ui-react'
import styles from './styles/QuestionListQuestionComponent.module.scss'
import C from './../util/consts'

export default class QnAQuestionListQuestionComponent extends Component {

    state = {};

    render() {

        var question = this.props.question;
        var team = this.props.team;

        var labels = question.tags.map((tag, idx) => {
            return (
                <div key={idx} className={styles.questionItemLabels}>
                    <Label icon={tag.icon} content={tag.name.toUpperCase()}/>
                </div>
            );
        });

        return (
            <Item className={styles.questionItem}>
                <Grid className={styles.questionItemStatsGrid}>
                    <Grid.Row className={styles.questionItemStatsGridRow}>
                        <Grid.Column className={styles.questionItemStatsGridRowDiv}>
                            <div className={styles.questionItemStatsNum}>{question.stats.votes}</div>
                            <small>Votes</small>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row className={styles.questionItemStatsGridRow}>
                        <Grid.Column className={styles.questionItemStatsGridRowDiv}>
                            <div className={styles.questionItemStatsNum}>{question.stats.answers}</div>
                            <small>Answers</small>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row className={styles.questionItemStatsGridRow}>
                        <Grid.Column className={styles.questionItemStatsGridRowDiv}>
                            <div className={styles.questionItemStatsNum}>{question.stats.views}</div>
                            <small>Views</small>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Item.Content>
                    <Item.Header as='a' href={`/teams/${team.id}/questions/${question.id}`}>
                        {question.name}
                    </Item.Header>
                    <Item.Meta>
                        <span>{question.sub_title}</span>
                    </Item.Meta>
                    <Item.Description>
                        {question.content.length > C.question.content_max_len ? `${question.content.substring(0, C.question.content_max_len)}...` : question.content}
                    </Item.Description>
                    <Item.Extra>
                        {labels}
                        <Comment.Group className={styles.questionItemAskerGroup}>
                            <Comment className={styles.questionItemAsker}>
                                <Comment.Avatar as='a' src={`/img/test-data/${question.asked_by.avatar}.jpg`}/>
                                <Comment.Content>
                                    <Comment.Author>{question.asked_by.name}</Comment.Author>
                                    <Comment.Metadata>
                                        <div>2 days ago</div>
                                        <div>
                                            <Icon name='star'/>{question.asked_by.rating}
                                        </div>
                                    </Comment.Metadata>
                                </Comment.Content>
                            </Comment>
                        </Comment.Group>
                    </Item.Extra>

                </Item.Content>

            </Item>
        );
    }
}