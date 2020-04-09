import React, {Component} from 'react'
import {Button, Comment, Form, Header, Icon} from 'semantic-ui-react'
import _ from 'lodash'
import API from "../util/API";
import Utils from "../util/utils";
import styles from './styles/QnACommentListComponent.module.scss'
import QnAValidatableFormComponent from "./QnAValidatableFormComponent";
import C from "../util/consts";
import QnAFluidParagraphPlaceholderListComponent from "./placeholders/QnAFluidParagraphPlaceholderListComponent";

export default class QnACommentListComponent extends Component {

    formConfig = C.components.QnACommentListComponent.formConfig;

    state = {
        commentListLoading: true,
        commentFormBusy: false,
        comments: [],
        commentForm: {
            mode: this.formConfig.modes.add,
            values: {
                [this.formConfig.fields.commentId.name]: '',
                [this.formConfig.fields.comment.name]: '',
            },
            errors: {}
        },
        validatableFormConfig: {commentForm: {errors: this.initialCommentFormErrors}}
    };

    constructor(props) {
        super(props);

        this.commentFormRef = React.createRef();

        this.onCommentChange = this.onCommentChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.getCommentFormValidationRules = this.getCommentFormValidationRules.bind(this);
        this.onFormChange = this.onFormChange.bind(this);
        this.isQuestionComment = this.isQuestionComment.bind(this);
        this.onReceiveSaveCommentResponse = this.onReceiveSaveCommentResponse.bind(this);
        this.initEditCommentForm = this.initEditCommentForm.bind(this);
        this.isACommentObj = this.isACommentObj.bind(this);
        this.addComment = this.addComment.bind(this);
        this.updateComment = this.updateComment.bind(this);
        this.isCommentFormAddMode = this.isCommentFormAddMode.bind(this);

        this.initStateUtilFunctions();
    }

    initStateUtilFunctions() {
        _.each(this.stateUtil, (func, functionName) => {
            this.stateUtil[functionName] = this.stateUtil[functionName].bind(this);
        });
    }

    stateUtil = {

        get: (key) => {
            return this.state[key];
        },

        set: (key, value) => {
            this.setState((prevState) => {
                const nextState = prevState;
                nextState[key] = value;
                return nextState;
            });
        },

        getFormFieldValue: (fieldName) => {
            return this.state.commentForm.values[fieldName];
        },

        setFormFieldValue: (fieldName, value) => {
            this.setState((prevState) => {
                const nextState = prevState;
                nextState.commentForm.values[fieldName] = value;
                return nextState;
            });
        },

        getFormFieldErrors: (fieldName) => {
            return this.state.commentForm.errors[fieldName];
        },

        setFormFieldErrors: (fieldName, errors) => {
            this.setState((prevState) => {
                const nextState = prevState;
                nextState.commentForm.errors[fieldName] = errors;
                return nextState;
            });
        },

        setFormErrors: (errors) => {
            this.setState((prevState) => {
                const nextState = prevState;
                nextState.commentForm.errors = errors;
                return nextState;
            });
        },

        pushNewComment(comment) {
            this.setState((prevState) => {
                const nextState = prevState;
                nextState.comments.push(comment);
                return nextState;
            });
        },

        setCommentFormMode(mode) {
            this.setState((prevState) => {
                const nextState = prevState;
                nextState.commentForm.mode = mode;
                if (mode === this.formConfig.modes.add) {
                    nextState.commentForm.values[this.formConfig.fields.commentId.name] = '';
                    nextState.commentForm.values[this.formConfig.fields.comment.name] = '';
                }
                return nextState;
            });
        },

        getCommentFormMode() {
            return this.state.commentForm.mode;
        },

        replaceComment(comment) {
            this.setState((prevState) => {
                const nextState = prevState;
                nextState.comments.splice(_.findIndex(nextState.comments, {id: comment.id}), 1, comment);
                return nextState;
            });
        },

        isCommentListLoading() {
            return this.state.commentListLoading;
        },

        isCommentFormBusy() {
            return this.state.commentFormBusy;
        },

        setIsCommentFormBusy(isCommentFormBusy) {
            this.setState((prevState) => {
                const nextState = prevState;
                nextState.commentFormBusy = isCommentFormBusy;
                return nextState;
            });
        }
    };

    async componentDidMount() {
        let comments = [];
        if (this.isQuestionComment()) {
            comments = await API.fetchQuestionComments(false, this.props.questionId);
        } else {
            comments = await API.fetchAnswerComments(false, this.props.answerId);
        }
        this.setState({
            comments: comments,
            commentListLoading: false
        });
    }

    isQuestionComment() {
        return this.props.questionId && this.props.questionId !== ''
    }

    isACommentObj(comment) {
        return (!_.isEmpty(comment) && comment.id)
    }

    isCommentFormAddMode() {
        return this.stateUtil.getCommentFormMode() === this.formConfig.modes.add
    }

