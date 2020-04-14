import React, {Component} from 'react'
import {Button, Comment, Confirm, Divider, Dropdown, Form, Input, Item, TextArea} from 'semantic-ui-react'
import styles from './styles/QnAQuestionComponent.module.scss'
import C from './../util/consts'
import Utils from './../util/utils'
import QnAQuestionTagsComponent from "./QnAQuestionTagsComponent";
import QnACrudItemStatsComponent from "./QnACrudItemStatsComponent";
import QnAUserDetailsComponent from "./QnAUserDetailsComponent";
import QnACrudItemComponentStateUtil from "./stateutils/QnACrudItemComponentStateUtil";
import QnAValidatableFormComponent from "./QnAValidatableFormComponent";
import _ from "lodash";
import API from "../util/API";
import toasts from "../util/toasts";
import loader from "../util/loader";
import QnAMarkDownComponent from "../commons/qna-mde/QnAMarkDownComponent";

export default class QnACrudItemComponent extends Component {

    componentConfig = C.components.QnACrudItemComponent;
    formConfig = C.components.QnACrudItemComponent.formConfig;
    stateUtil = new QnACrudItemComponentStateUtil();

    state = {
        mode: this.props.mode ? this.props.mode : this.componentConfig.modes.view,
        deleteCrudItemModal: {open: false},
        crudItemEditForm: {
            values: {},
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
        this.onCrudItemEditCancel = this.onCrudItemEditCancel.bind(this);
        this.deleteCrudItem = this.deleteCrudItem.bind(this);
        this.initQuestionFormData = this.initQuestionFormData.bind(this);
        this.isQuestionType = this.isQuestionType.bind(this);
        this.isAnswerType = this.isAnswerType.bind(this);
        this.getFormFieldName = this.getFormFieldName.bind(this);
        this.getFormFieldLabel = this.getFormFieldLabel.bind(this);
        this.getFormValidationRules = this.getFormValidationRules.bind(this);
        this.getCrudItemTypeKey = this.getCrudItemTypeKey.bind(this);
    }

    isQuestionType() {
        return this.props.crudItemType === C.components.QnACrudItemComponent.crudItemTypes.question;
    }

    isAnswerType() {
        return this.props.crudItemType === C.components.QnACrudItemComponent.crudItemTypes.answer;
    }

    componentDidMount() {
        this.initFormData().then();
    }

    async initFormData() {

        const fields = this.formConfig[this.getCrudItemTypeKey()].fields;
        const defaultValues = {};
        _.each(Object.keys(fields), (fieldName) => {
            defaultValues[fieldName] = fields[fieldName].defaultVal;
        });
        this.stateUtil.setFormValues(this, defaultValues);

        if (this.isQuestionType()) {
            this.initQuestionFormData();
        } else if (this.isAnswerType()) {
            this.initAnswerFormData();
        }
    }

    async initQuestionFormData() {
        let teamTags = [];
        if (this.props.specificData) {
            teamTags = this.props.specificData.tags
        } else {
            teamTags = await API.fetchTeamTags(false, this.props.teamId);
        }
        const teamTagChoices = _.map(teamTags, (tag) => {
            return {key: tag.id, text: tag.name, value: tag.id}
        });
        this.stateUtil.setFormMeta(this, 'questionTags', teamTagChoices);
    }

    async initAnswerFormData() {

    }

    onFormChange(validationErrors) {
        this.stateUtil.setFormErrors(this, validationErrors)
    }

    async deleteCrudItem() {
        const crudItemId = this.props.crudItem.id;
        if (crudItemId) {
            this.stateUtil.closeDeleteCrudItemModal(this);
            const deleteCrudItemApiFunc = `delete${this.props.crudItemType}`;
            let deletedCrudItemId = await API[deleteCrudItemApiFunc](false, crudItemId);
            if (Utils.strings.numStrComp(crudItemId, deletedCrudItemId)) {
                toasts.showToast(C.messages.deleteSuccess);
            } else {
                toasts.showToast(C.messages.error, 'error');
            }
            loader.hide();
            if (this.isQuestionType()) {
                Utils.redirectAfterMills(`/teams/${this.props.crudItem.team}`, 1000);
            } else if (this.isAnswerType()) {
                this.props.onDeleteCallback(crudItemId);
            }
        }
    }

    async onFormSubmit(validationErrors) {
        this.stateUtil.setIsFormBusy(this, true);
        if (_.isEmpty(validationErrors)) {
            let savedCrudItem;
            if (this.stateUtil.isEditMode(this)) {
                savedCrudItem = await API[`update${this.props.crudItemType}`](false, this.props.crudItem.id, this.stateUtil.getFormValues(this));
            } else {
                let newCrudItemData;
                if (this.isQuestionType()) {
                    newCrudItemData = {...this.stateUtil.getFormValues(this), team: this.props.teamId};
                } else if (this.isAnswerType()) {
                    newCrudItemData = {...this.stateUtil.getFormValues(this), question: this.props.questionId};
                }
                savedCrudItem = await API[`add${this.props.crudItemType}`](false, newCrudItemData);
            }
            this.afterCrudItemSave(savedCrudItem);
        } else {
            this.stateUtil.setFormErrors(this, validationErrors);
        }
        this.stateUtil.setIsFormBusy(this, false);
    }

    async afterCrudItemSave(savedCrudItem) {
        if (savedCrudItem && savedCrudItem.id) {
            await this.props.onSaveCallback(savedCrudItem);
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

    onCrudItemEditCancel() {
        if (this.props.onCrudItemEditCancel) {
            this.props.onCrudItemEditCancel();
        } else {
            this.stateUtil.setToViewMode(this);
        }
    }

    getCrudItemTypeKey() {
        return this.props.crudItemType.toLowerCase();
    }

    getFormFieldName(fieldNameConfigKey) {
        return this.formConfig[this.getCrudItemTypeKey()].fields[fieldNameConfigKey].name
    }

    getFormFieldLabel(fieldNameConfigKey) {
        return this.formConfig[this.getCrudItemTypeKey()].fields[fieldNameConfigKey].label
    }

    getFormValidationRules() {
        return this.formConfig[this.getCrudItemTypeKey()].validationRules;
    }

    render() {

        const isAddMode = this.stateUtil.isAddMode(this);
        const crudItem = isAddMode ? {} : this.props.crudItem;
        const detailed = this.props.detailed;

        let crudItemUrl = '';
        if (this.isQuestionType()) {
            crudItemUrl = !detailed ? `/teams/${this.props.teamId}/questions/${crudItem.id}` : '';
        }

        const content = detailed ? crudItem.content : Utils.strEllipsis(crudItem.content, C.components.QnACrudItemComponent.content_max_len);
        const subTitle = detailed ? crudItem.sub_title : Utils.strEllipsis(crudItem.sub_title, C.components.QnACrudItemComponent.sub_content_max_len);
        const crudItemTimeStr = `${Utils.datetime.todatetime(crudItem.created_at)}`;
        const isEditMode = this.stateUtil.isEditMode(this);
        const isCommentFormBusy = this.stateUtil.getIsFormBusy(this);
        const isFormEditable = (isEditMode && crudItem.can_update) || isAddMode;

        let crudItemStats = <QnACrudItemStatsComponent crudItem={crudItem} crudItemType={this.props.crudItemType}/>;
        let crudItemName = '';
        let crudItemSubTitle = '';
        let questionTags = '';

        if (this.isQuestionType()) {
            crudItemName = <Item.Header key={'q_name'} as='a' href={crudItemUrl}>{crudItem.name}</Item.Header>;
            crudItemSubTitle = <Item.Meta key={'q_sub_title'}><span>{subTitle}</span></Item.Meta>;
            questionTags = <QnAQuestionTagsComponent key={'q_tags'} tags={crudItem.tag_details}/>;
        }

        let userDetails = <QnAUserDetailsComponent user={crudItem.owner} datetime={crudItemTimeStr}/>;
        let crudItemContent = <Item.Description key={'q_content'}>
            <QnAMarkDownComponent source={content}/>
        </Item.Description>;

        let crudItemSubComponents = [crudItemName, crudItemSubTitle, crudItemContent, questionTags];

        if (isFormEditable) {
            crudItemStats = '';
            userDetails = '';

            if (this.isQuestionType()) {
                crudItemName = <Form.Field key={'q_name'} control={Input} label={this.getFormFieldLabel('name')}
                                           className={styles.crudItemNameInput} size={'small'}
                                           name={this.getFormFieldName('name')}
                                           onChange={this.onFormFieldChange}
                                           value={this.stateUtil.getFormFieldValue(this, this.getFormFieldName('name'))}
                                           error={this.stateUtil.getFormFieldErrors(this, this.getFormFieldName('name'))}
                />;

                crudItemSubTitle = <Item.Meta key={'q_sub_title'}>
                    <Form.Field control={Input} label={this.getFormFieldLabel('sub_title')}
                                className={styles.crudItemSubTitleInput} size={'small'}
                                name={this.getFormFieldName('sub_title')}
                                onChange={this.onFormFieldChange}
                                value={this.stateUtil.getFormFieldValue(this, this.getFormFieldName('sub_title'))}
                                error={this.stateUtil.getFormFieldErrors(this, this.getFormFieldName('sub_title'))}
                    />
                </Item.Meta>;

                questionTags = <Dropdown key={'q_tags_dropdown'} fluid multiple search selection onChange={this.onFormFieldChange}
                                         placeholder={this.getFormFieldLabel('tags')}
                                         name={this.getFormFieldName('tags')}
                                         value={this.stateUtil.getFormFieldValue(this, this.getFormFieldName('tags'))}
                                         error={this.stateUtil.getFormFieldErrors(this, this.getFormFieldName('tags'))}
                                         options={this.stateUtil.getFormMeta(this, 'questionTags')}
                />;
            }


            crudItemContent = <Item.Description key={'q_content'}>
                <Divider horizontal>{`${this.props.crudItemType}`}</Divider>
                <Form.Field control={TextArea} rows={12} name={this.getFormFieldName('content')} onChange={this.onFormFieldChange}
                            value={this.stateUtil.getFormFieldValue(this, this.getFormFieldName('content'))}
                            error={this.stateUtil.getFormFieldErrors(this, this.getFormFieldName('content'))}
                />
            </Item.Description>;

            crudItemSubComponents = <QnAValidatableFormComponent onChange={this.onFormChange} onSubmit={this.onFormSubmit}
                                                                 validationRules={this.getFormValidationRules()}
                                                                 formData={this.stateUtil.getFormValues(this)}
                                                                 formStateFlag={this.stateUtil.getFormStateFlag(this)}
                                                                 noValidateOnMount={this.props.noFormValidationOnMount}>
                {crudItemName}
                {crudItemSubTitle}
                {crudItemContent}
                <Item.Extra> {questionTags} </Item.Extra>
                <Item.Extra>
                    <div hidden={!(isFormEditable)} className={styles.formButtonGroup}>
                        <Button.Group>
                            <Button type={'button'} onClick={this.onCrudItemEditCancel}>Cancel</Button>
                            <Button.Or/>
                            <Button loading={isCommentFormBusy} disabled={isCommentFormBusy} positive>Save</Button>
                        </Button.Group>
                    </div>
                </Item.Extra>
                <QnAMarkDownComponent source={this.stateUtil.getFormFieldValue(this, this.getFormFieldName('content'))}/>
            </QnAValidatableFormComponent>
        }

        let crudItemEditAction = crudItem.can_update ? <Comment.Action onClick={() => this.stateUtil.setToEditMode(this)}>Edit</Comment.Action> : '';
        let crudItemDeleteAction = crudItem.can_delete ?
            <Comment.Action onClick={() => this.stateUtil.openDeleteCrudItemModal(this)}>Delete</Comment.Action> : '';

        return (
            <Item className={detailed ? '' : styles.crudItemItem}>
                {crudItemStats}
                <Item.Content className={detailed ? styles.crudItemItemContent : ''}>
                    {crudItemSubComponents}
                    <Item.Extra>
                        {userDetails}
                    </Item.Extra>
                    <Comment.Group hidden={(isFormEditable) || !detailed} className={styles.crudItemActions}>
                        <Comment>
                            <Comment.Content>
                                <Comment.Actions>
                                    {crudItemEditAction}
                                    {crudItemDeleteAction}
                                </Comment.Actions>
                            </Comment.Content>
                        </Comment>
                    </Comment.Group>
                </Item.Content>
                <Confirm
                    content={`Delete the ${this.props.crudItemType}?`}
                    open={this.state.deleteCrudItemModal.open}
                    onCancel={() => this.stateUtil.closeDeleteCrudItemModal(this)}
                    onConfirm={this.deleteCrudItem}
                    size='mini'
                />
            </Item>
        );
    }

}