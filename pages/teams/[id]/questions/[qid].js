import React, {Component} from 'react'
import QnAMainLayoutComponent from "../../../../components/layout/QnAMainLayoutComponent";
import C from "../../../../components/util/consts";
import {withRouter} from 'next/router';
import QnAHttp from "../../../../components/util/QnAHttp";
import QnAQuestionComponent from "../../../../components/qna/QnAQuestionComponent";
import {Divider, Grid, Item} from "semantic-ui-react";
import QnATeamDescriptionCardComponent from "../../../../components/qna/QnATeamDescriptionCardComponent";
import QnAFluidParagraphPlaceholderListComponent from "../../../../components/qna/placeholders/QnAFluidParagraphPlaceholderListComponent";
import QnACommentsComponent from "../../../../components/qna/QnACommentsComponent";
import QnAAnswersComponent from "../../../../components/qna/QnAAnswersComponent";

class ArchQnAQuestionPageComponent extends Component {

    state = {};

    static async getInitialProps(ctx) {
        const responses = await QnAHttp.getBatch([C.API_BASE + `/questions/${ctx.query.qid}`]);
        return {
            question: await responses[0].json(),
        };
    }

    render() {
        return (
            <QnAMainLayoutComponent>
                <Grid celled='internally'>
                    <Grid.Row>
                        <Grid.Column width={12}>
                            <Item.Group divided>
                                <QnAQuestionComponent question={this.props.question} detailed={true}/>

                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column width={1}>
                                        </Grid.Column>
                                        <Grid.Column width={14}>
                                            <QnACommentsComponent collapsed={false}/>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>

                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column width={16}>
                                            <QnAAnswersComponent/>
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
