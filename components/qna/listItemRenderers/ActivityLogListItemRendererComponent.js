import React, {Component} from 'react';
import {Feed, Label} from "semantic-ui-react";
import Utils from "../../util/utils";
import QnAUserAvatarComponent from "../QnAUserAvatarComponent";

class ActivityLogListItemRendererComponent extends Component {

    constructor(props) {
        super(props);
        this.activityLogFormatter = this.activityLogFormatter.bind(this);
    }

    activityLogFormatter(activityLog) {
        const currentUser = activityLog.data.log.params.current_user_data;
        const loggedInUser = this.props.options.currentUser;
        if (currentUser && loggedInUser && Utils.strings.numStrComp(currentUser.id, loggedInUser.id)) {
            activityLog.message = activityLog.data.log.message.replace('{current_user}', 'You').replace('{question_name}', activityLog.data.log.params.question_name);
            activityLog.data.log.params.current_user_data = loggedInUser;
        }
        return activityLog;
    }

    render() {
        const activityLog = this.activityLogFormatter(this.props.item);
        return (
            <Feed.Event>

                <Feed.Label>
                    <QnAUserAvatarComponent user={activityLog.data.log.params.current_user_data}/>
                </Feed.Label>
                <Feed.Content>
                    <Feed.Date content={Utils.datetime.todatetime(activityLog.timestamp)}/>
                    <Feed.Summary>
                        <Label as='a' color='teal' size={'mini'}>
                            {activityLog.type}
                        </Label>
                    </Feed.Summary>
                    <a href={this.props.options.getHrefForListItem(activityLog)}>
                        <Feed.Extra text style={{'cursor': 'pointer'}}>
                            {activityLog.message}
                        </Feed.Extra>
                    </a>
                </Feed.Content>
            </Feed.Event>
        );
    }
}

export default ActivityLogListItemRendererComponent;