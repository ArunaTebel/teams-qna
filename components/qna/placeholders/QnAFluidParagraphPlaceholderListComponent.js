import React, {Component} from 'react'
import {Item, Placeholder} from "semantic-ui-react";

class QnAFluidParagraphPlaceholderListComponent extends Component {

    render() {
        const multiply = Array(5).fill(null).map((x, i) => i);

        return (
            <Item.Group divided>
                {multiply.fill(0).map((n, idx) => {
                    return (
                        <Placeholder key={idx} fluid>
                            <Placeholder.Header image>
                                <Placeholder.Line/>
                                <Placeholder.Line/>
                            </Placeholder.Header>
                            <Placeholder.Paragraph>
                                <Placeholder.Line/>
                                <Placeholder.Line/>
                                <Placeholder.Line/>
                                <Placeholder.Line/>
                            </Placeholder.Paragraph>
                        </Placeholder>
                    )
                })}
            </Item.Group>
        );
    }

}

export default QnAFluidParagraphPlaceholderListComponent;