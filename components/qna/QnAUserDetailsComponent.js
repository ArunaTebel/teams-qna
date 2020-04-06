import React, {Component} from 'react'
import {Comment, Icon} from 'semantic-ui-react'
import styles from './styles/QnAUserDetailsComponent.module.scss'

export default class QnAUserDetailsComponent extends Component {

    render() {

        const user = this.props.user;

        return (
            <Comment.Group className={styles.userContainer}>
                <Comment>
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