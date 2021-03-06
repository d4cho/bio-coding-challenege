import React from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

import styles from "./Loading.module.css";

const Loading = ({ loadingMsg }) => {
    const color = "rgba(177, 227, 25, 1)";

    return (
        <div className={styles.container}>
            <div data-test="loadingMsg">{loadingMsg}</div>
            <PacmanLoader
                data-test="loadingBar"
                color={color}
                size={50}
                margin={0}
            />
        </div>
    );
};

export default Loading;
