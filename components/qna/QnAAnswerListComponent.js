import React, {Component} from 'react'
import {Button, Grid, Header, Item} from 'semantic-ui-react'
import QnAFluidParagraphPlaceholderListComponent from "./placeholders/QnAFluidParagraphPlaceholderListComponent";
import styles from './styles/QnAAnswersComponent.module.scss'
import API from "../util/API";
import QnACrudItemComponent from "./QnACrudItemComponent";
import C from "../util/consts";
import QnACommentListComponent from "./QnACommentListComponent";
import _ from "lodash";
import toasts from "../util/toasts";

export default class QnAAnswerListComponent extends Component {

    state = {answers: [], loading: true, showNewAnswerForm: false};

    constructor(props) {
        super(props);
        this.onAnswerUpdateCallback = this.onAnswerUpdateCallback.bind(this);
        this.onAnswerCreateCallback = this.onAnswerCreateCallback.bind(this);
        this.onAnswerDeleteCallback = this.onAnswerDeleteCallback.bind(this);
    }

    async componentDidMount() {
        const answers = await API.fetchQuestionAnswers(false, this.props.question.id);
        this.setState({
            answers: answers,
            loading: false
        });
    }

    onAnswerUpdateCallback(savedAnswer) {
        if (savedAnswer && savedAnswer.id) {
            this.setState((prevState) => {
                const nextState = prevState;
                nextState.answers.splice(_.findIndex(nextState.answers, {id: savedAnswer.id}), 1, savedAnswer);
                return nextState;
            });
        }
    }

    onAnswerCreateCallback(savedAnswer) {
        if (savedAnswer && savedAnswer.id) {
            this.setState((prevState) => {
                const nextState = prevState;
                nextState.answers.push(savedAnswer);
                return nextState;
            });
            toasts.showToast(C.messages.addSuccess);
            this.setState({showNewAnswerForm: false});
        }

    }

    onAnswerDeleteCallback(deletedAnswerId) {
        if (deletedAnswerId) {
            this.setState((prevState) => {
                const nextState = prevState;
                nextState.answers.splice(_.findIndex(nextState.answers, {id: deletedAnswerId}), 1);
                return nextState;
            });
        }
    }

    render() {

        let answerComponents;

        if (!this.state.loading) {
            answerComponents = this.state.answers.map((answer, idx) => {
                return [
                    <QnACrudItemComponent key={`crud_item_${idx}`} crudItem={answer} detailed onSaveCallback={this.onAnswerUpdateCallback}
                                          questionId={this.props.question.id}
                                          onDeleteCallback={this.onAnswerDeleteCallback}
                                          crudItemType={C.components.QnACrudItemComponent.crudItemTypes.answer}/>,
                    <Grid key={`answer_comment_list_grid${idx}`}>
                        <Grid.Row>
                            <Grid.Column width={1}/>
                            <Grid.Column width={15}><QnACommentListComponent collapsed={true} answerId={answer.id}/></Grid.Column>
                        </Grid.Row>
                    </Grid>
                ];
            });
            if (this.state.showNewAnswerForm) {
                answerComponents.push(
                    <QnACrudItemComponent key={'crud_item_new'} noFormValidationOnMount detailed teamId={this.props.question.team}
                                          questionId={this.props.question.id}
                                          mode={C.components.QnACrudItemComponent.modes.add}
                                          crudItemType={C.components.QnACrudItemComponent.crudItemTypes.answer}
                                          onSaveCallback={this.onAnswerCreateCallback}
                                          onCrudItemEditCancel={() => {
                                              this.setState({showNewAnswerForm: false});
                                          }}/>
                )
            }
        } else {
            answerComponents = <QnAFluidParagraphPlaceholderListComponent/>
        }

        return (
            <div>
                <Button size={'small'} className={styles.addAnswerButton} content='Add Answer' labelPosition='right' icon='lightbulb' color={'blue'}
                        onClick={() => this.setState({showNewAnswerForm: true})}/>
                <Header as='h3' dividing>
                    Answers
                </Header>
                <Item.Group divided>
                    {answerComponents}
                </Item.Group>
            </div>

        );
    }
}


