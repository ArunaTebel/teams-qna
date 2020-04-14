import React, {Component} from 'react'
import {Grid, Item, Divider, Button, Label, Icon} from 'semantic-ui-react'
import QnATeamDescriptionCardComponent from "./QnATeamDescriptionCardComponent";
import QnARecentActivityListComponent from "./QnARecentActivityListComponent";
import styles from './styles/QnAHomePageComponent.module.scss'
import QnAFluidParagraphPlaceholderListComponent from "./placeholders/QnAFluidParagraphPlaceholderListComponent";
import API from "../util/API";
import QnACrudItemComponent from "./QnACrudItemComponent";
import Router from 'next/router'
import C from "../util/consts";
import _ from "lodash";

class QnATeamHomePageComponent extends Component {

    state = {questions: [], tags: [], activityLogs: [], isLoading: true};

    async componentDidMount() {
        const questions = await API.fetchTeamQuestions(false, this.props.team.id);
        const teamTags = await API.fetchTeamTags(false, this.props.teamId);
        console.log(questions);
        this.setState({
            questions: questions.results,
            tags: teamTags,
            isLoading: false,
        });
    }

    render() {

        let questionList;

        if (this.state.isLoading) {
            questionList = <Grid.Column width={9}>
                <Divider/>
                <QnAFluidParagraphPlaceholderListComponent/>
            </Grid.Column>
        } else {
            const questionListItems = this.state.questions.map(question => {
                return <QnACrudItemComponent key={question.id} crudItem={question} teamId={this.props.team.id} specificData={{tags: this.state.tags}}
                                             crudItemType={C.components.QnACrudItemComponent.crudItemTypes.question}/>
            });

            questionList = <Grid.Column width={9}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={6}>
                            <h3>3,829 questions found</h3>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <div className={styles.questionListSearchBtnPanel}>
                                <Button onClick={() => Router.push(`/teams/${this.props.team.id}/questions/new`)} as='div' icon primary labelPosition='left'
                                        size='mini'>
                                    <Icon name='lightbulb'/>
                                    Ask a Question
                                </Button>
                                <Button as='div' labelPosition='right' size='mini'>
                                    <Button basic color='green' size='mini'>Active</Button>
                                    <Label as='a' basic color='green' pointing='left'>
                                        712
                                    </Label>
                                </Button>
                                <Button as='div' labelPosition='right' size='mini'>
                                    <Button basic color='red' size='mini'>Unanswered</Button>
                                    <Label as='a' basic color='red' pointing='left'>
                                        1,296
                                    </Label>
                                </Button>
                                <Button icon size='mini'>
                                    <Icon name='filter'/>
                                </Button>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Divider/>
                <Item.Group divided>
                    {questionListItems}
                </Item.Group>
            </Grid.Column>;
        }

        return (
            <Grid celled='internally'>

                <Grid.Row>

                    <Grid.Column width={3}>
                        <QnATeamDescriptionCardComponent team={this.props.team}/>
                    </Grid.Column>

                    {questionList}

                    <Grid.Column width={4}>
                        <QnARecentActivityListComponent team={this.props.team}/>
                    </Grid.Column>

                </Grid.Row>
            </Grid>
        )
    }
}

export default QnATeamHomePageComponent;
