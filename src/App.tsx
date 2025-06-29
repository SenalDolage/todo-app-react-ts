import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid";

import { useLocalStorage } from "./utils/useLocalStorage";
import { NewNote } from "./components/NewNote";
import { Note, RawNote, Tag } from "./types/Note";

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  function onCreateNote({ tags, ...data }: Note) {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  }

  return (
    <Container className="my-5">
      <Routes>
        <Route path="/" element={<h1>Home</h1>}></Route>
        <Route
          path="/new"
          element={<NewNote onSubmit={onCreateNote} />}
        ></Route>
        <Route path="/:id">
          <Route index element={<h1>Show</h1>}></Route>
          <Route path="edit" element={<h1>Edit</h1>}></Route>
        </Route>

        {/* navigate to home if invalid url */}
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </Container>
  );
}

export default App;
