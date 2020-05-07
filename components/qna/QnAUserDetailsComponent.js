import React, {Component} from 'react'
import {Comment, Icon, Image} from 'semantic-ui-react'
import styles from './styles/QnAUserDetailsComponent.module.scss'
import QnAUserAvatarComponent from "./QnAUserAvatarComponent";
import utils from "../util/utils";

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
        const className = this.props.className ? this.props.className : styles.userContainer;
        return (
            <Comment.Group className={className}>
                <Comment>
                    {dateTimeTag}
                    <Image className={styles.userImage}>
                        <QnAUserAvatarComponent user={user}/>
                    </Image>
                    <Comment.Content className={styles.userDetailsContent}>
                        <Comment.Author>{utils.strEllipsis(user.full_name, 20)}</Comment.Author>
                        <Comment.Metadata>
                            <Icon name='star'/>{user.rating}
                        </Comment.Metadata>
                    </Comment.Content>
                </Comment>
            </Comment.Group>
        );
    }

}