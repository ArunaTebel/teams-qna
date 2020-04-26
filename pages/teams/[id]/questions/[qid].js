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

class ArchQnAQuestionPageComponent extends Component {

    state = {
        question: {},
        team: {name: ''},
    };

    constructor(props) {
        super(props);
        this.onUpdate = this.onUpdate.bind(this);
        this.fetchQuestion = this.fetchQuestion.bind(this);
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
        this.setState({question: question, team: team});
    }

    async fetchQuestion() {
        return await API.fetchQuestion(this.props.questionId);
    }

    async onUpdate() {
        this.setState({question: await this.fetchQuestion()})
    }

    render() {
        const question = this.state.question;
        let questionComponent;
        let commentListComponent;
        let answersComponent;

        if (!question.id) {
            questionComponent = <QnAFluidParagraphPlaceholderListComponent/>;
            commentListComponent = <QnAFluidParagraphPlaceholderListComponent/>;
            answersComponent = <QnAFluidParagraphPlaceholderListComponent/>;
        } else {
            questionComponent = <QnACrudItemComponent
                crudItem={question}
                crudItemType={C.components.QnACrudItemComponent.crudItemTypes.question}
                detailed={true}
                onSaveCallback={this.onUpdate}
                teamId={question.team}/>;
            commentListComponent = <QnACommentListComponent questionId={question.id}/>;
            answersComponent = <QnAAnswerListComponent question={question}/>;
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
                            <h3>Related Questions</h3>
                            <QnAFluidParagraphPlaceholderListComponent/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </QnAMainLayoutComponent>
        )
    }
}

export default ArchQnAQuestionPageComponent
