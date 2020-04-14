import React, {Component} from 'react'
import {Form} from 'semantic-ui-react'
import validate from "validate.js";

class QnAValidatableFormComponent extends Component {

    constructor(props) {
        super(props);
        this.validateForm = this.validateForm.bind(this);
    }

    componentDidMount() {
        if (this.props.formData !== '' && !this.props.noValidateOnMount) {
            this.validateForm();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.formStateFlag !== prevProps.formStateFlag) {
            this.validateForm();
        }
    }

    validateForm(submit = false) {
        const rules = this.props.validationRules;
        const validatableFormValues = this.props.formData;
        const parentHandler = submit ? this.props.onSubmit : this.props.onChange;
        const validationErrors = this.validate(validatableFormValues, rules);
        if (typeof parentHandler === 'function') {
            parentHandler(validationErrors);
        }
    }

    validate(values, rules) {
        let errorMessages = {};
        const validationErrors = validate(values, rules);
        _.each(validationErrors, (messages, elemName) => {
            errorMessages[elemName] = {content: messages.join(' '), pointing: 'above'};
        });

        return errorMessages;
    }

    render() {
        return <Form onSubmit={() => this.validateForm(true)}>
            {this.props.children}
        </Form>
    }

}

export default QnAValidatableFormComponent;
