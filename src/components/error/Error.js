import React from "react";

import styles from "./Error.module.css";

const Error = ({ errorMsg }) => {
    return <div className={styles.error}>{errorMsg}</div>;
};

export default Error;
