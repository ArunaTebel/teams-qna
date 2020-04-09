import React, {Component} from 'react'
import {Comment, Confirm} from "semantic-ui-react";
import Utils from "../util/utils";

export default class QnACommentComponent extends Component {

    state = {
        deletePopup: {open: false}
    };

    constructor(props) {
        super(props);
        this.onDeleteClickHandler = this.onDeleteClickHandler.bind(this);
        this.onDeleteConfirm = this.onDeleteConfirm.bind(this);
        this.stateUtils.closeModal = this.stateUtils.closeModal.bind(this);
        this.stateUtils.openModal = this.stateUtils.openModal.bind(this);
    }

    stateUtils = {
        closeModal() {
            this.setState({deletePopup: {open: false}});
        },
        openModal() {
            this.setState({deletePopup: {open: true}});
        }
    };

    onDeleteClickHandler() {
        this.stateUtils.openModal();
    }

    onDeleteConfirm() {
        this.stateUtils.closeModal();
        this.props.onDeleteClick(this.props.comment.id);
    }

    render() {
        const comment = this.props.comment;

        let commentEditAction = '';
        let commentDeleteAction = '';
        if (comment.can_update) {
            commentEditAction = <Comment.Action onClick={() => this.props.onEditClick(comment.id)}>Edit</Comment.Action>;
        }
        if (comment.can_delete) {
            commentDeleteAction = <Comment.Action onClick={this.onDeleteClickHandler}>Delete</Comment.Action>;
        }

        return (
            <Comment key={comment.id}>

                <Confirm
                    content='Delete the comment?'
                    open={this.state.deletePopup.open}
                    onCancel={() => this.stateUtils.closeModal()}
                    onConfirm={this.onDeleteConfirm}
                    size='mini'
                />

                <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg'/>
                <Comment.Content>
                    <Comment.Author as='a'>{comment.owner.full_name}</Comment.Author>
                    <Comment.Metadata>
                        <div>{Utils.getDateFromUTCTimeStr(comment.created_at)}</div>
                    </Comment.Metadata>
                    <Comment.Text>{comment.content}</Comment.Text>
                    <Comment.Actions>
                        {commentEditAction}
                        {commentDeleteAction}
                    </Comment.Actions>
                </Comment.Content>
            </Comment>
        );
    }

}