import React, {Component} from 'react'
import styles from './styles/QnAHorizontalLoaderComponent.module.scss'
import {Progress} from "semantic-ui-react";
import C from "../util/consts";
import EE from "../util/EventEmitter";

export default class QnAHorizontalLoaderComponent extends Component {

    state = {
        show: false
    };

    constructor(props) {
        super(props);
        EE.subscribe(C.components.QnAHorizontalLoaderComponent.events.loading, (show) => this.setState({show: show}));
    }

    render() {
        return (
            <div hidden={!this.state.show} className={styles.progressBar}>
                <Progress percent={100} active color='teal' size='tiny'/>
            </div>
        );
    }
}