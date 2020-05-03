import React, {Component} from 'react';
import {Feed, Icon, Label} from "semantic-ui-react";
import Utils from "../../util/utils";

class CommentListItemRendererComponent extends Component {
    render() {
        const comment = this.props.item;
        return (
            <Feed.Event>
                <Feed.Content>
                    <Feed.Summary>
                        <a href={`/teams/${comment.team_id}/questions/${comment.question_id}`}>{comment.question_name}</a>
                    </Feed.Summary>

                    <Feed.Summary>
                        <Feed.Date content={`Answered ${Utils.datetime.todatetime(comment.created_at)}`}/>
                        <Feed.Date content={`Updated ${Utils.datetime.todatetime(comment.updated_at)}`}/>
                    </Feed.Summary>

                    <Feed.Extra text>
                        {Utils.strEllipsis(comment.content, 200)}
                    </Feed.Extra>

                    <Feed.Extra text>
                    </Feed.Extra>
                </Feed.Content>
            </Feed.Event>);
    }
}

export default CommentListItemRendererComponent;
