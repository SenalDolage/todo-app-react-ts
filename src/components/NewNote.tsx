import { Note, Tag } from "../types/Note";
import { NoteForm } from "./NoteForm";

type NewNoteProps = {
  onSubmit: (data: Note) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export function NewNote({ onSubmit, onAddTag, availableTags }: NewNoteProps) {
  return (
    <>
      <NoteForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      ></NoteForm>
    </>
  );
}
