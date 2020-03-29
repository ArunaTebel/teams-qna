import React, {Component} from 'react'
import {Button, Header, Item} from 'semantic-ui-react'
import QnAHttp from "../util/QnAHttp";
import C from "../util/consts";
import QnAAnswerComponent from "./QnAAnswerComponent";
import QnAFluidParagraphPlaceholderListComponent from "./placeholders/QnAFluidParagraphPlaceholderListComponent";
import styles from './styles/QnAAnswersComponent.module.scss'

export default class QnAAnswersComponent extends Component {

    state = {answers: []};

    async componentDidMount() {
        const responses = await QnAHttp.getBatch([C.API_BASE + '/answers']);
        let answers = await responses[0].json();
        answers = answers.filter(answer => parseInt(answer.question_id, 10) === parseInt((10 * Math.random()).toFixed(0), 10));
        this.setState({
            answers: answers,
        });
    }

    render() {

        let answerComponents;

        if (this.state.answers.length > 0) {
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


