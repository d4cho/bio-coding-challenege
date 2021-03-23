import React from "react";

import styles from "./Error.module.css";

const Error = ({ errorMsg }) => {
    return (
        <div data-test="ErrorComponent" className={styles.error}>
            {errorMsg}
        </div>
    );
};

export default Error;
