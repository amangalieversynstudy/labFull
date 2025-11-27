import { render, screen, waitFor } from "@testing-library/react";
import StudentList from "../components/StudentList";
import axios from "axios";
import { vi, expect, test } from "vitest";


vi.mock("axios");

const mockStudents = [
    { id: 1, name: "John", email: "john@mail.com" },
    { id: 2, name: "Anna", email: "anna@mail.com" },
];

axios.get.mockResolvedValue({ data: mockStudents });

test("loads and displays students", async () => {
    render(<StudentList />);

    await waitFor(() => {
        expect(screen.getByText("John")).toBeInTheDocument();
        expect(screen.getByText("Anna")).toBeInTheDocument();
    });
});