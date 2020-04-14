import React, {Component} from 'react'
import PropTypes from "prop-types";
import {Pagination} from 'semantic-ui-react'

export default class QnAPaginationComponent extends Component {

    static defaultProps = {
        totalItems: 1,
        pageSize: 10,
        activePage: 1,
        boundaryRange: 2,
        siblingRange: 2,
        showEllipsis: undefined,
        showFirstAndLastNav: undefined,
        showPreviousAndNextNav: undefined,
        size: 'mini'
    };

    render() {
        const calculatedTotalPages = Math.ceil(parseInt(this.props.totalItems, 10) / parseInt(this.props.pageSize, 10));
        const totalPages = this.props.totalPages ? parseInt(this.props.totalPages, 10) : Math.max(1, calculatedTotalPages);
        if (!totalPages || totalPages === 1) {
            return [];
        }
        return (
            <Pagination
                activePage={this.props.activePage}
                boundaryRange={this.props.boundaryRange}
                onPageChange={this.props.onPageChange}
                size={this.props.size}
                siblingRange={this.props.siblingRange}
                totalPages={totalPages}
                ellipsisItem={this.props.showEllipsis}
                firstItem={this.props.showFirstAndLastNav}
                lastItem={this.props.showFirstAndLastNav}
                prevItem={this.props.showPreviousAndNextNav}
                nextItem={this.props.showPreviousAndNextNav}
            />
        )
    }
}
