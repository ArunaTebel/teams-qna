import React, {Component} from 'react'
import {Menu, Input, Dropdown} from 'semantic-ui-react'
import styles from './styles/QnATopMenuComponent.module.scss'
import fetch from "isomorphic-unfetch";
import Router from "next/router";
import C from "../util/consts";
import API from "../util/API";
import _ from "lodash";

export default class QnATopMenuComponent extends Component {

    state = {activeItem: 'teams', isLoggedIn: false, authorizeUrl: '#', loggedInUser: {username: ''}, teams: []};
    componentConfig = C.components.QnATopMenuComponent;

    constructor(props) {
        super(props);
        this.getTeamChoices = this.getTeamChoices.bind(this);
    }

    async componentDidMount() {
        const path = window.location.pathname.split('/')[1];
        const teams = await API.fetchMyTeams();
        fetch('/api/getAuthData').then(
            async r => {
                const authData = await r.json();
                if (!authData.isLoggedIn && window.location.pathname !== '/') {
                    window.location = '/';
                }
                this.setState({
                    activeItem: this.componentConfig.routeActiveMenuItemMap[path],
                    isLoggedIn: authData.isLoggedIn,
                    authorizeUrl: authData.authorizeUrl,
                    loggedInUser: authData.userData,
                    teams: this.getTeamChoices(teams),
                })
            }
        );
    }

    getTeamChoices(teams) {
        const teamChoices = _.map(teams, (team) => {
            return {key: team.id, text: team.name, value: team.id, image: {avatar: true, src: `/img/test-data/${team.avatar}.jpg`}};
        });
        teamChoices.unshift({key: -1, text: 'Team', value: -1});
        return teamChoices;
    }

    render() {
        const activeItem = this.state.activeItem;

        let userLink = <Menu.Item>
            <a href={this.state.authorizeUrl}>Login</a>
        </Menu.Item>;

        let teamDropdown = '';

        if (this.state.isLoggedIn) {
            userLink = <Menu.Item>
                <Dropdown text={`Hello, ${this.state.loggedInUser.username}`} floating>
                    <Dropdown.Menu>
                        <Dropdown.Item><a href={'/auth/logout'}>Logout</a></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>;

            teamDropdown = <Menu.Item>
                  <span>
                      Go to {' '}
                      <Dropdown
                          inline
                          options={this.state.teams}
                          defaultValue={-1}
                          onChange={(e, {value}) => {
                              if (value !== -1) {
                                  Router.push(`/teams/${value}`);
                              }
                          }}
                      />
                  </span>
            </Menu.Item>
        }

        return (
            <Menu pointing secondary>
                <a href={'/'}><img alt='logo' className={styles.archTopMenuLogo} src='/img/logo-small.png'/></a>
                <Menu.Item name='teams' active={activeItem === 'teams'} content='Teams' onClick={() => Router.push('/')}/>
                <Menu.Item name='profile' active={activeItem === 'profile'} content='My Activities' onClick={() => Router.push('/profile')}/>
                {teamDropdown}
                <Menu.Menu position='right'>{userLink}</Menu.Menu>
            </Menu>
        )
    }
}
