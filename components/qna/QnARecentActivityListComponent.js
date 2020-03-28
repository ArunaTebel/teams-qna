import React, {Component} from 'react'
import {Card, Feed} from 'semantic-ui-react'
import styles from './styles/QnARecentActivityListComponent.module.scss'
import C from "../util/consts";
import QnAFluidParagraphPlaceholderListComponent from "./placeholders/QnAFluidParagraphPlaceholderListComponent";
import QnAHttp from './../util/QnAHttp';

export default class QnARecentActivityListComponent extends Component {
    state = {activityLogs: []};

    async componentDidMount() {
        const activityLogsResponses = await QnAHttp.getBatch([C.API_BASE + '/activity-logs']);
        this.setState({
            activityLogs: await activityLogsResponses[0].json()
        });
    }

    render() {

        let activityLogs;

        if (this.state.activityLogs.length === 0) {
            activityLogs = <QnAFluidParagraphPlaceholderListComponent/>
        } else {
            activityLogs = this.state.activityLogs.map((activityLog, idx) => {
                return (
                    <Feed.Event key={idx}>
                        <Feed.Label image={`/img/test-data/${activityLog.user.avatar}.jpg`}/>
                        <Feed.Content>
                            <Feed.Date content={activityLog.created_at.split('T')[0]}/>
                            <Feed.Summary>
                                {activityLog.log}
                            </Feed.Summary>
                        </Feed.Content>
                    </Feed.Event>
                );
            });
        }

        return (
            <Card>
                <Card.Content>
                    <Card.Header>Recent Activity</Card.Header>
                </Card.Content>
                <Card.Content className={styles.recentActivityCardContent}>
                    <Feed>
                        {activityLogs}
                    </Feed>
                </Card.Content>
            </Card>
        );
    }
}