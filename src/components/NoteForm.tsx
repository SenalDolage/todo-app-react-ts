import { FormEvent, useRef, useState } from "react";
import { Stack, Form, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router";
import Creatable from "react-select/creatable";
import { v4 as uuidV4 } from "uuid";

import { Note, Tag } from "../types/Note";

type NoteFormProps = {
  onSubmit: (data: Note) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export function NoteForm({ onSubmit, onAddTag, availableTags }: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });

    navigate("..");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={3}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} required></Form.Control>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <Creatable
                onCreateOption={(label) => {
                  const newTag = { id: uuidV4(), label };
                  onAddTag(newTag);
                  setSelectedTags((prev) => [...prev, newTag]);
                }}
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    })
                  );
                }}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="markdown">
              <Form.Label>Body</Form.Label>
              <Form.Control
                ref={markdownRef}
                as="textarea"
                required
                rows={15}
              />
            </Form.Group>
          </Col>
        </Row>
      </Stack>

      <Stack
        className="my-3 justify-content-end"
        gap={2}
        direction="horizontal"
      >
        <Button type="submit" variant="primary">
          Submit
        </Button>
        <Link to="..">
          <Button variant="outline-primary">Cancel</Button>
        </Link>
      </Stack>
    </Form>
  );
}
