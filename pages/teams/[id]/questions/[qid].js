import React, {Component} from 'react'
import QnAMainLayoutComponent from "../../../../components/layout/QnAMainLayoutComponent";
import {withRouter} from 'next/router';
import QnAQuestionComponent from "../../../../components/qna/QnAQuestionComponent";
import {Grid, Item} from "semantic-ui-react";
import QnAFluidParagraphPlaceholderListComponent from "../../../../components/qna/placeholders/QnAFluidParagraphPlaceholderListComponent";
import QnACommentListComponent from "../../../../components/qna/QnACommentListComponent";
import QnAAnswersComponent from "../../../../components/qna/QnAAnswersComponent";
import API from "../../../../components/util/API";

class ArchQnAQuestionPageComponent extends Component {

    state = {
        question: {}
    };

    constructor(props) {
        super(props);
        this.onUpdate = this.onUpdate.bind(this);
        this.fetchQuestion = this.fetchQuestion.bind(this);
    }

    static async getInitialProps(ctx) {
        return {
            questionId: ctx.query.qid,
        };
    }

    async componentDidMount() {
        this.setState({question: await this.fetchQuestion()})
    }

    async fetchQuestion() {
        return await API.fetchQuestion(false, this.props.questionId);
    }

    async onUpdate() {
        this.setState({question: await this.fetchQuestion()})
    }

    render() {
        const question = this.state.question;
        if (!question.id) {
            return '';
        }
        return (
            <QnAMainLayoutComponent>
                <Grid celled='internally'>
                    <Grid.Row>
                        <Grid.Column width={12}>
                            <Item.Group divided>
                                <QnAQuestionComponent question={question} detailed={true} onUpdate={this.onUpdate}/>
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column width={1}/>
                                        <Grid.Column width={14}>
                                            <QnACommentListComponent questionId={question.id} collapsed={false}/>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column width={16}>
                                            <QnAAnswersComponent questionId={question.id}/>
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

export default withRouter(ArchQnAQuestionPageComponent)
