import React, {Component} from 'react'
import {Button, Checkbox, Comment, Form, Header} from 'semantic-ui-react'

export default class QnACommentsComponent extends Component {

    state = {collapsed: this.props.collapsed, toggleMessage: this.props.collapsed ? 'Show Comments' : 'Hide Comments'};

    handleCheckbox = (e, {checked}) => this.setState({collapsed: checked, toggleMessage: checked ? 'Show Comments' : 'Hide Comments'});

    render() {
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

                    <Comment>
                        <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg'/>
                        <Comment.Content>
                            <Comment.Author as='a'>Matt</Comment.Author>
                            <Comment.Metadata>
                                <div>Today at 5:42PM</div>
                            </Comment.Metadata>
                            <Comment.Text>How artistic!</Comment.Text>
                            <Comment.Actions>
                                <Comment.Action>Edit</Comment.Action>
                                <Comment.Action>Delete</Comment.Action>
                            </Comment.Actions>
                        </Comment.Content>
                    </Comment>

                    <Comment>
                        <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg'/>
                        <Comment.Content>
                            <Comment.Author as='a'>Elliot Fu</Comment.Author>
                            <Comment.Metadata>
                                <div>Yesterday at 12:30AM</div>
                            </Comment.Metadata>
                            <Comment.Text>
                                <p>This has been very useful for my research. Thanks as well!</p>
                            </Comment.Text>
                            <Comment.Actions>
                                <Comment.Action>Edit</Comment.Action>
                                <Comment.Action>Delete</Comment.Action>
                            </Comment.Actions>
                        </Comment.Content>
                    </Comment>

                    <Comment>
                        <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/joe.jpg'/>
                        <Comment.Content>
                            <Comment.Author as='a'>Joe Henderson</Comment.Author>
                            <Comment.Metadata>
                                <div>5 days ago</div>
                            </Comment.Metadata>
                            <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
                            <Comment.Actions>
                                <Comment.Action>Edit</Comment.Action>
                                <Comment.Action>Delete</Comment.Action>
                            </Comment.Actions>
                        </Comment.Content>
                    </Comment>

                    <Form reply>
                        <Form.TextArea/>
                        <Button content='Add Reply' labelPosition='left' icon='edit' basic color={'blue'} size={'mini'}/>
                    </Form>
                </Comment.Group>

            </div>

        );
    }
}


