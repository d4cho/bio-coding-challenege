import React from "react";
import { mount } from "enzyme";
import PlacesProvider, { PlacesContext } from "./PlacesContext";

describe("Places Context", () => {
    let wrapper;
    beforeEach(() => {
        const TestComponent = () => {
            const { isLoading, errorMsg } = React.useContext(PlacesContext);
            return (
                <>
                    <div data-test="isLoading">{isLoading.toString()}</div>
                    <div data-test="errorMsg">{errorMsg.toString()}</div>
                </>
            );
        };
        wrapper = mount(
            <PlacesProvider>
                <TestComponent />
            </PlacesProvider>
        );
    });

    it("sets isLoading as expected", () => {
        expect(wrapper.find('[data-test="isLoading"]').text()).toEqual("true");
    });

    it("sets errorMsg as expected", () => {
        expect(wrapper.find('[data-test="errorMsg"]').text()).toEqual("");
    });
});
