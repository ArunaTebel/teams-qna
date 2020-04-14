import C from "../../util/consts";
import _ from "lodash";

export default class QnACrudItemComponentStateUtil {

    compConfig = C.components.QnACrudItemComponent;

    setFormMeta(comp, metadataName, metadata) {
        comp.setState((prevState) => {
            const nextState = prevState;
            nextState.crudItemEditForm.metadata[metadataName] = metadata;
            return nextState;
        });
    }

    getFormMeta(comp, metadataName) {
        return comp.state.crudItemEditForm.metadata[metadataName];
    }

    getFormFieldValue(comp, fieldName) {
        return comp.state.crudItemEditForm.values[fieldName];
    }

    setFormFieldValue(comp, fieldName, value) {
        comp.setState((prevState) => {
            const nextState = prevState;
            nextState.crudItemEditForm.values[fieldName] = value;
            return nextState;
        });
    }

    getFormStateFlag(comp) {
        return comp.state.crudItemEditForm.stateFlag;
    }

    setFormStateFlag(comp, formStateFlag) {
        comp.setState((prevState) => {
            const nextState = prevState;
            nextState.crudItemEditForm.stateFlag = formStateFlag;
            return nextState;
        });
    }

    getFormFieldErrors(comp, fieldName) {
        return comp.state.crudItemEditForm.errors[fieldName];
    }

    setFormFieldErrors(comp, fieldName, errors) {
        comp.setState((prevState) => {
            const nextState = prevState;
            nextState.crudItemEditForm.errors[fieldName] = errors;
            return nextState;
        });
    }

    setToEditMode(comp) {
        comp.setState((prevState) => {
            const nextState = prevState;
            nextState.mode = this.compConfig.modes.edit;
            if (comp.props.crudItem && comp.props.crudItem.id) {
                const fields = this.compConfig.formConfig[comp.props.crudItemType.toLowerCase()].fields;
                const formValues = {};
                _.each(Object.keys(fields), (fieldName) => {
                    formValues[fieldName] = fields[fieldName].getValueFromObj(comp.props.crudItem);
                });
                nextState.crudItemEditForm.values = formValues;
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

    isAddMode(comp) {
        return comp.state.mode === this.compConfig.modes.add;
    }

    setFormErrors(comp, errors) {
        comp.setState((prevState) => {
            const nextState = prevState;
            nextState.crudItemEditForm.errors = errors;
            return nextState;
        });
    }

    setIsFormBusy(comp, isBusy) {
        comp.setState((prevState) => {
            const nextState = prevState;
            nextState.crudItemEditForm.isBusy = isBusy;
            return nextState;
        });
    }

    getIsFormBusy(comp) {
        return comp.state.crudItemEditForm.isBusy;
    }

    getFormValues(comp) {
        return comp.state.crudItemEditForm.values;
    }

    setFormValues(comp, values) {
        comp.setState((prevState) => {
            const nextState = prevState;
            nextState.crudItemEditForm.values = values;
            return nextState;
        });
    }

    closeDeleteCrudItemModal(comp) {
        comp.setState((prevState) => {
            const nextState = prevState;
            nextState.deleteCrudItemModal.open = false;
            return nextState;
        });
    }

    openDeleteCrudItemModal(comp) {
        comp.setState((prevState) => {
            const nextState = prevState;
            nextState.deleteCrudItemModal.open = true;
            return nextState;
        });
    }
}