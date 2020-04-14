import React, {Component} from 'react'
import PropTypes from "prop-types";
import {Pagination} from 'semantic-ui-react'

export default class QnAPaginationComponent extends Component {

    static propTypes = {
        totalItems: PropTypes.string,
        pageSize: PropTypes.string,
        activePage: PropTypes.string,
        boundaryRange: PropTypes.string,
        siblingRange: PropTypes.string,
        totalPages: PropTypes.string,
        showEllipsis: PropTypes.boolean,
        showFirstAndLastNav: PropTypes.boolean,
        showPreviousAndNextNav: PropTypes.boolean,
        size: PropTypes.string
    };

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
        const totalPages = this.props.totalPages ? this.props.totalPages : Math.max(1, calculatedTotalPages);
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
