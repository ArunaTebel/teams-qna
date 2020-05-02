import React, {Component} from 'react'
import {Grid, Item, Divider, Button, Label, Icon, Card} from 'semantic-ui-react'
import QnATeamDescriptionCardComponent from "./QnATeamDescriptionCardComponent";
import QnAActivityLogListComponent from "./QnAActivityLogListComponent";
import styles from './styles/QnAHomePageComponent.module.scss'
import QnAFluidParagraphPlaceholderListComponent from "./placeholders/QnAFluidParagraphPlaceholderListComponent";
import API from "../util/API";
import QnACrudItemComponent from "./QnACrudItemComponent";
import Router from 'next/router'
import C from "../util/consts";
import QnAPaginationComponent from "../commons/QnAPaginationComponent";
import QnAQuestionSearchFormComponent from "./QnAQuestionSearchFormComponent";
import commons from "../../utils/commons";
import _ from "lodash";

class QnATeamHomePageComponent extends Component {

    defaultSearchFilters = {page: 1, content: '', tags: '', unanswered: false};

    state = {
        questions: {totalCount: 0, currentList: [], currentPage: 1, unansweredCount: 0},
        searchQuery: '',
        tags: [],
        activityLogs: [],
        isLoading: true,
        searchForm: {
            show: false,
            filters: this.defaultSearchFilters
        }
    };

    constructor(props) {
        super(props);
        this.searchQuestions = this.searchQuestions.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.toggleSearchFormVisibility = this.toggleSearchFormVisibility.bind(this);
        this.shallowUpdateUri = this.shallowUpdateUri.bind(this);
        this.convertSearchFiltersToUri = this.convertSearchFiltersToUri.bind(this);
        this.onSearchFormSubmit = this.onSearchFormSubmit.bind(this);
        this.onSearchFormReset = this.onSearchFormReset.bind(this);
        this.onUnAnsweredFilterClick = this.onUnAnsweredFilterClick.bind(this);
        this.setFiltersAndSearch = this.setFiltersAndSearch.bind(this);
        this.isFiltered = this.isFiltered.bind(this);
    }


    async componentDidMount() {

        const teamTags = await API.fetchTeamTags(this.props.team.id);
        const urlParams = Router.query;

        this.setState((prevState) => {
            const nextState = prevState;
            nextState.isLoading = true;
            nextState.tags = teamTags;
            nextState.searchForm.filters = {
                page: urlParams.page ? urlParams.page : 1,
                content: urlParams.content ? urlParams.content : '',
                tags: urlParams.tags ? urlParams.tags : '',
                unanswered: urlParams.unanswered === 'true' ? urlParams.unanswered : false,
            };
            return nextState;
        }, this.searchQuestions);
    }

    setFiltersAndSearch(filters) {
        this.setState((prevState) => {
            const nextState = prevState;
            nextState.isLoading = true;
            nextState.searchForm.filters = {...nextState.searchForm.filters, ...filters};
            return nextState;
        }, this.searchQuestions);
    }

    onSearchFormSubmit(searchFormValues) {
        this.setFiltersAndSearch({
            page: 1,
            content: searchFormValues.content,
            tags: searchFormValues.tags && searchFormValues.tags.length > 0 ? searchFormValues.tags : ''
        });
    }

    onSearchFormReset() {
        this.setFiltersAndSearch(this.defaultSearchFilters);
    }

    onUnAnsweredFilterClick() {
        this.setFiltersAndSearch({
            page: 1,
            unanswered: !this.state.searchForm.filters.unanswered,
        });
    }

    async onPageChange(e, pageData) {
        this.setFiltersAndSearch({
            page: pageData.activePage,
        });
    }

    async searchQuestions() {
        const questionsResponse = await API.fetchTeamQuestions(this.props.team.id, `${this.convertSearchFiltersToUri()}`);
        this.setState((prevState) => {
            const nextState = prevState;
            nextState.isLoading = false;
            nextState.questions.totalCount = questionsResponse.count;
            nextState.questions.currentList = questionsResponse.results;
            nextState.questions.unansweredCount = questionsResponse.metadata.unanswered_count;
            nextState.questions.currentPage = this.state.searchForm.filters.page;
            return nextState;
        }, async () => {
            await this.shallowUpdateUri();
        });
    }

