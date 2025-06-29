import { Note } from "../types/Note";
import { NoteForm } from "./NoteForm";

type NewNoteProps = {
  onSubmit: (data: Note) => void;
};

export function NewNote({ onSubmit }: NewNoteProps) {
  return (
    <>
      <NoteForm onSubmit={onSubmit}></NoteForm>
    </>
  );
}
