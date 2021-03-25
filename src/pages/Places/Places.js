import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "./Places.module.css";
import { usePlacesContext } from "../../context/PlacesContext";
import Error from "../../components/error/Error";
import Loading from "../../components/loading/Loading";

const Places = () => {
    const {
        placesStore,
        getPlacesData,
        isLoading,
        errorMsg,
    } = usePlacesContext();

    useEffect(() => {
        getPlacesData();
    }, [getPlacesData]);

    const renderCards = () =>
        Object.keys(placesStore).map((placeId) => {
            const place = placesStore[placeId];
            const { id, name, website_url, address } = place;
            let imgSrc = place.logo_url;

            return (
                <div
                    data-test="cards"
                    key={id}
                    className={styles.cardContainer}
                >
                    <img
                        className={styles.img}
                        src={imgSrc}
                        alt="logo"
                        onError={(e) =>
                            (e.target.src = "/images/default-image.jpg")
                        }
                    />
                    <div>
                        <Link
                            data-test="name"
                            className={styles.link}
                            to={`/places/${id}`}
                        >
                            {name}
                        </Link>
                    </div>
                    <a data-test="url" href={website_url}>
                        {website_url}
                    </a>
                    <div data-test="address">{address}</div>
                </div>
            );
        });

    if (isLoading) {
        return (
            <div className={styles.container}>
                <h1 data-test="header">Places Page</h1>
                <Loading data-test="loadingComponent" loadingMsg="Loading..." />
            </div>
        );
    }

    if (errorMsg) {
        return (
            <div className={styles.container}>
                <h1>Places Page</h1>
                <Error data-test="errorComponent" errorMsg={errorMsg} />
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Places Page</h1>
            {renderCards()}
        </div>
    );
};

export default Places;
