import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { PlacesContext } from "../../context/PlacesContext";

const Places = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");
    const { placesStore, setPlacesStore } = useContext(PlacesContext);

    useEffect(() => {
        async function getPlacesData() {
            try {
                const response = await axios.get(
                    "https://6025865136244d001797c552.mockapi.io/api/v1/places"
                );
                const store = {};
                for (let item of response.data) {
                    store[item.id] = item;
                }
                setPlacesStore(store);
            } catch (error) {
                setPlacesStore({});
                setErrorMsg("There was an error retrieving data");
            }
            setIsLoading(false);
        }
        getPlacesData();
    }, [setPlacesStore]);

    console.log(placesStore);

    const renderTableRows = () =>
        Object.keys(placesStore).map((placeId) => {
            const place = placesStore[placeId];
            const { id, name, website_url, address } = place;
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>
                        <Link to={`/places/${id}`}>{name}</Link>
                    </td>
                    <td>{website_url}</td>
                    <td>{address}</td>
                </tr>
            );
        });

    return (
        <div>
            <h1>Places Page</h1>
            {isLoading ? (
                <div>Loading...</div>
            ) : errorMsg ? (
                <div>{errorMsg}</div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Business ID</th>
                            <th>Business Name</th>
                            <th>Website</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>{renderTableRows()}</tbody>
                </table>
            )}
        </div>
    );
};

export default Places;
