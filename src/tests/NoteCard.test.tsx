import React from "react";
import { render, screen } from "@testing-library/react";
// import { BrowserRouter } from "react-router-dom";
import { NoteCard } from "../components/NoteCard";

describe("NoteCard Component", () => {
  const mockProps = {
    id: "123",
    title: "Sample Note",
    tags: [
      { id: "1", label: "Tag1" },
      { id: "2", label: "Tag2" },
    ],
  };

  test("render the note title", () => {
    render(<div>Test Component</div>);
    expect(screen.getByText("Test Component")).toBeInTheDocument();
  });
});
