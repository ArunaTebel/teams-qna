import React, {Component} from 'react';
import {Feed, Icon, Label} from "semantic-ui-react";
import Utils from "../../util/utils";

class QuestionListItemRendererComponent extends Component {
    render() {
        const question = this.props.item;
        return (
            <Feed.Event>
                <Feed.Content>
                    <Feed.Summary>
                        <a href={`/teams/${question.team}/questions/${question.id}`}>{question.name}</a>
                    </Feed.Summary>

                    <Feed.Summary>
                        <Label color='green' size={'tiny'}>
                            {question.answer_count} Answers
                        </Label>
                        <Label size={'tiny'}>
                            {question.views} Views
                        </Label>
                        <Label color='blue' size={'tiny'}>
                            {question.up_votes} <Icon name='arrow up'/>
                        </Label>
                        <Label color='red' size={'tiny'}>
                            {question.down_votes} <Icon name='arrow down'/>
                        </Label>
                        <Feed.Date content={`Asked ${Utils.datetime.todatetime(question.created_at)}`}/>
                        <Feed.Date content={`Updated ${Utils.datetime.todatetime(question.updated_at)}`}/>
                    </Feed.Summary>

                    <Feed.Extra text>
                        {Utils.strEllipsis(question.content, 100)}
                    </Feed.Extra>

                    <Feed.Extra text>
                    </Feed.Extra>
                </Feed.Content>
            </Feed.Event>);
    }
}

export default QuestionListItemRendererComponent;