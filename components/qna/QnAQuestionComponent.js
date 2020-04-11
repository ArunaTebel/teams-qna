import React, {Component} from 'react'
import {Button, Comment, Confirm, Divider, Dropdown, Form, Input, Item, TextArea} from 'semantic-ui-react'
import styles from './styles/QnAQuestionComponent.module.scss'
import C from './../util/consts'
import Utils from './../util/utils'
import QnAQuestionTagsComponent from "./QnAQuestionTagsComponent";
import QnAQuestionStatsComponent from "./QnAQuestionStatsComponent";
import QnAUserDetailsComponent from "./QnAUserDetailsComponent";
import QnAQuestionComponentStateUtil from "./stateutils/QnAQuestionComponentStateUtil";
import QnAValidatableFormComponent from "./QnAValidatableFormComponent";
import _ from "lodash";
import API from "../util/API";
import toasts from "../util/toasts";
import Router from "next/router";
import loader from "../util/loader";

export default class QnAQuestionComponent extends Component {

    componentConfig = C.components.QnAQuestionComponent;
    formConfig = C.components.QnAQuestionComponent.formConfig;
    stateUtil = new QnAQuestionComponentStateUtil();

    state = {
        mode: this.props.mode ? this.props.mode : this.componentConfig.modes.view,
        deleteQuestionModal: {open: false},
        questionEditForm: {
            values: {
                [this.formConfig.fields.name.name]: '',
                [this.formConfig.fields.sub_title.name]: '',
                [this.formConfig.fields.content.name]: '',
                [this.formConfig.fields.tags.name]: [],
            },
            isBusy: false,
            stateFlag: true,
            errors: {},
            metadata: {
                questionTags: []
            }
        },
    };

    constructor(props) {
        super(props);
        this.onFormChange = this.onFormChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onFormFieldChange = this.onFormFieldChange.bind(this);
        this.initFormData = this.initFormData.bind(this);
        this.fetchQuestionTagsFormChoices = this.fetchQuestionTagsFormChoices.bind(this);
        this.onQuestionEditCancel = this.onQuestionEditCancel.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
        this.initFormData().then();
    }

    async initFormData() {
        this.stateUtil.setFormMeta(this, 'questionTags', await this.fetchQuestionTagsFormChoices());
    }

    async fetchQuestionTagsFormChoices() {
        const teamTags = await API.fetchTeamTags(false, this.props.teamId);
        return _.map(teamTags, (tag) => {
            return {key: tag.id, text: tag.name, value: tag.id}
        });
    }

    onFormChange(validationErrors) {
        this.stateUtil.setFormErrors(this, validationErrors)
    }

    async deleteQuestion() {
        const questionId = this.props.question.id;
        if (questionId) {
            this.stateUtil.closeDeleteQuestionModal(this);
            let deletedQuestionId = await API.deleteQuestion(false, questionId);
            if (Utils.strings.numStrComp(questionId, deletedQuestionId)) {
                toasts.showToast(C.messages.deleteSuccess);
            } else {
                toasts.showToast(C.messages.error, 'error');
            }
            loader.hide();
            Utils.redirectAfterMills(`/teams/${this.props.question.team}`, 1000);
        }
    }

    async onFormSubmit(validationErrors) {
        this.stateUtil.setIsFormBusy(this, true);
        if (_.isEmpty(validationErrors)) {
            let savedQuestion;
            if (this.stateUtil.isEditMode(this)) {
                savedQuestion = await API.updateQuestion(false, this.props.question.id, this.stateUtil.getFormValues(this));
            } else {
                savedQuestion = await API.addQuestion(false, {...this.stateUtil.getFormValues(this), team: this.props.teamId});
            }
            this.afterQuestionSave(savedQuestion);
        } else {
            this.stateUtil.setFormErrors(this, validationErrors);
        }
        this.stateUtil.setIsFormBusy(this, false);
    }

    async afterQuestionSave(savedQuestion) {
        if (savedQuestion && savedQuestion.id) {
            await this.props.onSaveCallback(savedQuestion.id);
            if (this.stateUtil.isEditMode(this)) {
                toasts.showToast(C.messages.updateSuccess);
                this.stateUtil.setToViewMode(this);
            }
        } else {
            toasts.showToast(C.messages.error, 'error');
        }
    }

    onFormFieldChange(event, element) {
        this.stateUtil.setFormStateFlag(this, !this.stateUtil.getFormStateFlag(this));
        this.stateUtil.setFormFieldValue(this, element.name, element.value);
    }

    onQuestionEditCancel() {
        if (this.props.onQuestionEditCancel) {
            this.props.onQuestionEditCancel();
        } else {
            this.stateUtil.setToViewMode(this);
        }
    }

