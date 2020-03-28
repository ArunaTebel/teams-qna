import React, {Component} from 'react'
import {Grid, Item, Divider, Button, Label, Icon} from 'semantic-ui-react'
import QnAQuestionListQuestionComponent from "./QnAQuestionListQuestionComponent";
import QnATeamDescriptionCardComponent from "./QnATeamDescriptionCardComponent";
import QnARecentActivityListComponent from "./QnARecentActivityListComponent";
import styles from './styles/QnAHomePageComponent.module.scss'
import C from "../util/consts";
import fetch from "isomorphic-unfetch";
import QnAFluidParagraphPlaceholderListComponent from "./placeholders/QnAFluidParagraphPlaceholderListComponent";
import QnAHttp from "../util/QnAHttp";

class QnATeamHomePageComponent extends Component {

    state = {questions: [], activityLogs: []};

    async componentDidMount() {
        const responses = await QnAHttp.getBatch([C.API_BASE + '/questions']);
        this.setState({
            questions: await responses[0].json(),
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
                return <QnAQuestionListQuestionComponent key={question.id} question={question} team={this.props.team}/>
            });

            questionList = <Grid.Column width={9}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={6}>
                            <h3>3,829 questions found</h3>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <div className={styles.questionListSearchBtnPanel}>
                                <Button as='div' labelPosition='right' size='mini'>
                                    <Button color='blue' size='mini'>Newest</Button>
                                    <Label as='a' basic color='blue' pointing='left'>
                                        2,048
                                    </Label>
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
