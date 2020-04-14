import {toast} from "react-toastify";

export default {
    showToast(message, type = 'success', options = {}) {
        if (type === 'success') {
            toast.success(message);
        } else if (type === 'error') {
            toast.error(message);
        } else {
            toast(message);
        }
    }
}