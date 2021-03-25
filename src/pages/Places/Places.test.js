import React from "react";
import { shallow } from "enzyme";
import Places from "./Places";
import * as PlacesContext from "../../context/PlacesContext";

describe("Places Component", () => {
    const contextValues = {
        placesStore: {
            1: {
                id: 1,
                name: "test name",
                website_url: "test url",
                address: "test address",
                imgSrc: "test image",
            },
        },
        getPlacesData: jest.fn(),
        isLoading: false,
        errorMsg: "",
    };

    const mockContext = (isLoading = false, errorMsg = "") => {
        contextValues.isLoading = isLoading;
        contextValues.errorMsg = errorMsg;

        return jest
            .spyOn(PlacesContext, "usePlacesContext")
            .mockImplementation(() => contextValues);
    };

    it("should render loading component if isLoading is true", () => {
        mockContext(true);
        const wrapper = shallow(<Places />);
        const header = wrapper.find('[data-test="header"]');
        const loadingComponent = wrapper.find('[data-test="loadingComponent"]');
        expect(header.text()).toEqual("Places Page");
        expect(loadingComponent.length).toBe(1);
    });

    it("should render error component if there is an error msg", () => {
        mockContext(false, "test error msg");
        const wrapper = shallow(<Places />);
        const errorComponent = wrapper.find('[data-test="errorComponent"]');
        expect(errorComponent.length).toBe(1);
    });

    it("should render cards if there is placesStore data && loading is false && there is no error msg", () => {
        mockContext(false, "");
        const wrapper = shallow(<Places />);
        const cards = wrapper.find('[data-test="cards"]');
        const numOfCards = Object.keys(contextValues.placesStore).length;
        expect(cards.length).toBe(numOfCards);
    });

    describe("Cards values", () => {
        it("should render proper values from store", () => {
            mockContext(false, "");
            const wrapper = shallow(<Places />);
            const name = wrapper.find('[data-test="name"]');
            const url = wrapper.find('[data-test="url"]');
            const address = wrapper.find('[data-test="address"]');

            expect(name.text()).toEqual(contextValues.placesStore[1].name);
            expect(url.text()).toEqual(
                contextValues.placesStore[1].website_url
            );
            expect(address.text()).toEqual(
                contextValues.placesStore[1].address
            );
        });
    });
});