    convertSearchFiltersToUri() {
        let searchFilters = JSON.stringify(this.state.searchForm.filters);
        searchFilters = JSON.parse(searchFilters);
        if (!searchFilters.content) {
            delete searchFilters.content;
        }
        if (!searchFilters.tags) {
            delete searchFilters.tags;
        }
        if (!searchFilters.unanswered) {
            delete searchFilters.unanswered;
        }
        return commons.jsonToUri(searchFilters);
    }

    isFiltered() {
        return !_.isEqual(this.state.searchForm.filters, this.defaultSearchFilters);
    }

    async shallowUpdateUri() {
        await Router.push(`/teams/[id]`, `/teams/${this.props.team.id}?${this.convertSearchFiltersToUri()}`, {shallow: true});
    }

    toggleSearchFormVisibility() {
        this.setState((prevState) => {
            const newState = prevState;
            newState.searchForm.show = !prevState.searchForm.show;
            return newState;
        });
    }

    render() {

        let questionListItems;
        let questionSearchForm = '';

        if (this.state.searchForm.show) {
            questionSearchForm = <Item.Group divided>
                <Item>
                    <QnAQuestionSearchFormComponent tags={this.state.tags} onSearchFormSubmit={this.onSearchFormSubmit}
                                                    onSearchFormReset={this.onSearchFormReset}
                                                    initialValues={this.state.searchForm.filters}/>
                </Item>
            </Item.Group>;
        }

        if (this.state.isLoading) {
            questionListItems = <QnAFluidParagraphPlaceholderListComponent/>
        } else {
            questionListItems = this.state.questions.currentList.map(question => {
                return <QnACrudItemComponent key={question.id} crudItem={question} teamId={this.props.team.id} specificData={{tags: this.state.tags}}
                                             crudItemType={C.components.QnACrudItemComponent.crudItemTypes.question}/>
            });

        }

        return (
            <Grid celled='internally'>
                <Grid.Row>

                    <Grid.Column width={3}>
                        <QnATeamDescriptionCardComponent team={this.props.team}/>
                    </Grid.Column>

                    <Grid.Column width={9}>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={6}>
                                    <span className={styles.questionListTotalCountHeading}>{`${this.state.questions.totalCount} questions found`}</span>
                                    <span className={styles.questionListFilteredIndicator}>{this.isFiltered() ? ' - [Filtered]' : ''}</span>
                                </Grid.Column>
                                <Grid.Column width={10}>
                                    <div className={styles.questionListSearchBtnPanel}>
                                        <Button onClick={() => Router.push(`/teams/${this.props.team.id}/questions/new`)} as='div' icon primary
                                                labelPosition='left'
                                                size='mini'>
                                            <Icon name='lightbulb'/>
                                            Ask a Question
                                        </Button>
                                        <Button as='div' labelPosition='right' size='mini'>
                                            <Button basic={!this.state.searchForm.filters.unanswered} color='red' size='mini'
                                                    onClick={this.onUnAnsweredFilterClick}>Unanswered</Button>
                                            <Label as='a' basic color='red' pointing='left'>
                                                {this.state.questions.unansweredCount}
                                            </Label>
                                        </Button>
                                        <Button icon size='mini' onClick={this.toggleSearchFormVisibility}>
                                            <Icon name='filter'/>
                                        </Button>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <Divider/>
                        {questionSearchForm}
                        <Item.Group divided>
                            {questionListItems}
                        </Item.Group>
                        <div className={styles.questionListPaginationContainer}>
                            <div className={styles.questionListPagination}>
                                <QnAPaginationComponent
                                    totalItems={this.state.questions.totalCount}
                                    pageSize={C.components.QnAPaginationComponent.pageSize.default}
                                    activePage={this.state.questions.currentPage}
                                    onPageChange={this.onPageChange}
                                />
                            </div>
                        </div>
                    </Grid.Column>

                    <Grid.Column width={4}>
                        <Card>
                            <Card.Content>
                                <Card.Header>Recent Activity in Team</Card.Header>
                            </Card.Content>
                            <Card.Content className={styles.activityLogCardContent}>
                                <QnAActivityLogListComponent
                                    fetcher={(query) => API.fetchTeamActivityLogs(this.props.team.id, query)}
                                    getHrefForListItem={(activityLog) => `/teams/${this.props.team.id}/questions/${activityLog.data.log.params.question_id}`}
                                />
                            </Card.Content>
                        </Card>
                    </Grid.Column>

                </Grid.Row>
            </Grid>
        )
    }
}

export default QnATeamHomePageComponent;
