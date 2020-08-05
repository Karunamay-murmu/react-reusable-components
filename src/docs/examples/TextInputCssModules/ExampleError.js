import React from "react";
import TextInputCssModules from "ps-react/TextInputCssModules";

/** Required TextBox */
export default class ExampleError extends React.Component {
    render() {
        return (
            <TextInputCssModules
                htmlId="example-optional"
                label="First Name"
                name="firstname"
                onChange={() => {}}
                required
                error="First name is required"
            />
        );
    }
}
