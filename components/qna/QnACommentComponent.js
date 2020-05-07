import React, {Component} from 'react'
import {Comment, Confirm, Feed, Image, Label} from "semantic-ui-react";
import Utils from "../util/utils";
import styles from "./styles/QnAUserDetailsComponent.module.scss";
import QnAUserAvatarComponent from "./QnAUserAvatarComponent";

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

            <Feed.Event key={comment.id}>

                <Confirm
                    content='Delete the comment?'
                    open={this.state.deletePopup.open}
                    onCancel={() => this.stateUtils.closeModal()}
                    onConfirm={this.onDeleteConfirm}
                    size='mini'
                />

                <Feed.Label>
                    <QnAUserAvatarComponent user={comment.owner}/>
                </Feed.Label>
                <Feed.Content>
                    <Feed.Summary>
                        {comment.owner.full_name}<Feed.Date content={Utils.datetime.todatetime(comment.created_at)}/>
                    </Feed.Summary>
                    <Feed.Extra text>
                        {comment.content}
                    </Feed.Extra>
                    <Feed.Meta>
                        {commentEditAction}
                        {commentDeleteAction}
                    </Feed.Meta>
                </Feed.Content>
            </Feed.Event>
        );
    }

}