import React, {Component} from "react";
import QnAValidatableFormComponent from "./QnAValidatableFormComponent";
import {Button, Divider, Dropdown, Form, Grid, Icon, Input, Item} from "semantic-ui-react";
import _ from "lodash";
import QnAQuestionSearchFormComponentStateUtil from "./stateutils/QnAQuestionSearchFormComponentStateUtil";

class QnAQuestionSearchFormComponent extends Component {

    stateUtil = new QnAQuestionSearchFormComponentStateUtil();

    constructor(props) {
        super(props);
        this.onFormFieldChange = this.onFormFieldChange.bind(this);
        this.onSearchFormSubmit = this.onSearchFormSubmit.bind(this);
        this.onSearchFormReset = this.onSearchFormReset.bind(this);
        const initialTags = props.initialValues.tags ? _.map(props.initialValues.tags.split(','), (tagId) => parseInt(tagId, 10)) : [];
        this.state = {
            searchForm: {
                values: {
                    content: props.initialValues.content,
                    tags: initialTags,
                },
                stateFlag: true
            }
        };

    }

    onFormFieldChange(event, element) {
        this.stateUtil.setFormStateFlag(this, !this.stateUtil.getFormStateFlag(this));
        this.stateUtil.setFormFieldValue(this, element.name, element.value);
    }

    onSearchFormSubmit() {
        this.props.onSearchFormSubmit(this.stateUtil.getFormValues(this));
    }

    onSearchFormReset() {
        this.stateUtil.setFormFieldValues(this, {content: '', tags: []});
        this.props.onSearchFormReset();
    }

    render() {

        const teamTagChoices = _.map(this.props.tags, (tag) => {
            return {key: tag.id, text: tag.name, value: tag.id}
        });
        console.log(this.stateUtil.getFormFieldValue(this, 'tags'));

        return (
            <Grid style={{width: '100%'}}>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <h4>Search Questions</h4>
                        <QnAValidatableFormComponent
                            onChange={() => {
                            }}
                            onSubmit={this.onSearchFormSubmit}
                            validationRules={{}}
                            searchForm={{}}
                            formStateFlag={true}
                            noValidateOnMount={true}>

                            <Form.Field
                                placeholder={'Title, sub title or content should contain ...'}
                                control={Input}
                                onChange={this.onFormFieldChange}
                                value={this.stateUtil.getFormFieldValue(this, 'content')}
                                name={'content'}
                            />

                            <Dropdown fluid multiple search selection
                                      placeholder={'Search by Tags'}
                                      name={'tags'}
                                      onChange={this.onFormFieldChange}
                                      value={this.stateUtil.getFormFieldValue(this, 'tags')}
                                      options={teamTagChoices}
                            />
                            <Item.Extra>
                                <Button basic color={'green'} size={'mini'}><Icon name='search'/>Search</Button>
                                <Button basic size={'mini'} onClick={this.onSearchFormReset}>Reset</Button>
                            </Item.Extra>
                            <Divider/>
                        </QnAValidatableFormComponent>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }

}

export default QnAQuestionSearchFormComponent;