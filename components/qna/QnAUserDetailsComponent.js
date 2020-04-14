import React, {Component} from 'react'
import {Comment, Icon} from 'semantic-ui-react'
import styles from './styles/QnAUserDetailsComponent.module.scss'

export default class QnAUserDetailsComponent extends Component {

    render() {

        const user = this.props.user;
        let dateTimeTag = '';
        if (this.props.datetime) {
            dateTimeTag = <Comment.Content>
                <Comment.Metadata>
                    {this.props.datetime}
                </Comment.Metadata>
            </Comment.Content>;
        }
        return (
            <Comment.Group className={styles.userContainer}>
                <Comment>
                    {dateTimeTag}
                    <Comment.Avatar as='a' src={`/img/test-data/${user.avatar}.jpg`}/>
                    <Comment.Content>
                        <Comment.Author>{user.full_name}</Comment.Author>
                        <Comment.Metadata>
                            <Icon name='star'/>{user.rating}
                        </Comment.Metadata>
                    </Comment.Content>
                </Comment>
            </Comment.Group>
        );
    }

}