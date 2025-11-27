import { render, screen } from "@testing-library/react";
import App from "../App";
import { expect, test } from "vitest";

test("renders header", () => {
    render(<App />);
    expect(screen.getByText(/Students/i)).toBeInTheDocument();
});