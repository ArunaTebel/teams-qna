import React, {Component} from "react";
import QnAMDCodeBlockRenderer from "./renderers/QnAMDCodeBlockRenderer";
import QnAMDTableRenderer from "./renderers/QnAMDTableRenderer";
import ReactMarkdown from "react-markdown/with-html";

class QnAMarkDownComponent extends Component {

    render() {
        return (
            <ReactMarkdown
                renderers={{code: QnAMDCodeBlockRenderer, table: QnAMDTableRenderer}}
                source={this.props.source}/>
        );
    }
}

export default QnAMarkDownComponent;