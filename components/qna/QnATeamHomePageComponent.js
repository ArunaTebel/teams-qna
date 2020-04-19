import React, {Component} from 'react'
import {Grid, Item, Divider, Button, Label, Icon} from 'semantic-ui-react'
import QnATeamDescriptionCardComponent from "./QnATeamDescriptionCardComponent";
import QnARecentActivityListComponent from "./QnARecentActivityListComponent";
import styles from './styles/QnAHomePageComponent.module.scss'
import QnAFluidParagraphPlaceholderListComponent from "./placeholders/QnAFluidParagraphPlaceholderListComponent";
import API from "../util/API";
import QnACrudItemComponent from "./QnACrudItemComponent";
import Router from 'next/router'
import C from "../util/consts";
import QnAPaginationComponent from "../commons/QnAPaginationComponent";
import QnAQuestionSearchFormComponent from "./QnAQuestionSearchFormComponent";
import commons from "../../utils/commons";

class QnATeamHomePageComponent extends Component {

    state = {
        questions: {totalCount: 0, currentList: [], currentPage: 1},
        searchQuery: '',
        tags: [],
        activityLogs: [],
        isLoading: true,
        searchForm: {
            show: false,
            filters: {page: 1, content: '', tags: ''}
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
            };
            return nextState;
        }, this.searchQuestions);
    }

    onSearchFormSubmit(searchFormValues) {
        this.setState((prevState) => {
            const nextState = prevState;
            nextState.isLoading = true;
            nextState.searchForm.filters.page = 1;
            nextState.searchForm.filters.content = searchFormValues.content;
            nextState.searchForm.filters.tags = searchFormValues.tags && searchFormValues.tags.length > 0 ? searchFormValues.tags : '';
            return nextState;
        }, this.searchQuestions);
    }

    async onPageChange(e, pageData) {
        this.setState((prevState) => {
            const nextState = prevState;
            nextState.isLoading = true;
            nextState.searchForm.filters.page = pageData.activePage;
            return nextState;
        }, this.searchQuestions);
    }

    async searchQuestions() {
        const questionsResponse = await API.fetchTeamQuestions(this.props.team.id, `${this.convertSearchFiltersToUri()}`);
        this.setState((prevState) => {
            const nextState = prevState;
            nextState.isLoading = false;
            nextState.questions.totalCount = questionsResponse.count;
            nextState.questions.currentList = questionsResponse.results;
            nextState.questions.currentPage = this.state.searchForm.filters.page;
            return nextState;
        }, async () => {
            await this.shallowUpdateUri();
        });
    }

    convertSearchFiltersToUri() {
        const searchFilters = this.state.searchForm.filters;
        if (!searchFilters.content) {
            delete searchFilters.content;
        }
        if (!searchFilters.tags) {
            delete searchFilters.tags;
        }
        return commons.jsonToUri(searchFilters);
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
                    <QnAQuestionSearchFormComponent tags={this.state.tags} onSearchFormSubmit={this.onSearchFormSubmit}/>
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
                                    <h3>{`${this.state.questions.totalCount} questions found`}</h3>
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
                                            <Button basic color='green' size='mini'>Active</Button>
                                            <Label as='a' basic color='green' pointing='left'>
                                                712
                                            </Label>
                                        </Button>
                                        <Button as='div' labelPosition='right' size='mini'>
                                            <Button basic color='red' size='mini'>Unanswered</Button>
                                            <Label as='a' basic color='red' pointing='left'>
                                                1,296
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
                        <QnARecentActivityListComponent team={this.props.team}/>
                    </Grid.Column>

                </Grid.Row>
            </Grid>
        )
    }
}

export default QnATeamHomePageComponent;
