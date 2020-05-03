import React, {Component} from 'react';
import {Feed, Label} from "semantic-ui-react";
import Utils from "../../util/utils";
import styles from './styles/TeamListItemRendererComponent.module.scss';

class TeamListItemRendererComponent extends Component {
    render() {
        const team = this.props.item;
        return (
            <Feed.Event>
                <Feed.Label image={`/img/test-data/${team.avatar}.jpg`}/>
                <Feed.Content>
                    <Feed.Summary className={styles.teamListItemTeamNameContainer}>
                        <a href={`/teams/${team.id}`}>{team.name}</a>
                    </Feed.Summary>
                    <Feed.Summary>
                        <Label as='a' color='teal' size={'mini'}>
                            {team.user_count} Users
                        </Label>
                        <Feed.Date content={`Created ${Utils.datetime.todatetime(team.created_at)}`}/>
                    </Feed.Summary>
                </Feed.Content>
            </Feed.Event>
        );
    }
}

export default TeamListItemRendererComponent;