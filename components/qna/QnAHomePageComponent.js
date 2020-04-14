import React, {Component} from 'react'
import {Button, Card, Header, Icon, Image, Segment} from "semantic-ui-react";
import Utils from './../util/utils'
import C from "../util/consts";

class QnAHomePageComponent extends Component {

    state = {};

    render() {

        const teamCards = this.props.teams.map((team, idx) => {
            return (
                <Card key={idx}>
                    <Card.Content>
                        <Image
                            floated='right'
                            size='mini'
                            src={`/img/test-data/${team.avatar}.jpg`}
                        />
                        <Card.Header>{team.name}</Card.Header>
                        <Card.Meta>{`${team.user_count} Users`}</Card.Meta>
                        <Card.Description>{Utils.strEllipsis(team.description, C.QnAHomePageComponent.team.description_max_len)}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Button basic color='green' href={`/teams/${team.id}`}>
                            Go to Questions
                        </Button>
                    </Card.Content>
                </Card>
            );
        });
        return (
            <div>
                <Segment clearing>
                    <Header as='h4' floated='right'>
                        {`${this.props.teams.length} Teams found`}
                    </Header>
                    <Header as='h3' floated='left'>
                        <Icon name='group'/>
                        <Header.Content>
                            Teams
                            <Header.Subheader>Teams you have been added to in Arch - TeamsQnA</Header.Subheader>
                        </Header.Content>
                    </Header>
                </Segment>
                <Card.Group>
                    {teamCards}
                </Card.Group>
            </div>
        )
    }
}

export default QnAHomePageComponent;
