import React, {Component} from 'react'
import {Icon, Image, Card} from 'semantic-ui-react'

export default class QnATeamDescriptionCardComponent extends Component {
    state = {};

    render() {
        const team = this.props.team;
        return (
            <Card>
                <Image src={`/img/test-data/${team.avatar}.jpg`} wrapped ui={false}/>
                <Card.Content>
                    <Card.Header>{team.name}</Card.Header>
                    <Card.Meta>
                        <span>Joined: {team.created_at.split('T')[0]}</span>
                    </Card.Meta>
                    <Card.Description>{team.description}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <a>
                        <Icon name='user'/>
                        {team.users.length} Users
                    </a>
                </Card.Content>
            </Card>
        );
    }
}
