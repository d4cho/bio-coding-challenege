import React from "react";
import { shallow } from "enzyme";
import BackButton from "./BackButton";

describe("BackButton Component", () => {
    describe("Renders", () => {
        it("renders button without errors", () => {
            shallow(<BackButton />);
        });

        let wrapper;
        beforeEach(() => {
            const props = {
                text: "test text",
            };
            wrapper = shallow(<BackButton {...props} />);
        });

        it("should render a link", () => {
            const link = wrapper.find('[data-test="BackButton"]');
            expect(link.length).toBe(1);
        });

        it("should render a link with text from props", () => {
            const text = wrapper.find('[data-test="BackButton"]').text();
            console.log(text);
            expect(text).toEqual("test text");
        });
    });
});
