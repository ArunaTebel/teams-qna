import React, {Component} from 'react'
import {Label} from 'semantic-ui-react'
import styles from './styles/QnAQuestionTagsComponent.module.scss'

export default class QnAQuestionTagsComponent extends Component {

    render() {

        const tags = this.props.tags.map((tag, idx) => {
            //TODO: Fix the icon issue from the backend properly
            return (
                <div key={idx} className={styles.questionTags}>

                    {/*<Label className={styles.questionTag} icon={tag.icon} content={tag.name.toUpperCase()}/>*/}
                    <Label className={styles.questionTag} content={tag.name.toUpperCase()}/>
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