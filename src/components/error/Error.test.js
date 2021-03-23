import React from "react";
import { shallow } from "enzyme";
import Error from "./Error";

describe("Error Component", () => {
    it("renders without errors", () => {
        shallow(<Error />);
    });

    it("renders errorMsg from props", () => {
        const props = {
            errorMsg: "test error msg",
        };
        const wrapper = shallow(<Error {...props} />);
        const msg = wrapper.find('[data-test="ErrorComponent"]').text();
        expect(msg).toEqual("test error msg");
    });
});
