import React, {Component} from 'react'
import QnAMainLayoutComponent from "../../../../components/layout/QnAMainLayoutComponent";
import QnAQuestionComponent from "../../../../components/qna/QnAQuestionComponent";
import C from "../../../../components/util/consts";
import {Grid, Item} from "semantic-ui-react";
import QnAFluidParagraphPlaceholderListComponent from "../../../../components/qna/placeholders/QnAFluidParagraphPlaceholderListComponent";
import Router from "next/router";

export default class QnATeamNewQuestionPageComponent extends Component {

    constructor(props) {
        super(props);
        this.onCreateCallback = this.onCreateCallback.bind(this);
        this.onQuestionEditCancelCallback = this.onQuestionEditCancelCallback.bind(this);
    }

    static async getInitialProps(ctx) {
        return {
            teamId: ctx.query.id,
        };
    }

    onCreateCallback(questionId) {
        if (questionId) {
            Router.push(`/teams/${this.props.teamId}/questions/${questionId}`);
        }
    }

    onQuestionEditCancelCallback() {
        Router.push(`/teams/${this.props.teamId}`)
    }

    render() {
        return (
            <QnAMainLayoutComponent>
                <Grid celled='internally'>
                    <Grid.Row>
                        <Grid.Column width={12}>
                            <Item.Group divided>
                                <QnAQuestionComponent
                                    mode={C.components.QnAQuestionComponent.modes.add}
                                    detailed={true}
                                    onSaveCallback={this.onCreateCallback}
                                    teamId={this.props.teamId}
                                    onQuestionEditCancel={this.onQuestionEditCancelCallback}
                                    noFormValidationOnMount={true}
                                />
                            </Item.Group>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <h3>Related Questions</h3>
                            <QnAFluidParagraphPlaceholderListComponent/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </QnAMainLayoutComponent>
        );
    }

}