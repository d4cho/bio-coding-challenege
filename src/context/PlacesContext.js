import React, { createContext, useState } from "react";

export const PlacesContext = createContext();

const PlacesProvider = ({ children }) => {
    const [placesStore, setPlacesStore] = useState({});

    return (
        <PlacesContext.Provider value={{ placesStore, setPlacesStore }}>
            {children}
        </PlacesContext.Provider>
    );
};

export default PlacesProvider;
