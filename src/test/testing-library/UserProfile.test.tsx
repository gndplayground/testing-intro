import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import UserProfile from "./UserProfile";
import { rendererToJson } from "../../utils/test";

describe("<UserProfile />", () => {
  it("Should render default", () => {
    const { tree } = rendererToJson(<UserProfile />);
    expect(tree).toMatchSnapshot();
  });

  it("Should display the profile", async () => {
    const userProfile = {
      name: "Jon Doe",
    };

    const fetchMock = jest.spyOn(global, "fetch");

    fetchMock.mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve(userProfile),
        // json: () => {
        //   return new Promise((resolve) => {
        //     setTimeout(() => {
        //       resolve(userProfile);
        //     }, 500);
        //   });
        // },
      }) as any;
    });

    const { getByTestId, getByText, container } = render(<UserProfile />);

    const button = getByTestId("request-profile");

    await act(async () => {
      fireEvent.click(button);
    });

    // --env=jsdom-fourteen
    // await waitFor(() => {
    //   expect(button).not.toBeInTheDocument();
    // });

    expect(button).not.toBeInTheDocument();

    expect(fetchMock).toBeCalled();

    getByText(`Hello ${userProfile.name}`);

    expect(container.firstChild).toMatchSnapshot();
  });
});
