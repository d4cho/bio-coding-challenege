import React, { createContext, useState, useCallback } from "react";
import axios from "axios";

export const PlacesContext = createContext();

const PlacesProvider = ({ children }) => {
    const [placesStore, setPlacesStore] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");
    const [imageSrc, setImageSrc] = useState("");

    const getPlacesData = useCallback(async () => {
        try {
            const response = await axios.get(
                "https://6025865136244d001797c552.mockapi.io/api/v1/places"
            );
            const store = {};
            for (const item of response.data) {
                store[item.id] = item;
            }
            setPlacesStore(store);
        } catch (error) {
            setPlacesStore({});
            setErrorMsg("There was an error retrieving data");
        }
        setIsLoading(false);
    }, []);

    const getPlaceDetailData = useCallback(
        async (placeId) => {
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
        },
        [placesStore]
    );

    return (
        <PlacesContext.Provider
            value={{
                placesStore,
                isLoading,
                errorMsg,
                imageSrc,
                setImageSrc,
                getPlacesData,
                getPlaceDetailData,
            }}
        >
            {children}
        </PlacesContext.Provider>
    );
};

export default PlacesProvider;
