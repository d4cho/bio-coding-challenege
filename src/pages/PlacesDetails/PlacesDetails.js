import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import styles from "./PlacesDetails.module.css";
import { PlacesContext } from "../../context/PlacesContext";
import Error from "../../components/error/Error";
import Loading from "../../components/loading/Loading";
import BackButton from "../../components/buttons/BackButton";

const PlacesDetails = () => {
    const { placeId } = useParams();
    const {
        placesStore,
        getPlaceDetailData,
        isLoading,
        errorMsg,
        imageSrc,
        setImageSrc,
    } = useContext(PlacesContext);

    useEffect(() => {
        getPlaceDetailData(placeId);
    }, [getPlaceDetailData, placeId]);

    if (isLoading) {
        return (
            <div className={styles.container}>
                <BackButton text={"< Go back to Places"} />
                <Loading loadingMsg="Loading..." />
            </div>
        );
    }

    if (errorMsg) {
        return (
            <div className={styles.container}>
                <BackButton text={"< Go back to Places"} />
                <Error errorMsg={errorMsg} />
            </div>
        );
    }

    const placeDetail = placesStore[placeId];

    let placeHours = Object.keys(placeDetail.hours).map((day) => (
        <div key={day} className={styles.hoursContainer}>
            <span>{day}</span>
            <span>{placeDetail.hours[day]}</span>
        </div>
    ));

    return (
        <div className={styles.container}>
            <BackButton text={"< Go back to Places"} />
            <div className={styles.contentContainer}>
                <img
                    className={styles.img}
                    src={imageSrc}
                    alt="logo"
                    onError={() => setImageSrc("/images/default-image.jpg")}
                />
                <div className={styles.infoContainer}>
                    <h1>{placeDetail.name}</h1>
                    <h3>{placeDetail.address}</h3>
                    <a href={placeDetail.website_url}>
                        {placeDetail.website_url}
                    </a>
                    <h3>{placeHours}</h3>
                </div>
            </div>
        </div>
    );
};

export default PlacesDetails;