    render() {

        const isAddMode = this.stateUtil.isAddMode(this);
        const question = isAddMode ? {} : this.props.question;
        const detailed = this.props.detailed;
        const questionUrl = !detailed ? `/teams/${this.props.teamId}/questions/${question.id}` : '';
        const content = detailed ? question.content : Utils.strEllipsis(question.content, C.question.content_max_len);
        const questionTimeStr = `Asked on ${Utils.getDateFromUTCTimeStr(question.created_at)}`;
        const isEditMode = this.stateUtil.isEditMode(this);
        const isCommentFormBusy = this.stateUtil.getIsFormBusy(this);
        const isFormEditable = (isEditMode && question.can_update) || isAddMode;

        let questionStats = <QnAQuestionStatsComponent question={question}/>;
        let questionName = <Item.Header key={'q_name'} as='a' href={questionUrl}>{question.name}</Item.Header>;
        let questionSubTitle = <Item.Meta key={'q_sub_title'}><span>{question.sub_title}</span><span
            className={styles.questionTime}>{questionTimeStr}</span></Item.Meta>;
        let userDetails = <QnAUserDetailsComponent user={question.owner}/>;
        let questionContent = <Item.Description key={'q_content'}>{content}</Item.Description>;
        let questionTags = <QnAQuestionTagsComponent key={'q_tags'} tags={question.tag_details}/>;

        let questionSubComponents = [questionName, questionSubTitle, questionContent, questionTags];

        if (isFormEditable) {
            questionStats = '';
            userDetails = '';

            questionName = <Form.Field key={'q_name'} control={Input} label='Title' className={styles.questionNameInput} size={'small'}
                                       name={this.formConfig.fields.name.name}
                                       onChange={this.onFormFieldChange}
                                       value={this.stateUtil.getFormFieldValue(this, this.formConfig.fields.name.name)}
                                       error={this.stateUtil.getFormFieldErrors(this, this.formConfig.fields.name.name)}
            />;

            questionSubTitle = <Item.Meta key={'q_sub_title'}>
                <Form.Field control={Input} label='Sub Title' className={styles.questionSubTitleInput} size={'small'}
                            name={this.formConfig.fields.sub_title.name}
                            onChange={this.onFormFieldChange}
                            value={this.stateUtil.getFormFieldValue(this, this.formConfig.fields.sub_title.name)}
                            error={this.stateUtil.getFormFieldErrors(this, this.formConfig.fields.sub_title.name)}
                />
            </Item.Meta>;

            questionContent = <Item.Description key={'q_content'}>
                <Divider horizontal>Content</Divider>
                <Form.Field control={TextArea} rows={12} name={this.formConfig.fields.content.name} onChange={this.onFormFieldChange}
                            value={this.stateUtil.getFormFieldValue(this, this.formConfig.fields.content.name)}
                            error={this.stateUtil.getFormFieldErrors(this, this.formConfig.fields.content.name)}
                />
            </Item.Description>;

            questionTags = <Dropdown key={'q_tags_dropdown'} fluid multiple search selection onChange={this.onFormFieldChange}
                                     placeholder={this.formConfig.fields.tags.label}
                                     name={this.formConfig.fields.tags.name}
                                     value={this.stateUtil.getFormFieldValue(this, this.formConfig.fields.tags.name)}
                                     error={this.stateUtil.getFormFieldErrors(this, this.formConfig.fields.tags.name)}
                                     options={this.stateUtil.getFormMeta(this, 'questionTags')}
            />;

            questionSubComponents = <QnAValidatableFormComponent onChange={this.onFormChange} onSubmit={this.onFormSubmit}
                                                                 validationRules={this.formConfig.validationRules}
                                                                 formData={this.stateUtil.getFormValues(this)}
                                                                 formStateFlag={this.stateUtil.getFormStateFlag(this)}
                                                                 noValidateOnMount={this.props.noFormValidationOnMount}>
                {questionName}
                {questionSubTitle}
                {questionContent}
                <Item.Extra> {questionTags} </Item.Extra>
                <Item.Extra>
                    <div hidden={!(isFormEditable)} className={styles.formButtonGroup}>
                        <Button.Group>
                            <Button type={'button'} onClick={this.onQuestionEditCancel}>Cancel</Button>
                            <Button.Or/>
                            <Button loading={isCommentFormBusy} disabled={isCommentFormBusy} positive>Save</Button>
                        </Button.Group>
                    </div>
                </Item.Extra>
            </QnAValidatableFormComponent>
        }

        let questionEditAction = question.can_update ? <Comment.Action onClick={() => this.stateUtil.setToEditMode(this)}>Edit</Comment.Action> : '';
        let questionDeleteAction = question.can_delete ?
            <Comment.Action onClick={() => this.stateUtil.openDeleteQuestionModal(this)}>Delete</Comment.Action> : '';

        return (
            <Item className={detailed ? '' : styles.questionItem}>
                {questionStats}
                <Item.Content className={detailed ? styles.questionItemContent : ''}>
                    {questionSubComponents}
                    <Item.Extra>
                        {userDetails}
                    </Item.Extra>
                    <Comment.Group hidden={(isFormEditable) || !detailed} className={styles.questionActions}>
                        <Comment>
                            <Comment.Content>
                                <Comment.Actions>
                                    {questionEditAction}
                                    {questionDeleteAction}
                                </Comment.Actions>
                            </Comment.Content>
                        </Comment>
                    </Comment.Group>
                </Item.Content>
                <Confirm
                    content='Delete the question?'
                    open={this.state.deleteQuestionModal.open}
                    onCancel={() => this.stateUtil.closeDeleteQuestionModal(this)}
                    onConfirm={this.deleteQuestion}
                    size='mini'
                />
            </Item>
        );
    }

}