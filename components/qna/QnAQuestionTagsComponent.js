import React, {Component} from 'react'
import {Label} from 'semantic-ui-react'
import styles from './styles/QnAQuestionTagsComponent.module.scss'

export default class QnAQuestionTagsComponent extends Component {

    render() {

        const tags = this.props.tags.map((tag, idx) => {
            return (
                <div key={idx} className={styles.questionTags}>
                    <Label className={styles.questionTag} icon={tag.icon} content={tag.name.toUpperCase()}/>
                </div>
            );
        });

        return (
            <div>
                {tags}
            </div>
        );

    }
}