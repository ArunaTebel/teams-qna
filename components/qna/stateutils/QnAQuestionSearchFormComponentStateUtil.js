import C from "../../util/consts";
import _ from "lodash";

export default class QnAQuestionSearchFormComponentStateUtil {

    setFormStateFlag(comp, formStateFlag) {
        comp.setState((prevState) => {
            const nextState = prevState;
            nextState.searchForm.stateFlag = formStateFlag;
            return nextState;
        });
    }

    setFormFieldValue(comp, fieldName, value) {
        comp.setState((prevState) => {
            const nextState = prevState;
            nextState.searchForm.values[fieldName] = value;
            return nextState;
        });
    }

    getFormFieldValue(comp, fieldName) {
        return comp.state.searchForm.values[fieldName];
    }

    getFormValues(comp) {
        return comp.state.searchForm.values;
    }

    getFormStateFlag(comp) {
        return comp.state.searchForm.stateFlag;
    }
}