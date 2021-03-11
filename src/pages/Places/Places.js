import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import styles from "./Places.module.css";
import { PlacesContext } from "../../context/PlacesContext";
import Error from "../../components/error/Error";
import Loading from "../../components/loading/Loading";

const Places = () => {
    const { placesStore, getPlacesData, isLoading, errorMsg } = useContext(
        PlacesContext
    );

    useEffect(() => {
        getPlacesData();
    }, [getPlacesData]);

    const renderTableRows = () =>
        Object.keys(placesStore).map((placeId) => {
            const place = placesStore[placeId];
            const { id, name, website_url, address } = place;
            return (
                <div key={id} className={styles.cardContainer}>
                    <div>{id}</div>
                    <div>
                        <Link className={styles.link} to={`/places/${id}`}>
                            {name}
                        </Link>
                    </div>
                    <div>{website_url}</div>
                    <div>{address}</div>
                </div>
            );
        });

    if (isLoading) {
        return (
            <div className={styles.container}>
                <h1>Places Page</h1>
                <Loading loadingMsg="Loading..." />
            </div>
        );
    }

    if (errorMsg) {
        return (
            <div className={styles.container}>
                <h1>Places Page</h1>
                <Error errorMsg={errorMsg} />
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Places Page</h1>
            {renderTableRows()}
        </div>
    );
};

export default Places;
