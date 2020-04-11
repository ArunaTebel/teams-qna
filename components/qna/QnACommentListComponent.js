import React, {Component} from 'react'
import {Button, Comment, Form, Header, Icon} from 'semantic-ui-react'
import _ from 'lodash'
import API from "../util/API";
import Utils from "../util/utils";
import styles from './styles/QnACommentListComponent.module.scss'
import QnAValidatableFormComponent from "./QnAValidatableFormComponent";
import C from "../util/consts";
import QnAFluidParagraphPlaceholderListComponent from "./placeholders/QnAFluidParagraphPlaceholderListComponent";
import QnACommentComponent from "./QnACommentComponent";
import loader from "../util/loader";

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
            errors: {},
            stateFlag: undefined
        },
    };

    constructor(props) {
        super(props);

        this.commentFormRef = React.createRef();

        this.onCommentChange = this.onCommentChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onFormChange = this.onFormChange.bind(this);
        this.isQuestionComment = this.isQuestionComment.bind(this);
        this.onReceiveSaveCommentResponse = this.onReceiveSaveCommentResponse.bind(this);
        this.initEditCommentForm = this.initEditCommentForm.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
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

        getFormStateFlag: () => {
            return this.state.commentForm.stateFlag;
        },

        setFormStateFlag: (formStateFlag) => {
            this.setState((prevState) => {
                const nextState = prevState;
                nextState.commentForm.stateFlag = formStateFlag;
                return nextState;
            });
        },

        getFormValues: () => {
            return this.state.commentForm.values;
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
        },

        removeCommentById(commentId) {
            this.setState((prevState) => {
                const nextState = prevState;
                nextState.comments.splice(_.findIndex(nextState.comments, {id: commentId}), 1);
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
        loader.show();
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
        loader.hide();
    }

    async deleteComment(commentId) {
        loader.show();
        if (this.isQuestionComment()) {
            let deletedCommentId = await API.deleteQuestionComment(false, commentId);
            if (Utils.strings.numStrComp(commentId, deletedCommentId)) {
                Utils.toasts.showToast(C.messages.success);
                this.stateUtil.removeCommentById(commentId);
            } else {
                Utils.toasts.showToast(C.messages.error, 'error');
            }
        }
        loader.hide();
    }

    onCommentChange(e) {
        const comment = e.target.value;
        if (!comment || comment.length === 0) {
            this.stateUtil.setFormFieldErrors(this.formConfig.fields.comment.name, false);
        }
        this.stateUtil.setFormFieldValue(this.formConfig.fields.comment.name, comment);
        this.stateUtil.setFormStateFlag(!this.stateUtil.getFormStateFlag());
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

    render() {

        const formMode = this.stateUtil.getCommentFormMode();
        const isCommentFormBusy = this.stateUtil.isCommentFormBusy();
        let comments;

        if (this.stateUtil.isCommentListLoading()) {
            comments = <QnAFluidParagraphPlaceholderListComponent/>;
        } else {
            comments = this.state.comments.map((comment) => <QnACommentComponent
                key={comment.id}
                comment={comment}
                onEditClick={this.initEditCommentForm}
                onDeleteClick={this.deleteComment}/>
            );
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
                        validationRules={this.formConfig.validationRules}
                        formData={this.stateUtil.getFormValues()}
                        formStateFlag={this.stateUtil.getFormStateFlag()}
                        noValidateOnMount>
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


