import React, {Component} from 'react'
import {Button, Header, Item} from 'semantic-ui-react'
import QnAAnswerComponent from "./QnAAnswerComponent";
import QnAFluidParagraphPlaceholderListComponent from "./placeholders/QnAFluidParagraphPlaceholderListComponent";
import styles from './styles/QnAAnswersComponent.module.scss'
import API from "../util/API";

export default class QnAAnswersComponent extends Component {

    state = {answers: [], loading: true};

    async componentDidMount() {
        const answers = await API.fetchQuestionAnswers(false, this.props.questionId);
        this.setState({
            answers: answers,
            loading: false
        });
    }

    render() {

        let answerComponents;

        if (!this.state.loading) {
            answerComponents = this.state.answers.map((answer, idx) => {
                return (
                    <QnAAnswerComponent key={idx} answer={answer}/>
                );
            });
        } else {
            answerComponents = <QnAFluidParagraphPlaceholderListComponent/>
        }

        return (
            <div>
                <Button size={'small'} className={styles.addAnswerButton} content='Add Answer' labelPosition='left' icon='add' color={'green'}/>
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


