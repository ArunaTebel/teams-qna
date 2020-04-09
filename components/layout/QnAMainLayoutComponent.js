import React, {Component} from 'react'
import QnATopMenuComponent from "./QnATopMenuComponent";
import QnAMainContentComponent from "./QnAMainContentComponent";
import QnAHorizontalLoaderComponent from "../commons/QnAHorizontalLoaderComponent";

export default class QnAMainLayoutComponent extends Component {

    state = {};

    render() {

        return (
            <div className='arch-layout-comp'>
                <QnATopMenuComponent/>
                <QnAHorizontalLoaderComponent/>
                <QnAMainContentComponent>
                    {this.props.children}
                </QnAMainContentComponent>
            </div>
        )
    }
}
