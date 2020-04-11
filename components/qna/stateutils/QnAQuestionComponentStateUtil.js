import C from "../../util/consts";

export default class QnAQuestionComponentStateUtil {

    compConfig = C.components.QnAQuestionComponent;

    setFormMeta(comp, metadataName, metadata) {
        comp.setState((prevState) => {
            const nextState = prevState;
            nextState.questionEditForm.metadata[metadataName] = metadata;
            return nextState;
        });
    }

    getFormMeta(comp, metadataName) {
        return comp.state.questionEditForm.metadata[metadataName];
    }

    getFormFieldValue(comp, fieldName) {
        return comp.state.questionEditForm.values[fieldName];
    }

    setFormFieldValue(comp, fieldName, value) {
        comp.setState((prevState) => {
            const nextState = prevState;
            nextState.questionEditForm.values[fieldName] = value;
            return nextState;
        });
    }

    getFormStateFlag(comp) {
        return comp.state.questionEditForm.stateFlag;
    }

    setFormStateFlag(comp, formStateFlag) {
        comp.setState((prevState) => {
            const nextState = prevState;
            nextState.questionEditForm.stateFlag = formStateFlag;
            return nextState;
        });
    }


    getFormFieldErrors(comp, fieldName) {
        return comp.state.questionEditForm.errors[fieldName];
    }

    setFormFieldErrors(comp, fieldName, errors) {
        comp.setState((prevState) => {
            const nextState = prevState;
            nextState.questionEditForm.errors[fieldName] = errors;
            return nextState;
        });
    }

    setToEditMode(comp) {
        comp.setState((prevState) => {
            const nextState = prevState;
            nextState.mode = this.compConfig.modes.edit;
            if (comp.props.question && comp.props.question.id) {
                nextState.questionEditForm.values[this.compConfig.formConfig.fields.id.name] = comp.props.question.id;
                nextState.questionEditForm.values[this.compConfig.formConfig.fields.name.name] = comp.props.question.name;
                nextState.questionEditForm.values[this.compConfig.formConfig.fields.sub_title.name] = comp.props.question.sub_title;
                nextState.questionEditForm.values[this.compConfig.formConfig.fields.content.name] = comp.props.question.content;
                nextState.questionEditForm.values[this.compConfig.formConfig.fields.tags.name] = _.map(comp.props.question.tags, (tag) => tag.id);
            }
            return nextState;
        });
    };

    setToViewMode(comp) {
        comp.setState((prevState) => {
            const nextState = prevState;
            nextState.mode = this.compConfig.modes.view;
            return nextState;
        });
    }

    isEditMode(comp) {
        return comp.state.mode === this.compConfig.modes.edit;
    }

    setFormErrors(comp, errors) {
        comp.setState((prevState) => {
            const nextState = prevState;
            nextState.questionEditForm.errors = errors;
            return nextState;
        });
    }

    setIsFormBusy(comp, isBusy) {
        comp.setState((prevState) => {
            const nextState = prevState;
            nextState.questionEditForm.isBusy = isBusy;
            return nextState;
        });
    }

    getFormValues(comp) {
        return comp.state.questionEditForm.values;
    }

}