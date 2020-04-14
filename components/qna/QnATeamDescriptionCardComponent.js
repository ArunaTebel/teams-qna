import React, {Component} from 'react'
import {Icon, Image, Card} from 'semantic-ui-react'
import Utils from "../util/utils";

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
                        <span>Joined: {Utils.datetime.todate(team.created_at)}</span>
                    </Card.Meta>
                    <Card.Description>{team.description}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <a><Icon name='user'/>{team.user_count} User(s)</a>
                </Card.Content>
            </Card>
        );
    }
}
