import React, {Component} from 'react'
import QnAMainLayoutComponent from "../../components/layout/QnAMainLayoutComponent";
import QnAUserDetailsComponent from "../../components/qna/QnAUserDetailsComponent";
import API from "../../components/util/API";
import {Grid, Icon, Item, Menu, Segment} from "semantic-ui-react";
import QnAListComponent from "../../components/qna/QnAListComponent";
import utils from "../../components/util/utils";
import C from "../../components/util/consts";
import _ from 'lodash';
import styles from "../../components/qna/styles/ArchQnAProfilePageComponent.module.scss";
import ActivityLogListItemRendererComponent from "../../components/qna/listItemRenderers/ActivityLogListItemRendererComponent";
import TeamListItemRendererComponent from "../../components/qna/listItemRenderers/TeamListItemRendererComponent";
import QuestionListItemRendererComponent from "../../components/qna/listItemRenderers/QuestionListItemRendererComponent";
import AnswerListItemRendererComponent from "../../components/qna/listItemRenderers/AnswerListItemRendererComponent";
import CommentListItemRendererComponent from "../../components/qna/listItemRenderers/CommentListItemRendererComponent";

class ArchQnAProfilePageComponent extends Component {

    state = {
        leftMenu: {activeItem: 'activities'},
        activities: {
            activeItem: 'CURRENT_USER', logTarget: 'CURRENT_USER'
        },
    };
    componentConfig = C.components.ArchQnAProfilePageComponent;

    constructor(props) {
        super(props);
        this.activityLogFormatter = this.activityLogFormatter.bind(this);
        this.getSegmentForActiveLeftMenu = this.getSegmentForActiveLeftMenu.bind(this);
        this.getActivityLogSegment = this.getActivityLogSegment.bind(this);
        this.getProfileSegment = this.getProfileSegment.bind(this);
    }

    handleLeftMenuItemClick = (e, {name}) => {
        this.setState({leftMenu: {activeItem: name}});
    };

    handleActivityLogTabItemClick = (e, {logtarget}) => {
        this.setState({activities: {activeItem: logtarget, logTarget: logtarget}});
    };

    static async getInitialProps(ctx) {
        return {
            user: await API.fetchUser(ctx.req),
        };
    }

    activityLogFormatter(activityLog) {
        if (this.state.activities.logTarget === 'QUESTION_OWNER' || this.state.activities.logTarget === 'ANSWER_OWNER') {
            const currentUser = activityLog.data.log.params.current_user_data;
            if (currentUser && utils.strings.numStrComp(currentUser.id, this.props.user.id)) {
                return activityLog.data.log.message.replace('{current_user}', 'You').replace('{question_name}', activityLog.data.log.params.question_name);
            } else {
                return activityLog.message;
            }
        }
        return activityLog.message;
    }

    render() {
        const leftMenuActiveTab = this.state.leftMenu.activeItem;
        const leftMenuTabs = _.map(this.componentConfig.leftMenuTabs, (tab, k) => {
            return (
                <Menu.Item
                    key={k}
                    name={tab.menuTitle}
                    active={leftMenuActiveTab === tab.menuTitle}
                    onClick={this.handleLeftMenuItemClick}
                />
            );
        });

        return (
            <QnAMainLayoutComponent>
                <Grid>
                    <Grid.Column width={3}>
                        <Segment color={'teal'}>
                            <QnAUserDetailsComponent user={this.props.user} className={' '}/>
                        </Segment>

                        <Menu fluid vertical tabular>
                            {leftMenuTabs}
                        </Menu>
                    </Grid.Column>

                    <Grid.Column stretched width={13}>
                        {this.getSegmentForActiveLeftMenu()}
                    </Grid.Column>
                </Grid>

            </QnAMainLayoutComponent>
        );
    }

    getSegmentForActiveLeftMenu() {
        let segment = '';
        const activeLeftMenu = this.state.leftMenu.activeItem;
        if (activeLeftMenu === 'profile') {
            segment = this.getProfileSegment();
        } else if (activeLeftMenu === 'activities') {
            segment = this.getActivityLogSegment();
        }
        return segment;
    }

    getActivityLogSegment() {
        const selectedActivityLogTabIdx = _.findIndex(this.componentConfig.activityLogTabs, {logTarget: this.state.activities.logTarget});
        const activityLogActiveTab = this.state.activities.activeItem;
        const activityLogTabs = _.map(this.componentConfig.activityLogTabs, (tab) => {
            return (
                <Menu.Item
                    key={tab.menuTitle}
                    name={tab.menuTitle}
                    logtarget={tab.logTarget}
                    active={activityLogActiveTab === tab.logTarget}
                    onClick={this.handleActivityLogTabItemClick}
                />
            );
        });
        return <Grid.Column width={12}>
            <Menu pointing>{activityLogTabs}</Menu>
            <h4>{this.componentConfig.activityLogTabs[selectedActivityLogTabIdx].description}</h4>
            <QnAListComponent
                fetcher={(query) => API.fetchUserActivityLogs(this.props.user.id, query)}
                filters={{log_target: this.state.activities.logTarget}}
                listItemRenderer={{
                    component: ActivityLogListItemRendererComponent,
                    props: {
                        getHrefForListItem: (activityLog) => `/teams/${activityLog.data.log.params.team_id}/questions/${activityLog.data.log.params.question_id}`,
                        logFormatter: this.activityLogFormatter,
                    },
                }}
            />
        </Grid.Column>;
    }

    getProfileSegment() {
        return (
            <div>
                <Segment attached='top' color={'teal'}>
                    <Item.Group>
                        <Item>
                            <Item.Image size='tiny' src={`/img/test-data/${this.props.user.avatar}.jpg`}/>

                            <Item.Content>
                                <Item.Header>{this.props.user.full_name}</Item.Header>
                                <Item.Meta>{this.props.user.username}</Item.Meta>
                                <Item.Extra><Icon name='star'/>{this.props.user.rating}</Item.Extra>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
                <h4><Icon name='users'/>My Teams</h4>
                <Segment className={styles.segment}>
                    <QnAListComponent
                        fetcher={(query) => API.fetchMyTeams()}
                        noPagination
                        listItemRenderer={{component: TeamListItemRendererComponent, props: {},}}
                    />
                </Segment>
                <h4><Icon name='question circle outline'/>My Questions</h4>
                <Segment className={styles.segment}>
                    <QnAListComponent
                        fetcher={(query) => API.fetchMyQuestions(query)}
                        listItemRenderer={{component: QuestionListItemRendererComponent, props: {},}}
                    />
                </Segment>
                <h4><Icon name='lightbulb'/>My Answers</h4>
                <Segment className={styles.segment}>
                    <QnAListComponent
                        fetcher={(query) => API.fetchMyAnswers(query)}
                        listItemRenderer={{component: AnswerListItemRendererComponent, props: {},}}
                    />
                </Segment>
                <h4><Icon name='comment alternate'/>My Comments</h4>
                <Segment>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={8} className={styles.segment}>
                                <h4>On Questions</h4>
                                <QnAListComponent
                                    fetcher={(query) => API.fetchMyQuestionComments(query)}
                                    listItemRenderer={{component: CommentListItemRendererComponent, props: {},}}
                                />
                            </Grid.Column>
                            <Grid.Column width={8} className={styles.segment}>
                                <h4>On Answers</h4>
                                <QnAListComponent
                                    fetcher={(query) => API.fetchMyAnswerComments(query)}
                                    listItemRenderer={{component: CommentListItemRendererComponent, props: {},}}
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                </Segment>
            </div>
        );
    }
}

export default ArchQnAProfilePageComponent;
