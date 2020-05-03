import React, {Component} from 'react'
import {Feed} from 'semantic-ui-react'
import QnAFluidParagraphPlaceholderListComponent from "./placeholders/QnAFluidParagraphPlaceholderListComponent";
import commons from "../../utils/commons";
import _ from 'lodash';

export default class QnAListComponent extends Component {

    pollIntervalId = 0;
    pollCount = 0;
    maxPollCount = 200;

    DEFAULT_LIMIT = 10;
    DEFAULT_OFFSET = 0;
    INITIAL_STATE = {
        listItems: [],
        loading: true,
        total: 0,
        limit: this.props.limit ? this.props.limit : this.DEFAULT_LIMIT,
        offset: this.props.offset ? this.props.offset : this.DEFAULT_OFFSET,
        next: null,
        filters: this.props.filters ? this.props.filters : {}
    };

    constructor(props) {
        super(props);
        this.state = _.cloneDeep(this.INITIAL_STATE);
        this.getUriParams = this.getUriParams.bind(this);
        this.fetchListItems = this.fetchListItems.bind(this);
        this.pollLogs = this.pollLogs.bind(this);
        this.updateStateForlistItemResponse = this.updateStateForlistItemResponse.bind(this);
    }


    async componentDidMount() {
        this.fetchListItems();
        if (this.props.autoPoll) {
            this.pollLogs();
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (JSON.stringify(prevProps.filters) !== JSON.stringify(this.props.filters)) {
            const newState = _.cloneDeep(this.INITIAL_STATE);
            newState.filters = this.props.filters;
            this.setState(newState, async () => {
                await this.fetchListItems();
            });
            return true;
        }
        return false;
    }

    componentWillUnmount() {
        clearInterval(this.pollIntervalId);
    }

    pollLogs() {
        const listItemFetcher = this.props.fetcher;
        if (typeof listItemFetcher === 'function') {

            this.pollIntervalId = setInterval(async () => {
                this.pollCount++;
                if (this.pollCount > this.maxPollCount) {
                    clearInterval(this.pollIntervalId);
                }
                const filters = commons.UriToJson(this.getUriParams());
                filters['offset'] = 0;
                filters['limit'] = this.state.offset > this.DEFAULT_OFFSET ? (this.state.offset - this.DEFAULT_LIMIT + this.state.limit) : this.state.limit;
                const listItemsResponse = await listItemFetcher(commons.jsonToUri(filters));
                if (listItemsResponse && listItemsResponse.count > this.state.total) {
                    this.updateStateForlistItemResponse(listItemsResponse, true);
                }
            }, this.props.autoPoll.frequency);
        }
    }

    async fetchListItems() {
        const listItemFetcher = this.props.fetcher;
        if (typeof listItemFetcher === 'function') {
            const listItemsResponse = await listItemFetcher(this.getUriParams());
            this.updateStateForlistItemResponse(listItemsResponse);
        }
    }

    updateStateForlistItemResponse(listItemsResponse, polling = false) {
        this.setState((prevState) => {
            const nextState = prevState;
            const listItems = this.props.noPagination ? listItemsResponse : listItemsResponse.results;
            if (polling) {
                nextState.listItems = listItems;
            } else {
                nextState.listItems = prevState.listItems.concat(listItems);
            }
            nextState.total = this.props.noPagination ? listItems.length : listItemsResponse.count;

            if (!this.props.noPagination) {
                nextState.next = listItemsResponse.next;
                if (listItemsResponse.next) {
                    nextState.offset = nextState.listItems.length;
                }
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
        const ListItem = this.props.listItemRenderer.component;
        let listItems;

        if (this.state.loading) {
            listItems = <QnAFluidParagraphPlaceholderListComponent/>
        } else {
            listItems = this.state.listItems.map((listItem, idx) => {
                return (
                    <ListItem key={idx} item={listItem} options={this.props.listItemRenderer.props}/>
                );
            });

            if (this.state.next) {
                listItems.push(
                    <Feed.Event key={'nextLink'}>
                        <Feed.Label/>
                        <Feed.Content><Feed.Extra text><a onClick={this.fetchListItems}>{`Load more...`}</a></Feed.Extra></Feed.Content>
                    </Feed.Event>
                )
            }
        }

        return (
            <Feed>{listItems}</Feed>
        );
    }
}