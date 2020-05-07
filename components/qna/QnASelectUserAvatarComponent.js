import React, {Component} from 'react';
import {Button} from "semantic-ui-react";
import C from "../util/consts";
import QnAUserAvatarComponent from "./QnAUserAvatarComponent";
import API from "../util/API";

class QnASelectUserAvatarComponent extends Component {

    state = {
        avatarProps: {},
    };
    componentConfig = C.components.QnASelectUserAvatarComponent;

    constructor(props) {
        super(props);
        this.randomize = this.randomize.bind(this);
        this.save = this.save.bind(this);
        this.setDefaultAvatar = this.setDefaultAvatar.bind(this);
        this.getAvatarProps = this.getAvatarProps.bind(this);
    }

    componentDidMount() {
        this.setDefaultAvatar();
    }

    setDefaultAvatar() {
        this.setState({avatarProps: this.getAvatarProps()});
    }

    getAvatarProps(random = false) {
        const avatarProps = {};
        const avatarConfigProps = this.componentConfig.avatarProps;
        for (let propName in avatarConfigProps) {
            if (avatarConfigProps.hasOwnProperty(propName)) {
                if (propName === 'size') {
                    continue;
                }
                if (random) {
                    const choices = avatarConfigProps[propName].choices;
                    avatarProps[propName] = choices[Math.floor(Math.random() * choices.length)];
                } else if (this.props.user) {
                    avatarProps[propName] = this.props.user.avatar[propName];
                } else {
                    avatarProps[propName] = avatarConfigProps[propName].default;
                }
            }
        }
        return avatarProps;
    }

    randomize() {
        this.setState({avatarProps: this.getAvatarProps(true)});
    }

    async save() {
        await API.updateUser(this.props.user.id, {avatar: this.state.avatarProps});
        window.location.reload();
    }

    render() {
        return (
            <div>
                <div>
                    <QnAUserAvatarComponent user={{avatar: this.state.avatarProps}} size={this.componentConfig.avatarProps.size.default}/>
                </div>
                <p>
                    <Button basic size={'mini'} onClick={this.randomize}>Randomize</Button>
                </p>
                <p>
                    <Button primary onClick={this.save}>Save</Button>
                </p>
            </div>
        );
    }
}

export default QnASelectUserAvatarComponent;