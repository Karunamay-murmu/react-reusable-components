import React from "react";
import PropTypes from "prop-types";

class ProgressBar extends React.Component {
    getColor = (percent) => {
        const { color } = this.props;
        if (this.props.percent === 100) return color ? color : "Green";
        return this.props.percent > 50
            ? color
                ? color
                : "lightgreen"
            : color
            ? color
            : "red";
    };

    getWidthAsPercentTotalWidth = () => {
        return parseInt(this.props.width * (this.props.percent / 100), 10);
    };

    render() {
        const { percent, width, height } = this.props;
        return (
            <div style={{ border: "solid 1px lightgray", width: width }}>
                <div
                    style={{
                        width: this.getWidthAsPercentTotalWidth(),
                        height,
                        backgroundColor: this.getColor(percent),
                    }}
                />
            </div>
        );
    }
}

ProgressBar.propTypes = {
    /** Percent of progress completed */
    percent: PropTypes.number.isRequired,

    /** Progress Bar width */
    width: PropTypes.number.isRequired,

    /** Progress Bar height */
    height: PropTypes.number,
};

ProgressBar.defaultProps = {
    height: 5,
};

export default ProgressBar;
