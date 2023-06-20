import { vi, Mock } from "vitest";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import ImageGallery from ".";

import { createFetchResponse } from "../../../tests/utilities";
import { mockedFlickrResponse } from "../../../tests/fixture";

type FlickrResponseType = typeof mockedFlickrResponse;

describe("ImageGallery", () => {
  beforeAll(() => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      createFetchResponse<FlickrResponseType>(mockedFlickrResponse)
    );
  });

  afterAll(() => {
    (globalThis.fetch as Mock).mockRestore();
  });

  test("renders loading state", async () => {
    render(<ImageGallery />);

    const loader = screen.getByRole("loader");

    expect(loader).toBeInTheDocument();
  });

  test("renders component with data from fetch request", async () => {
    render(<ImageGallery />);

    await waitForElementToBeRemoved(() => screen.getByRole("loader"));
    await screen.getByText("Gräsgrön guldbagge");

    const figures = screen.getAllByRole("figure");

    expect(figures.length).toBe(mockedFlickrResponse.photos.photo.length);
  });
});
