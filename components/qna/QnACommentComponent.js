import React, {Component} from 'react'
import {Comment} from "semantic-ui-react";
import Utils from "../util/utils";

export default class QnACommentComponent extends Component {

    render() {
        const comment = this.props.comment;
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
                        <Comment.Action onClick={() => this.props.onEditClick(comment.id)}>Edit</Comment.Action>
                        <Comment.Action>Delete</Comment.Action>
                    </Comment.Actions>
                </Comment.Content>
            </Comment>
        );
    }

}