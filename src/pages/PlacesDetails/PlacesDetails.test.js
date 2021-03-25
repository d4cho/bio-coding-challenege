import React from "react";
import { shallow } from "enzyme";
import PlacesDetails from "./PlacesDetails";
import * as PlacesContext from "../../context/PlacesContext";
import ReactRouter from "react-router";

describe("PlacesDetails Component", () => {
    const contextValues = {
        placesStore: {
            1: {
                id: 1,
                name: "test name",
                website_url: "test url",
                address: "test address",
                imgSrc: "test image",
                hours: {
                    monday: "test hours",
                },
            },
        },
        getPlacesData: jest.fn(),
    };

    const mockContext = (isLoading = false, errorMsg = "") => {
        contextValues["isLoading"] = isLoading;
        contextValues["errorMsg"] = errorMsg;

        return jest
            .spyOn(PlacesContext, "usePlacesContext")
            .mockImplementation(() => contextValues);
    };

    beforeEach(() => {
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({
            placeId: "1",
        });
    });

    it("should render loading component if loading is true", () => {
        mockContext(true, "");
        const wrapper = shallow(<PlacesDetails />);
        const loadingComponent = wrapper.find('[data-test="loadingComponent"]');
        expect(loadingComponent.length).toBe(1);
    });

    it("should render error component if there is a error msg", () => {
        mockContext(false, "test error msg");
        const wrapper = shallow(<PlacesDetails />);
        const errorComponent = wrapper.find('[data-test="errorComponent"]');
        expect(errorComponent.length).toBe(1);
    });

    it("should render values from context", () => {
        mockContext();
        const wrapper = shallow(<PlacesDetails />);
        const name = wrapper.find('[data-test="name"]');
        const address = wrapper.find('[data-test="address"]');
        const url = wrapper.find('[data-test="url"]');

        expect(name.text()).toEqual(contextValues.placesStore[1].name);
        expect(address.text()).toEqual(contextValues.placesStore[1].address);
        expect(url.text()).toEqual(contextValues.placesStore[1].website_url);
    });
});
