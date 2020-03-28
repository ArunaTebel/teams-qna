import React, {Component} from 'react'
import {Menu, Input} from 'semantic-ui-react'
import styles from './styles/QnATopMenuComponent.module.scss'

export default class QnATopMenuComponent extends Component {
    state = {activeItem: 'teams'};

    handleItemClick = (e, {name}) => this.setState({activeItem: name});

    render() {
        const activeItem = this.state.activeItem;

        return (
            <Menu pointing secondary>
                <a href={'/'}>
                    <img className={styles.archTopMenuLogo} src='/img/logo-small.png'/>
                </a>
                <Menu.Item
                    name='teams'
                    active={activeItem === 'teams'}
                    content='Teams'
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='tags'
                    active={activeItem === 'tags'}
                    content='Tags'
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='users'
                    active={activeItem === 'users'}
                    content='Users'
                    onClick={this.handleItemClick}
                />
                <Menu.Item>
                    <Input icon='search' placeholder='Search...'/>
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item
                        name='logout'
                        active={activeItem === 'logout'}
                        onClick={this.handleItemClick}
                    />
                </Menu.Menu>
            </Menu>
        )
    }
}
