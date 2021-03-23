import React from "react";
import { shallow } from "enzyme";
import Places from "./Places";
import * as PlacesContext from "../../context/PlacesContext";

describe("Places Component", () => {
    it("should render loading component if isLoading is true", () => {
        const contextValues = {
            // placesStore: {},
            getPlacesData: jest.fn(),
            isLoading: true,
            // errorMsg: "test error msg",
        };

        jest.spyOn(PlacesContext, "usePlacesContext").mockImplementation(
            () => contextValues
        );

        const wrapper = shallow(<Places />);
        const header = wrapper.find('[data-test="header"]');
        const loadingComponent = wrapper.find('[data-test="loadingComponent"]');
        expect(header.text()).toEqual("Places Page");
        expect(loadingComponent.length).toBe(1);
    });
});
