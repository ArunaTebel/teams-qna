import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css'
import _ from 'lodash'
import {toast} from 'react-toastify';

export default function App({Component, pageProps}) {
    toast.configure({
        position: "top-center",
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });
    return <Component {...pageProps} />
}