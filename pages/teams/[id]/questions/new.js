import React, {Component} from 'react'
import QnAMainLayoutComponent from "../../../../components/layout/QnAMainLayoutComponent";
import QnACrudItemComponent from "../../../../components/qna/QnACrudItemComponent";
import C from "../../../../components/util/consts";
import {Grid, Item} from "semantic-ui-react";
import QnAFluidParagraphPlaceholderListComponent from "../../../../components/qna/placeholders/QnAFluidParagraphPlaceholderListComponent";
import Router from "next/router";
import Utils from "../../../../components/util/utils";
import toasts from "../../../../components/util/toasts";

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

    onCreateCallback(question) {
        if (question && question.id) {
            toasts.showToast(C.messages.addSuccess);
            Utils.redirectAfterMills(`/teams/${this.props.teamId}/questions/${question.id}`, 1000);
        }
    }

    onQuestionEditCancelCallback() {
        Router.push(`/teams/${this.props.teamId}`);
    }

    render() {
        return (
            <QnAMainLayoutComponent>
                <Grid celled='internally'>
                    <Grid.Row>
                        <Grid.Column width={12}>
                            <Item.Group divided>
                                <QnACrudItemComponent
                                    mode={C.components.QnACrudItemComponent.modes.add}
                                    crudItemType={C.components.QnACrudItemComponent.crudItemTypes.question}
                                    detailed={true}
                                    onSaveCallback={this.onCreateCallback}
                                    teamId={this.props.teamId}
                                    onCrudItemEditCancel={this.onQuestionEditCancelCallback}
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