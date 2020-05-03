import React, {Component} from 'react';
import {Feed, Label} from "semantic-ui-react";
import Utils from "../../util/utils";

class ActivityLogListItemRendererComponent extends Component {
    render() {
        const activityLog = this.props.item;
        return (
            <Feed.Event>
                <Feed.Label image={`/img/test-data/${activityLog.data.log.params.current_user_data.avatar}.jpg`}/>
                <Feed.Content>
                    <Feed.Date content={Utils.datetime.todatetime(activityLog.timestamp)}/>
                    <Feed.Summary>
                        <Label as='a' color='teal' size={'mini'}>
                            {activityLog.type}
                        </Label>
                    </Feed.Summary>
                    <a href={this.props.options.getHrefForListItem(activityLog)}>
                        <Feed.Extra text style={{'cursor': 'pointer'}}>
                            {this.props.options.logFormatter ? this.props.options.logFormatter(activityLog) : activityLog.message}
                        </Feed.Extra>
                    </a>
                </Feed.Content>
            </Feed.Event>
        );
    }
}

export default ActivityLogListItemRendererComponent;