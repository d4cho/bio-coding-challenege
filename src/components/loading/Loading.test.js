import React from "react";
import { shallow } from "enzyme";
import Loading from "./Loading";

describe("Loading Component", () => {
    let wrapper;
    beforeEach(() => {
        const props = {
            loadingMsg: "test loading msg",
        };
        wrapper = shallow(<Loading {...props} />);
    });

    it("should render a div with text from props", () => {
        const text = wrapper.find('[data-test="loadingMsg"]').text();
        expect(text).toEqual("test loading msg");
    });

    it("should render a loading bar component", () => {
        const loadingBar = wrapper.find('[data-test="loadingBar"]');
        expect(loadingBar.length).toBe(1);
    });
});
