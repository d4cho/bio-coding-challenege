import React from "react";
import { shallow } from "enzyme";
import BackButton from "./BackButton";

describe("BackButton Component", () => {
    describe("Renders", () => {
        it("renders button without errors", () => {
            shallow(<BackButton />);
        });

        it("should render a link", () => {
            const wrapper = shallow(<BackButton />);
            const link = wrapper.find('[data-test="BackButton"]');
            expect(link.length).toBe(1);
        });

        it("should render a link with text from props", () => {
            const props = {
                text: "test text",
            };
            const wrapper = shallow(<BackButton {...props} />);
            const text = wrapper.find('[data-test="BackButton"]').text();
            expect(text).toEqual(props.text);
        });
    });
});
