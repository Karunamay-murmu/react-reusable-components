import React from "react";
import PropTypes from "prop-types";

/** Label with required field display, htmlfor, and block styling */
function Label({ htmlfor, label, required }) {
    return (
        <label htmlFor={htmlfor} style={{ display: "block" }}>
            {label} {required && <span style={{ color: "red" }}> *</span>}
        </label>
    );
}

Label.propTypes = {
    /** Label text */
    label: PropTypes.string.isRequired,

    /** HTML ID for associated input */
    htmlfor: PropTypes.string.isRequired,

    /** Display asterisk after label if true */
    required: PropTypes.bool,
};

export default Label;
