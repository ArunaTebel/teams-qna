import React, {Component} from 'react'
import {Menu, Input, Dropdown} from 'semantic-ui-react'
import styles from './styles/QnATopMenuComponent.module.scss'
import fetch from "isomorphic-unfetch";

export default class QnATopMenuComponent extends Component {

    state = {activeItem: 'teams', isLoggedIn: false, authorizeUrl: '#', loggedInUser: {username: ''}};

    async componentDidMount() {
        fetch('/api/getAuthData').then(
            async r => {
                const authData = await r.json();
                this.setState({
                    isLoggedIn: authData.isLoggedIn,
                    authorizeUrl: authData.authorizeUrl,
                    loggedInUser: authData.userData
                })
            }
        );
    }

    handleItemClick = (e, {name}) => this.setState({activeItem: name});

    render() {
        const activeItem = this.state.activeItem;

        let userLink = <Menu.Item>
            <a href={this.state.authorizeUrl}>Login</a>
        </Menu.Item>;

        if (this.state.isLoggedIn) {
            userLink = <Menu.Item>
                <Dropdown text={`Hello, ${this.state.loggedInUser.username}`} floating>
                    <Dropdown.Menu>
                        <Dropdown.Item text='Profile'/>
                        <Dropdown.Divider/>
                        <Dropdown.Item><a href={'/auth/logout'}>Logout</a></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
        }

        return (
            <Menu pointing secondary>
                <a href={'/'}><img alt='logo' className={styles.archTopMenuLogo} src='/img/logo-small.png'/></a>
                <Menu.Item name='teams' active={activeItem === 'teams'} content='Teams' onClick={this.handleItemClick}/>
                <Menu.Item name='tags' active={activeItem === 'tags'} content='Tags' onClick={this.handleItemClick}/>
                <Menu.Item name='users' active={activeItem === 'users'} content='Users' onClick={this.handleItemClick}/>
                <Menu.Item><Input icon='search' placeholder='Search...'/></Menu.Item>
                <Menu.Menu position='right'>{userLink}</Menu.Menu>
            </Menu>
        )
    }
}
