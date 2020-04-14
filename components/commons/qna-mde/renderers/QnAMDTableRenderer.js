import React, {PureComponent} from "react";

class QnAMDTableRenderer extends PureComponent {

    render() {
        return (
            <table className={'ui celled table'}>
                {this.props.children}
            </table>
        );
    }
}

export default QnAMDTableRenderer;