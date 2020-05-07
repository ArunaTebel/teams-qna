import React, {Component} from 'react';
import Avatar from "avataaars";
import C from "../util/consts";
import {Button, Icon, Modal} from "semantic-ui-react";
import QnASelectUserAvatarComponent from "./QnASelectUserAvatarComponent";

class QnAUserAvatarComponent extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        let editModal = '';

        if (this.props.editable) {
            editModal = <Modal trigger={<Button basic size={'mini'}><Icon name='edit'/>Change</Button>} centered={false} size={'mini'} dimmer={'blurring'}>
                <Modal.Header>Change Avatar</Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        <div style={{textAlign: 'center'}}>
                            <QnASelectUserAvatarComponent user={this.props.user}/>
                        </div>
                    </Modal.Description>
                </Modal.Content>
            </Modal>;
        }

        const avatar = this.props.user.avatar ? this.props.user.avatar : {};
        console.log(avatar);
        return (
            <div style={{textAlign: 'center'}} className={this.props.className}>
                <Avatar
                    style={
                        this.props.size ?
                            {
                                width: this.props.size,
                                height: this.props.size
                            } : {
                                width: C.components.QnAUserAvatarComponent.size,
                                height: C.components.QnAUserAvatarComponent.size
                            }
                    }
                    avatarStyle={avatar.avatarStyle ? avatar.avatarStyle : 'Circle'}
                    topType={avatar.topType}
                    accessoriesType={avatar.accessoriesType}
                    hairColor={avatar.hairColor}
                    facialHairType={avatar.facialHairType}
                    facialHairColor={avatar.facialHairColor}
                    clotheType={avatar.clotheType}
                    clotheColor={avatar.clotheColor}
                    eyeType={avatar.eyeType}
                    eyebrowType={avatar.eyebrowType}
                    mouthType={avatar.mouthType}
                    skinColor={avatar.skinColor}
                />
                <div style={{marginTop: '10px'}}>
                    {editModal}
                </div>
            </div>
        );
    }
}

QnAUserAvatarComponent.defaultProps = {
    cityList: [],
    provinceList: [],
};

export default QnAUserAvatarComponent;