import React, {Component} from 'react'
import styles from './styles/QnAMainContentComponent.module.scss'

export default class QnAMainContentComponent extends Component {

    render() {

        return (
            <div className={styles.mainContainer}>
                {this.props.children}
            </div>
        )
    }
}
