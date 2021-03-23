import React from "react";
import { Link } from "react-router-dom";

import styles from "./BackButton.module.css";

const BackButton = ({ text }) => {
    return (
        <Link data-test="BackButton" to="/" className={styles.btn}>
            {text}
        </Link>
    );
};

export default BackButton;
