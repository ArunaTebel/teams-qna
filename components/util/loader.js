import EE from "./EventEmitter";
import C from "./consts";

export default {

    show: function () {
        EE.dispatch(C.components.QnAHorizontalLoaderComponent.events.loading, true);
    },

    hide: function () {
        EE.dispatch(C.components.QnAHorizontalLoaderComponent.events.loading, false);
    }

}