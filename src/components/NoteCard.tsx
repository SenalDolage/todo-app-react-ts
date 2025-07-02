import { Badge, Card, Stack } from "react-bootstrap";
import { Tag } from "../types/Note";
import { Link } from "react-router-dom";

type NoteCardProps = {
  id?: string;
  title: string;
  tags: Tag[];
};

export function NoteCard({ id, title, tags }: NoteCardProps) {
  return (
    <>
      <Card
        as={Link}
        to={`/${id}`}
        className="h-100 text-reset text-decoration-none"
      >
        <Card.Body>
          <Card.Title>{title}</Card.Title>
        </Card.Body>

        <Card.Body>
          {tags.length > 0 && (
            <Stack gap={2} direction="horizontal">
              {tags.map((tag) => (
                <Badge key={tag.id}>{tag.label}</Badge>
              ))}
            </Stack>
          )}
        </Card.Body>
      </Card>
    </>
  );
}