    async initEditCommentForm(commentId) {
        this.stateUtil.setIsCommentFormBusy(true);
        let comment;
        if (this.isQuestionComment()) {
            comment = await API.fetchQuestionComment(false, commentId);
            if (this.isACommentObj(comment)) {
                this.stateUtil.setCommentFormMode(this.formConfig.modes.edit);
                this.stateUtil.setFormFieldValue(this.formConfig.fields.commentId.name, comment.id);
                this.stateUtil.setFormFieldValue(this.formConfig.fields.comment.name, comment.content);
                this.commentFormRef.current.scrollIntoView({behavior: 'smooth', block: 'center'});
            }
        }
        this.stateUtil.setIsCommentFormBusy(false);
    }

    onCommentChange(e) {
        const comment = e.target.value;
        if (!comment || comment.length === 0) {
            this.stateUtil.setFormFieldErrors(this.formConfig.fields.comment.name, false);
        }
        this.stateUtil.setFormFieldValue(this.formConfig.fields.comment.name, comment);
    }

    onFormChange(validationErrors) {
        this.stateUtil.setFormErrors(validationErrors)
    }

    async onFormSubmit(validationErrors) {
        this.stateUtil.setIsCommentFormBusy(true);
        if (_.isEmpty(validationErrors)) {
            if (this.isCommentFormAddMode()) {
                this.addComment(this.stateUtil.getFormFieldValue(this.formConfig.fields.comment.name))
            } else {
                this.updateComment(
                    this.stateUtil.getFormFieldValue(this.formConfig.fields.commentId.name),
                    this.stateUtil.getFormFieldValue(this.formConfig.fields.comment.name)
                )
            }
        } else {
            this.stateUtil.setFormErrors(validationErrors);
            this.stateUtil.setIsCommentFormBusy(false);
        }
    }

    async addComment(commentContent) {
        let addCommentResponse = await API.addQuestionComment(false, this.props.questionId, {
            question: this.props.questionId,
            content: commentContent
        });
        this.onReceiveSaveCommentResponse(addCommentResponse);
    }

    async updateComment(commentId, commentContent) {
        let updateCommentResponse = await API.updateQuestionComment(false, commentId, {
            content: commentContent
        });
        this.onReceiveSaveCommentResponse(updateCommentResponse);
    }

    onReceiveSaveCommentResponse(savedComment) {
        if (this.isACommentObj(savedComment)) {
            this.stateUtil.setFormFieldValue(this.formConfig.fields.comment.name, '');
            if (this.isCommentFormAddMode()) {
                this.stateUtil.pushNewComment(savedComment);
            } else {
                this.stateUtil.replaceComment(savedComment);
                this.stateUtil.setCommentFormMode(this.formConfig.modes.add);
            }
            Utils.toasts.showToast(C.messages.success);
        } else {
            Utils.toasts.showToast(C.messages.error, 'error');
        }
        this.stateUtil.setIsCommentFormBusy(false);
    }

    getCommentFormValidationRules() {
        return {
            [this.formConfig.fields.comment.name]: {
                presence: true,
                length: {
                    minimum: 15,
                    maximum: 500,
                    tooShort: "should at least have %{count} characters",
                    tooLong: "should not exceed %{count} characters",
                }
            }
        };
    }

    render() {

        const formMode = this.stateUtil.getCommentFormMode();
        const isCommentFormBusy = this.stateUtil.isCommentFormBusy();
        let comments;

        if (this.stateUtil.isCommentListLoading()) {
            comments = <QnAFluidParagraphPlaceholderListComponent/>;
        } else {
            comments = this.state.comments.map((comment) => {
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
                                <Comment.Action onClick={() => this.initEditCommentForm(comment.id)}>Edit</Comment.Action>
                                <Comment.Action>Delete</Comment.Action>
                            </Comment.Actions>
                        </Comment.Content>
                    </Comment>
                );
            });
        }

        return (
            <div>
                <Header as='h3' dividing>Comments</Header>
                <Comment.Group size='small'>
                    {comments}
                    <div ref={this.commentFormRef}/>
                    <QnAValidatableFormComponent
                        onChange={this.onFormChange}
                        onSubmit={this.onFormSubmit}
                        validationRules={this.getCommentFormValidationRules()}
                        formData={this.stateUtil.getFormFieldValue(this.formConfig.fields.comment.name)}>
                        <Form.TextArea
                            name={this.formConfig.fields.comment.name}
                            onChange={this.onCommentChange}
                            value={this.stateUtil.getFormFieldValue(this.formConfig.fields.comment.name)}
                            rows={2}
                            className={styles[this.formConfig.textAreaContainer[formMode].class]}
                            error={this.stateUtil.getFormFieldErrors(this.formConfig.fields.comment.name)}/>
                        <Button loading={isCommentFormBusy} disabled={isCommentFormBusy} icon labelPosition='right'
                                color={this.formConfig.button.save[formMode].color}
                                size={'mini'}>
                            {this.formConfig.button.save[formMode].label}
                            <Icon name={this.formConfig.button.save[formMode].icon}/></Button>
                        <span hidden={this.isCommentFormAddMode()}>
                            <Button onClick={() => this.stateUtil.setCommentFormMode(this.formConfig.modes.add)} type={'button'} size={'mini'}>Cancel</Button>
                        </span>
                    </QnAValidatableFormComponent>
                </Comment.Group>

            </div>

        );
    }
}


