import React, {Component} from 'react'
import {Button, Comment, Divider, Feed, Form, Icon} from 'semantic-ui-react'
import _ from 'lodash'
import API from "../util/API";
import Utils from "../util/utils";
import styles from './styles/QnACommentListComponent.module.scss'
import QnAValidatableFormComponent from "./QnAValidatableFormComponent";
import C from "../util/consts";
import QnAFluidParagraphPlaceholderListComponent from "./placeholders/QnAFluidParagraphPlaceholderListComponent";
import QnACommentComponent from "./QnACommentComponent";
import loader from "../util/loader";
import toasts from "../util/toasts";
import QnAPaginationComponent from "../commons/QnAPaginationComponent";

export default class QnACommentListComponent extends Component {

    formConfig = C.components.QnACommentListComponent.formConfig;

    state = {
        commentListLoading: true,
        commentFormBusy: false,
        comments: {totalCount: 0, currentList: [], currentPage: 1},
        commentForm: {
            mode: this.formConfig.modes.add,
            values: {
                [this.formConfig.fields.commentId.name]: '',
                [this.formConfig.fields.comment.name]: '',
            },
            errors: {},
            stateFlag: undefined
        },
        showList: false
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
        this.onCommentListPaginate = this.onCommentListPaginate.bind(this);
        this.loadCommentListForPage = this.loadCommentListForPage.bind(this);

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
                nextState.comments.currentList.push(comment);
                nextState.comments.totalCount += 1;
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
                nextState.comments.currentList.splice(_.findIndex(nextState.comments.currentList, {id: comment.id}), 1, comment);
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

        async reloadCommentListForCurrentPage() {
            await this.loadCommentListForPage(this.state.comments.currentPage);
        },

        setCommentListLoading(isLoading) {
            this.setState((prevState) => {
                const nextState = prevState;
                nextState.commentListLoading = isLoading;
                return nextState;
            });
        },

        showList() {
            this.setState({showList: true});
        },

        hideList() {
            this.setState({showList: false});
        },

        isListVisible() {
            return this.state.showList;
        },

        getComments() {
            return this.state.comments;
        }
    };

    async componentDidMount() {
        await this.loadCommentListForPage();
    }


    async onCommentListPaginate(e, pageData) {
        this.setState({isLoading: true});
        await this.loadCommentListForPage(pageData.activePage);
        this.setState({isLoading: false});
    }

    async loadCommentListForPage(page = 1) {
        this.stateUtil.setCommentListLoading(true);
        let commentsResponse;
        if (this.isQuestionComment()) {
            commentsResponse = await API.fetchQuestionComments(this.props.questionId, `page=${page}`);
        } else {
            commentsResponse = await API.fetchAnswerComments(this.props.answerId, `page=${page}`);
        }
        this.setState((prevState) => {
            const nextState = prevState;
            nextState.comments.totalCount = commentsResponse.count;
            nextState.comments.currentList = commentsResponse.results;
            nextState.comments.currentPage = page;
            return nextState;
        });
        this.stateUtil.setCommentListLoading(false);
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
            comment = await API.fetchQuestionComment(commentId);
        } else {
            comment = await API.fetchAnswerComment(commentId);
        }
        if (this.isACommentObj(comment)) {
            this.stateUtil.setCommentFormMode(this.formConfig.modes.edit);
            this.stateUtil.setFormFieldValue(this.formConfig.fields.commentId.name, comment.id);
            this.stateUtil.setFormFieldValue(this.formConfig.fields.comment.name, comment.content);
            this.commentFormRef.current.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
        this.stateUtil.setIsCommentFormBusy(false);
        loader.hide();
    }

    async deleteComment(commentId) {
        loader.show();
        let deletedCommentId;
        if (this.isQuestionComment()) {
            deletedCommentId = await API.deleteQuestionComment(commentId);
        } else {
            deletedCommentId = await API.deleteAnswerComment(commentId);
        }
        if (Utils.strings.numStrComp(commentId, deletedCommentId)) {
            toasts.showToast(C.messages.deleteSuccess);
            await this.stateUtil.reloadCommentListForCurrentPage();
        } else {
            toasts.showToast(C.messages.error, 'error');
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
        let addCommentResponse;
        if (this.isQuestionComment()) {
            addCommentResponse = await API.addQuestionComment(this.props.questionId, {
                question: this.props.questionId,
                content: commentContent
            });
        } else {
            addCommentResponse = await API.addAnswerComment(this.props.answerId, {
                answer: this.props.answerId,
                content: commentContent
            });
        }
        this.onReceiveSaveCommentResponse(addCommentResponse);
    }

    async updateComment(commentId, commentContent) {
        let updateCommentResponse;
        if (this.isQuestionComment()) {
            updateCommentResponse = await API.updateQuestionComment(commentId, {
                content: commentContent
            });
        } else {
            updateCommentResponse = await API.updateAnswerComment(commentId, {
                content: commentContent
            });
        }
        this.onReceiveSaveCommentResponse(updateCommentResponse);
    }

    async onReceiveSaveCommentResponse(savedComment) {
        if (this.isACommentObj(savedComment)) {
            this.stateUtil.setFormFieldValue(this.formConfig.fields.comment.name, '');
            if (this.isCommentFormAddMode()) {
                await this.stateUtil.reloadCommentListForCurrentPage();
                toasts.showToast(C.messages.addSuccess);
            } else {
                this.stateUtil.replaceComment(savedComment);
                this.stateUtil.setCommentFormMode(this.formConfig.modes.add);
                toasts.showToast(C.messages.updateSuccess);
            }
        } else {
            toasts.showToast(C.messages.error, 'error');
        }
        this.stateUtil.setIsCommentFormBusy(false);
    }

    render() {

        const formMode = this.stateUtil.getCommentFormMode();
        const isCommentFormBusy = this.stateUtil.isCommentFormBusy();
        const isListVisible = this.stateUtil.isListVisible();
        const commentListData = this.stateUtil.getComments();
        const commentList = commentListData.currentList;

        let comments;

        if (this.stateUtil.isCommentListLoading()) {
            comments = <QnAFluidParagraphPlaceholderListComponent/>;
        } else {
            if (isListVisible) {
                comments = commentList.map((comment) => <QnACommentComponent
                    key={comment.id}
                    comment={comment}
                    onEditClick={this.initEditCommentForm}
                    onDeleteClick={this.deleteComment}/>
                );
            } else {
                comments = [];
            }
        }

        return (
            <div>
                <div className={styles.commentListHeaderContainer}>
                    <span className={styles.commentListHeader}>Comments ({commentListData.totalCount})</span>
                    <Button compact icon={isListVisible ? 'eye' : 'eye slash'} basic content={isListVisible ? 'Hide' : 'Show'} labelPosition='left' size='mini'
                            className={styles.commentListShowHideLink} onClick={isListVisible ? this.stateUtil.hideList : this.stateUtil.showList}/>
                </div>
                <Divider/>
                <Feed size='small'>
                    {comments}
                    <div className={styles.paginationContainer} hidden={!isListVisible}>
                        <QnAPaginationComponent
                            totalItems={commentListData.totalCount}
                            pageSize={C.components.QnAPaginationComponent.pageSize.default}
                            activePage={commentListData.currentPage}
                            onPageChange={this.onCommentListPaginate}
                        />
                    </div>
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
                </Feed>

            </div>

        );
    }
}


