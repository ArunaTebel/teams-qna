import React, {Component} from 'react'
import {Grid, Item, Divider, Button, Label, Icon} from 'semantic-ui-react'
import QnATeamDescriptionCardComponent from "./QnATeamDescriptionCardComponent";
import QnARecentActivityListComponent from "./QnARecentActivityListComponent";
import styles from './styles/QnAHomePageComponent.module.scss'
import QnAFluidParagraphPlaceholderListComponent from "./placeholders/QnAFluidParagraphPlaceholderListComponent";
import API from "../util/API";
import QnAQuestionComponent from "./QnAQuestionComponent";
import Router from 'next/router'

class QnATeamHomePageComponent extends Component {

    state = {questions: [], activityLogs: []};

    async componentDidMount() {
        const questions = await API.fetchTeamQuestions(false, this.props.team.id);
        this.setState({
            questions: questions,
        });
    }

    render() {

        let questionList;

        if (this.state.questions.length === 0) {
            questionList = <Grid.Column width={9}>
                <Divider/>
                <QnAFluidParagraphPlaceholderListComponent/>
            </Grid.Column>
        } else {

            const questionListItems = this.state.questions.map(question => {
                return <QnAQuestionComponent key={question.id} question={question} teamId={this.props.team.id}/>
            });

            questionList = <Grid.Column width={9}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={6}>
                            <h3>3,829 questions found</h3>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <div className={styles.questionListSearchBtnPanel}>
                                <Button onClick={() => Router.push(`/teams/${this.props.team.id}/questions/new`)} as='div' icon primary labelPosition='left' size='mini'>
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
