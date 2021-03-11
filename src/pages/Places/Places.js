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

    if (isLoading) {
        return (
            <div>
                <h1>Places Page</h1>
                <Loading loadingMsg="Loading..." />
            </div>
        );
    }

    if (errorMsg) {
        return (
            <div>
                <h1>Places Page</h1>
                <Error errorMsg={errorMsg} />
            </div>
        );
    }

    return (
        <div>
            <h1>Places Page</h1>
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
        </div>
    );
};

export default Places;
