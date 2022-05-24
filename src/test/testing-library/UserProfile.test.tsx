import React from "react";
import {render, fireEvent, act, waitFor} from "@testing-library/react";
import UserProfile from "./UserProfile";
import { rendererToJson } from "../../utils/test";

jest.useFakeTimers();

describe("<UserProfile />", () => {
  // it("Should render default", () => {
  //   const { tree } = rendererToJson(<UserProfile />);
  //   expect(tree).toMatchSnapshot();
  // });

  it("should render default", () => {
    const { getByText, getByTestId } = render(<UserProfile />);

    expect(getByText("User Profile")).toBeInTheDocument();

    expect(getByTestId("text-hello")).not.toBeInTheDocument();
  })

  it("Should display the profile", async () => {
    const userProfile = {
      name: "Jon Doe",
    };

    const fetchMock = jest.spyOn(global, "fetch");

    fetchMock.mockImplementationOnce(() => {
      return Promise.resolve({
        // json: () => Promise.resolve(userProfile),
        json: () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(userProfile);
            }, 500);
          });
        },
      }) as any;
    });

    const { getByTestId, getByText, container } = render(<UserProfile />);

    const button = getByTestId("request-profile");

    fireEvent.click(button);

    // await act(async () => {
    //   fireEvent.click(button);
    // });


    jest.advanceTimersByTime(500);

    // jest.runAllTimers(); // <- explicitly tell jest to run all setTimeout, setInterval


    //jest.advanceTimersByTime(1000);

    // 5s
    await waitFor(() => {
      expect(button).not.toBeInTheDocument();
    });

    // expect(button).not.toBeInTheDocument();

    expect(fetchMock).toBeCalled();

    getByText(`Hello ${userProfile.name}`);

    // expect(container.firstChild).toMatchSnapshot();
  });
});
