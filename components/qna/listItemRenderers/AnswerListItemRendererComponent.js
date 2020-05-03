import React, {Component} from 'react';
import {Feed, Icon, Label} from "semantic-ui-react";
import Utils from "../../util/utils";

class AnswerListItemRendererComponent extends Component {
    render() {
        const answer = this.props.item;
        return (
            <Feed.Event>
                <Feed.Content>
                    <Feed.Summary>
                        <a href={`/teams/${answer.team_id}/questions/${answer.question}`}>{answer.question_name}</a>
                    </Feed.Summary>

                    <Feed.Summary>
                        <Label color='blue' size={'tiny'}>
                            {answer.up_votes} <Icon name='arrow up'/>
                        </Label>
                        <Label color='red' size={'tiny'}>
                            {answer.down_votes} <Icon name='arrow down'/>
                        </Label>
                        <Feed.Date content={`Answered ${Utils.datetime.todatetime(answer.created_at)}`}/>
                        <Feed.Date content={`Updated ${Utils.datetime.todatetime(answer.updated_at)}`}/>
                    </Feed.Summary>

                    <Feed.Extra text>
                        {Utils.strEllipsis(answer.content, 200)}
                    </Feed.Extra>

                    <Feed.Extra text>
                    </Feed.Extra>
                </Feed.Content>
            </Feed.Event>);
    }
}

export default AnswerListItemRendererComponent;