import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import { PlacesContext } from "../../context/PlacesContext";

const PlacesDetails = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");
    const [imageSrc, setImageSrc] = useState("");
    const { placeId } = useParams();
    const { placesStore, setPlacesStore } = useContext(PlacesContext);

    useEffect(() => {
        async function getPlaceDetailData() {
            if (!placesStore.hasOwnProperty(placeId)) {
                try {
                    const response = await axios.get(
                        `https://6025865136244d001797c552.mockapi.io/api/v1/places/${placeId}`
                    );
                    const store = { ...placesStore, [placeId]: response.data };
                    setPlacesStore(store);
                    setImageSrc(response.data.logo_url);
                } catch (error) {
                    setErrorMsg("There was an error retrieving data");
                }
            } else {
                setImageSrc(placesStore[placeId].logo_url);
            }
            setIsLoading(false);
        }
        getPlaceDetailData();
    }, [placeId, placesStore, setPlacesStore]);

    const goBackLink = <Link to="/">Go back to Places</Link>;

    if (isLoading) {
        return (
            <div>
                {goBackLink}
                <div>Loading...</div>
            </div>
        );
    }

    if (errorMsg) {
        return (
            <div>
                {goBackLink}
                <div>{errorMsg}</div>
            </div>
        );
    }

    const placeDetail = placesStore[placeId];

    let placeHours = Object.keys(placeDetail.hours).map((day) => (
        <div key={day}>
            {day}: {placeDetail.hours[day]}
        </div>
    ));

    return (
        <div>
            {goBackLink}
            <img
                src={imageSrc}
                alt="logo"
                onError={() => setImageSrc("/images/default-image.jpg")}
            />
            <div>
                <ul>
                    <li>Business Name: {placeDetail.name}</li>
                    <li>Address: {placeDetail.address}</li>
                    <li>Website: {placeDetail.website_url}</li>
                    <li>Hours: {placeHours}</li>
                </ul>
            </div>
        </div>
    );
};

export default PlacesDetails;
