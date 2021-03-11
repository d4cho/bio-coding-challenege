import React, { createContext, useState, useCallback } from "react";
import axios from "axios";

export const PlacesContext = createContext();

const PlacesProvider = ({ children }) => {
    const [placesStore, setPlacesStore] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");

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

    return (
        <PlacesContext.Provider
            value={{ placesStore, getPlacesData, isLoading, errorMsg }}
        >
            {children}
        </PlacesContext.Provider>
    );
};

export default PlacesProvider;
