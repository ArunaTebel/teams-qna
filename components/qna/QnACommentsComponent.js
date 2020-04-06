import React, {Component} from 'react'
import {Button, Checkbox, Comment, Form, Header} from 'semantic-ui-react'
import API from "../util/API";
import Utils from "../util/utils";

export default class QnACommentsComponent extends Component {

    state = {
        collapsed: this.props.collapsed,
        toggleMessage: this.props.collapsed ? 'Show Comments' : 'Hide Comments',
        comments: []
    };

    async componentDidMount() {
        let comments = [];
        if (this.props.questionId) {
            comments = await API.fetchQuestionComments(false, this.props.questionId);
        } else if (this.props.answerId) {
            comments = await API.fetchAnswerComments(false, this.props.answerId);
        }
        this.setState({
            comments: comments,
            loading: false
        });
    }

    handleCheckbox = (e, {checked}) => this.setState({collapsed: checked, toggleMessage: checked ? 'Show Comments' : 'Hide Comments'});

    render() {

        const comments = this.state.comments.map((comment) => {
            return (
                <Comment key={comment.id}>
                    <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg'/>
                    <Comment.Content>
                        <Comment.Author as='a'>{comment.owner.full_name}</Comment.Author>
                        <Comment.Metadata>
                            <div>{Utils.getDateFromUTCTimeStr(comment.created_at)}</div>
                        </Comment.Metadata>
                        <Comment.Text>{comment.content}</Comment.Text>
                        <Comment.Actions>
                            <Comment.Action>Edit</Comment.Action>
                            <Comment.Action>Delete</Comment.Action>
                        </Comment.Actions>
                    </Comment.Content>
                </Comment>
            );
        });

        return (
            <div>

                <Header as='h3' dividing>
                    Comments
                </Header>

                <Checkbox
                    defaultChecked={this.state.collapsed}
                    label={this.state.toggleMessage}
                    onChange={this.handleCheckbox}
                />

                <Comment.Group size='small' collapsed={this.state.collapsed}>
                    {comments}
                    <Form reply>
                        <Form.TextArea/>
                        <Button content='Add Reply' labelPosition='left' icon='edit' basic color={'blue'} size={'mini'}/>
                    </Form>
                </Comment.Group>

            </div>

        );
    }
}


