import React, {Component} from 'react'
import {Feed, Label} from 'semantic-ui-react'
import QnAFluidParagraphPlaceholderListComponent from "./placeholders/QnAFluidParagraphPlaceholderListComponent";
import commons from "../../utils/commons";
import Utils from "../util/utils";

export default class QnAActivityLogListComponent extends Component {

    pollIntervalId = 0;
    pollCount = 0;
    maxPollCount = 200;

    constructor(props) {
        super(props);
        this.state = {
            activityLogs: [],
            loading: true,
            total: 0,
            limit: this.props.limit ? this.props.limit : 10,
            offset: this.props.offset ? this.props.offset : 0,
            next: null,
            filters: this.props.filters ? this.props.filters : {}
        };
        this.getUriParams = this.getUriParams.bind(this);
        this.fetchActivityLogs = this.fetchActivityLogs.bind(this);
        this.pollLogs = this.pollLogs.bind(this);
        this.updateStateForActivityLogResponse = this.updateStateForActivityLogResponse.bind(this);
    }


    async componentDidMount() {
        this.fetchActivityLogs();
        if (this.props.autoPoll) {
            this.pollLogs();
        }
    }

    componentWillUnmount() {
        clearInterval(this.pollIntervalId);
    }

    pollLogs() {
        const activityLogFetcher = this.props.fetcher;
        if (typeof activityLogFetcher === 'function') {

            this.pollIntervalId = setInterval(async () => {
                this.pollCount++;
                if (this.pollCount > this.maxPollCount) {
                    clearInterval(this.pollIntervalId);
                }
                const filters = commons.UriToJson(this.getUriParams());
                filters['offset'] = 0;
                filters['limit'] = this.state.activityLogs.length;
                const activityLogsResponse = await activityLogFetcher(commons.jsonToUri(filters));
                if (activityLogsResponse && activityLogsResponse.count > this.state.total) {
                    this.updateStateForActivityLogResponse(activityLogsResponse, true);
                }
            }, this.props.autoPoll.frequency);
        }
    }

    async fetchActivityLogs() {
        const activityLogFetcher = this.props.fetcher;
        if (typeof activityLogFetcher === 'function') {
            const activityLogsResponse = await activityLogFetcher(this.getUriParams());
            this.updateStateForActivityLogResponse(activityLogsResponse);
        }
    }

    updateStateForActivityLogResponse(activityLogsResponse, polling = false) {
        this.setState((prevState) => {
            const nextState = prevState;
            if (polling) {
                nextState.activityLogs = activityLogsResponse.results;
            } else {
                nextState.activityLogs = prevState.activityLogs.concat(activityLogsResponse.results);
            }
            nextState.total = activityLogsResponse.count;
            nextState.next = activityLogsResponse.next;
            if (activityLogsResponse.next) {
                nextState.offset = nextState.activityLogs.length;
            }
            nextState.loading = false;
            return nextState;
        });
    }

    getUriParams() {
        const uriParams = this.state.filters;
        uriParams['limit'] = this.state.limit;
        uriParams['offset'] = this.state.offset;
        return commons.jsonToUri(uriParams)
    }

    render() {

        let activityLogs;

        if (this.state.loading) {
            activityLogs = <QnAFluidParagraphPlaceholderListComponent/>
        } else {
            activityLogs = this.state.activityLogs.map((activityLog, idx) => {
                return (
                    <Feed.Event key={idx}>
                        <Feed.Label image={`/img/test-data/${activityLog.data.log.params.current_user_data.avatar}.jpg`}/>
                        <Feed.Content>
                            <Feed.Date content={Utils.datetime.todatetime(activityLog.timestamp)}/>
                            <Feed.Summary>
                                <Label as='a' color='teal' size={'mini'}>
                                    {activityLog.type}
                                </Label>
                            </Feed.Summary>
                            <a href={this.props.getHrefForListItem(activityLog)}>
                                <Feed.Extra text style={{'cursor': 'pointer'}}>
                                    {activityLog.message}
                                </Feed.Extra>
                            </a>
                        </Feed.Content>
                    </Feed.Event>
                );
            });

            if (this.state.next) {
                activityLogs.push(
                    <Feed.Event key={'nextLink'}>
                        <Feed.Label/>
                        <Feed.Content>
                            <Feed.Extra text>
                                <a onClick={this.fetchActivityLogs}>{`Load more...`}</a>
                            </Feed.Extra>
                        </Feed.Content>
                    </Feed.Event>
                )
            }

        }

        return (
            <Feed>
                {activityLogs}
            </Feed>
        );
    }
}