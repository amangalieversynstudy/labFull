import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StudentList from "../components/StudentList";
import axios from "axios";
import { vi, expect, test } from "vitest";

vi.mock("axios");

test("POST creates a new student", async () => {
axios.get.mockResolvedValueOnce({ data: [] });
axios.post.mockResolvedValueOnce({ data: { id: 1, name: "Test", email: "t@mail.com" } });
axios.get.mockResolvedValueOnce({ data: [{ id: 1, name: "Test", email: "t@mail.com" }] });

render(<StudentList />);

userEvent.click(screen.getByText(/Add Student/i));

userEvent.type(screen.getByLabelText(/Name/i), "Test");
userEvent.type(screen.getByLabelText(/Email/i), "t@mail.com");

userEvent.click(screen.getByText(/Save/i));

await waitFor(() => expect(screen.getByText("Test")).toBeInTheDocument());
});

test("PUT edits an existing student", async () => {
axios.get.mockResolvedValueOnce({ data: [{ id: 1, name: "Old Name", email: "old@mail.com" }] });
axios.put.mockResolvedValueOnce({});
axios.get.mockResolvedValueOnce({ data: [{ id: 1, name: "New Name", email: "new@mail.com" }] });

render(<StudentList />);

userEvent.click(screen.getAllByRole("button", { name: /edit/i })[0]);

const nameInput = screen.getByLabelText(/Name/i);
userEvent.clear(nameInput);
userEvent.type(nameInput, "New Name");

userEvent.click(screen.getByText(/Save/i));

await waitFor(() => expect(screen.getByText("New Name")).toBeInTheDocument());
});

test("DELETE removes a student", async () => {
axios.get.mockResolvedValueOnce({ data: [{ id: 1, name: "DeleteMe", email: "d@mail.com" }] });
axios.delete.mockResolvedValueOnce({});
axios.get.mockResolvedValueOnce({ data: [] });

render(<StudentList />);

userEvent.click(screen.getAllByRole("button", { name: /delete/i })[0]);

await waitFor(() => expect(screen.queryByText("DeleteMe")).not.toBeInTheDocument());
});