import React, {Component} from 'react'
import QnATopMenuComponent from "./QnATopMenuComponent";
import QnAMainContentComponent from "./QnAMainContentComponent";

export default class QnAMainLayoutComponent extends Component {

    state = {};

    render() {

        return (
            <div className='arch-layout-comp'>
                <QnATopMenuComponent/>
                <QnAMainContentComponent>
                    {this.props.children}
                </QnAMainContentComponent>
            </div>
        )
    }
}
