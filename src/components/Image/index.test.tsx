import { fireEvent, render, screen } from "@testing-library/react";

import Image from ".";

const photo = {
  id: "test-id",
  owner: "test-owner",
  title: "test-title",
  secret: "test-secret",
  server: "test-server",
};

describe("Image", () => {
  it("renders Initial State", () => {
    render(<Image photo={photo} />);

    const owner = screen.getByText("test-owner");
    const title = screen.getByText("test-title");
    const buttonState = screen.getByText("Favourite");

    expect(owner).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(buttonState).toBeInTheDocument();
  });

  it("renders img with the template src (made from server, id and secret)", () => {
    render(<Image photo={photo} />);

    const img = screen.getByRole("img");
    const src = img.getAttribute("src");

    expect(src).toContain(photo.server);
    expect(src).toContain(photo.id);
    expect(src).toContain(photo.secret);
  });

  it("renders favourite state after click", () => {
    render(<Image photo={photo} />);

    const favButton = screen.getByRole("button");

    fireEvent.click(favButton);

    const buttonState = screen.getByText("Favourited");

    expect(buttonState).toBeInTheDocument();
  });

  it("renders origianl favourite state after click twice", () => {
    render(<Image photo={photo} />);

    const favButton = screen.getByRole("button");

    fireEvent.click(favButton);
    fireEvent.click(favButton);

    const buttonState = screen.getByText("Favourite");

    expect(buttonState).toBeInTheDocument();
  });
});
