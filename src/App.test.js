import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders homepage", () => {
  render(<App />);
  const linkElement = screen.getByText(/Hotel reservation system/i);
  expect(linkElement).toBeInTheDocument();
});
