import React, {Component} from 'react'
import QnAMainLayoutComponent from "../../../../components/layout/QnAMainLayoutComponent";
import Router from 'next/router';
import QnACrudItemComponent from "../../../../components/qna/QnACrudItemComponent";
import {Button, Grid, Item} from "semantic-ui-react";
import QnAFluidParagraphPlaceholderListComponent from "../../../../components/qna/placeholders/QnAFluidParagraphPlaceholderListComponent";
import QnACommentListComponent from "../../../../components/qna/QnACommentListComponent";
import QnAAnswerListComponent from "../../../../components/qna/QnAAnswerListComponent";
import API from "../../../../components/util/API";
import C from "../../../../components/util/consts";
import Utils from "../../../../components/util/utils";
import QnAListComponent from "../../../../components/qna/QnAListComponent";
import ActivityLogListItemRendererComponent from "../../../../components/qna/listItemRenderers/ActivityLogListItemRendererComponent";

class ArchQnAQuestionPageComponent extends Component {

    state = {
        question: {},
        team: {name: ''},
        currentUser: {},
    };

    constructor(props) {
        super(props);
        this.onUpdate = this.onUpdate.bind(this);
        this.fetchQuestion = this.fetchQuestion.bind(this);
        this.onVote = this.onVote.bind(this);
    }

    static async getInitialProps(ctx) {
        if (typeof window === "undefined") {
            await API.upViewQuestion(ctx.query.qid, ctx.req);
        }
        return {
            questionId: ctx.query.qid,
        };
    }

    async componentDidMount() {
        const question = await API.fetchQuestion(this.props.questionId);
        const team = await API.fetchTeam(question.team);
        const currentUser = await API.fetchUser();
        this.setState({question: question, team: team, currentUser: currentUser});
    }

    async fetchQuestion() {
        return await API.fetchQuestion(this.props.questionId);
    }

    async onUpdate() {
        this.setState({question: await this.fetchQuestion()})
    }

    async onVote(questionId, voteType) {
        this.setState({question: await API[`${voteType}VoteQuestion`](questionId)})
    }

    render() {
        const question = this.state.question;
        let questionComponent;
        let commentListComponent;
        let answersComponent;
        let questionActivityLogComponent;

        if (!question.id) {
            questionComponent = <QnAFluidParagraphPlaceholderListComponent/>;
            commentListComponent = <QnAFluidParagraphPlaceholderListComponent/>;
            answersComponent = <QnAFluidParagraphPlaceholderListComponent/>;
            questionActivityLogComponent = <QnAFluidParagraphPlaceholderListComponent/>
        } else {
            questionComponent = <QnACrudItemComponent
                crudItem={question}
                crudItemType={C.components.QnACrudItemComponent.crudItemTypes.question}
                detailed={true}
                onVote={this.onVote}
                onSaveCallback={this.onUpdate}
                teamId={question.team}/>;
            commentListComponent = <QnACommentListComponent questionId={question.id}/>;
            answersComponent = <QnAAnswerListComponent question={question}/>;
            questionActivityLogComponent = <QnAListComponent
                fetcher={(query) => API.fetchQuestionActivityLogs(this.state.question.id, query)}
                listItemRenderer={{
                    component: ActivityLogListItemRendererComponent,
                    props: {
                        getHrefForListItem: (activityLog) => `/teams/${this.state.team.id}/questions/${activityLog.data.log.params.question_id}`,
                        currentUser: this.state.currentUser
                    },
                }}
                autoPoll={{frequency: 5000}}
            />
        }

        return (
            <QnAMainLayoutComponent>
                <Grid celled='internally'>
                    <Grid.Row>
                        <Grid.Column width={12}>
                            <Button size={'mini'} icon={'arrow left'} basic compact onClick={() => Router.push(`/teams/${this.state.team.id}`)}
                                    content={Utils.strEllipsis(`Back to ${this.state.team.name}`, 35)}/>
                            <Item.Group divided>
                                {questionComponent}
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column width={1}/>
                                        <Grid.Column width={14}>
                                            {commentListComponent}
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column width={16}>
                                            {answersComponent}
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Item.Group>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <h3>Question Activity</h3>
                            {questionActivityLogComponent}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </QnAMainLayoutComponent>
        )
    }
}

export default ArchQnAQuestionPageComponent
