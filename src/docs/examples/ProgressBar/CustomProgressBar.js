import React from "react";
import ProgressBar from "ps-react/ProgressBar";

/** Set custom color on progress bar*/

export default function CustomProgressBar() {
    return (
        <ProgressBar percent={40} width={300} height={20} color={"#206a5d"} />
    );
}
