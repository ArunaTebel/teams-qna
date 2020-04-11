import React, {Component} from 'react'
import {Button, Comment, Divider, Dropdown, Form, Input, Item, TextArea} from 'semantic-ui-react'
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

export default class QnAQuestionComponent extends Component {

    componentConfig = C.components.QnAQuestionComponent;
    formConfig = C.components.QnAQuestionComponent.formConfig;
    stateUtil = new QnAQuestionComponentStateUtil();

    state = {
        mode: this.props.mode ? this.props.mode : this.componentConfig.modes.view,
        questionEditForm: {
            mode: this.componentConfig.modes.add,
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
        this.initFormData().then();
    }

    async initFormData() {
        this.stateUtil.setFormMeta(this, 'questionTags', await this.fetchQuestionTagsFormChoices());
    }

    async fetchQuestionTagsFormChoices() {
        const teamTags = await API.fetchTeamTags(false, this.props.question.team.id);
        return _.map(teamTags, (tag) => {
            return {key: tag.id, text: tag.name, value: tag.id}
        });
    }

    onFormChange(validationErrors) {
        this.stateUtil.setFormErrors(this, validationErrors)
    }

    async onFormSubmit(validationErrors) {
        this.stateUtil.setIsFormBusy(this, true);
        if (_.isEmpty(validationErrors)) {
            if (this.stateUtil.isEditMode(this)) {
                const updateQuestion = await API.updateQuestion(false, this.props.question.id, this.stateUtil.getFormValues(this));
                if (updateQuestion && updateQuestion.id) {
                    this.stateUtil.setToViewMode(this);
                    await this.props.onUpdate();
                    toasts.showToast(C.messages.updateSuccess);
                }
            } else {
                //TODO: Make add question API request
            }
        } else {
            this.stateUtil.setFormErrors(this, validationErrors);
            this.stateUtil.setIsFormBusy(this, false);
        }
    }

    onFormFieldChange(event, element) {
        this.stateUtil.setFormStateFlag(this, !this.stateUtil.getFormStateFlag(this));
        this.stateUtil.setFormFieldValue(this, element.name, element.value);
    }

    render() {

        const question = this.props.question;
        const team = this.props.team;
        const detailed = this.props.detailed;
        const questionUrl = !detailed ? `/teams/${team.id}/questions/${question.id}` : '';
        const content = detailed ? question.content : Utils.strEllipsis(question.content, C.question.content_max_len);
        const questionTimeStr = `Asked on ${Utils.getDateFromUTCTimeStr(question.created_at)}`;
        const isEditMode = this.stateUtil.isEditMode(this);

        let questionStats = <QnAQuestionStatsComponent question={question}/>;

        let questionName = <Item.Header key={'q_name'} as='a' href={questionUrl}>
            {question.name}
        </Item.Header>;

        let questionSubTitle = <Item.Meta key={'q_sub_title'}>
            <span>{question.sub_title}</span>
            <span className={styles.questionTime}>{questionTimeStr}</span>
        </Item.Meta>;

        let userDetails = <QnAUserDetailsComponent user={question.owner}/>;

        let questionContent = <Item.Description key={'q_content'}>{content}</Item.Description>;

        let questionTags = <QnAQuestionTagsComponent key={'q_tags'} tags={question.tags}/>;

        if (isEditMode) {
            questionStats = '';
        }

        if (isEditMode) {
            questionName = <Form.Field
                control={Input}
                label='Title'
                className={styles.questionNameInput}
                size={'large'}
                name={this.formConfig.fields.name.name}
                onChange={this.onFormFieldChange}
                value={this.stateUtil.getFormFieldValue(this, this.formConfig.fields.name.name)}
                error={this.stateUtil.getFormFieldErrors(this, this.formConfig.fields.name.name)}
            />;
        }

        if (isEditMode) {
            questionSubTitle = <Item.Meta>
                <Form.Field
                    control={Input}
                    label='Sub Title'
                    className={styles.questionSubTitleInput}
                    size={'small'}
                    name={this.formConfig.fields.sub_title.name}
                    onChange={this.onFormFieldChange}
                    value={this.stateUtil.getFormFieldValue(this, this.formConfig.fields.sub_title.name)}
                    error={this.stateUtil.getFormFieldErrors(this, this.formConfig.fields.sub_title.name)}
                />
            </Item.Meta>;
        }

        if (isEditMode) {
            userDetails = '';
        }

        if (isEditMode) {
            questionContent = <Item.Description>
                <Divider horizontal>Content</Divider>
                <Form.Field
                    control={TextArea}
                    rows={12}
                    name={this.formConfig.fields.content.name}
                    onChange={this.onFormFieldChange}
                    value={this.stateUtil.getFormFieldValue(this, this.formConfig.fields.content.name)}
                    error={this.stateUtil.getFormFieldErrors(this, this.formConfig.fields.content.name)}
                />
            </Item.Description>;
        }

        if (isEditMode) {
            questionTags = <Dropdown
                placeholder={this.formConfig.fields.tags.label}
                fluid
                multiple
                search
                selection
                name={this.formConfig.fields.tags.name}
                onChange={this.onFormFieldChange}
                value={this.stateUtil.getFormFieldValue(this, this.formConfig.fields.tags.name)}
                error={this.stateUtil.getFormFieldErrors(this, this.formConfig.fields.tags.name)}
                options={this.stateUtil.getFormMeta(this, 'questionTags')}
            />
        }

        let editableComponents = [questionName, questionSubTitle, questionContent, questionTags];

        if (isEditMode) {
            editableComponents = <QnAValidatableFormComponent
                onChange={this.onFormChange}
                onSubmit={this.onFormSubmit}
                validationRules={this.formConfig.validationRules}
                formData={this.stateUtil.getFormValues(this)}
                formStateFlag={this.stateUtil.getFormStateFlag(this)}>
                {questionName}
                {questionSubTitle}
                {questionContent}
                <Item.Extra>
                    {questionTags}
                </Item.Extra>
                <Item.Extra>
                    <div hidden={!isEditMode} className={styles.formButtonGroup}>
                        <Button.Group>
                            <Button onClick={() => this.stateUtil.setToViewMode(this)}>Cancel</Button>
                            <Button.Or/>
                            <Button positive>Save</Button>
                        </Button.Group>
                    </div>
                </Item.Extra>
            </QnAValidatableFormComponent>
        }

        return (

            <Item className={detailed ? '' : styles.questionItem}>
                {questionStats}
                <Item.Content className={detailed ? styles.questionItemContent : ''}>
                    {editableComponents}
                    <Item.Extra>
                        {userDetails}
                    </Item.Extra>
                    <Comment.Group hidden={isEditMode || !detailed} className={styles.questionActions}>
                        <Comment>
                            <Comment.Content>
                                <Comment.Actions>
                                    <Comment.Action onClick={() => this.stateUtil.setToEditMode(this)}>Edit</Comment.Action>
                                    <Comment.Action>Delete</Comment.Action>
                                </Comment.Actions>
                            </Comment.Content>
                        </Comment>
                    </Comment.Group>
                </Item.Content>

            </Item>
        );
    }

}