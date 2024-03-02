import React, { useState } from "react";
import "./App.css";

type Note = {
  id: number;
  title: string;
  content: string;
};

const App = () => {
  // Simulate API call and store returned data in state
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "test note 1",
      content: "bla bla note1",
    },
    {
      id: 2,
      title: "test note 2 ",
      content: "bla bla note2",
    },
    {
      id: 3,
      title: "test note 3",
      content: "bla bla note3",
    },
    {
      id: 4,
      title: "test note 4 ",
      content: "bla bla note4",
    },
    {
      id: 5,
      title: "test note 5",
      content: "bla bla note5",
    },
    {
      id: 6,
      title: "test note 6",
      content: "bla bla note6",
    },
  ]);

  const [title, setTitle] = useState<String>("");
  const [content, setContent] = useState<String>("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const deleteNote = (event: React.MouseEvent, noteId: number) => {
    // Delete button is nested within a clickable note
    // Prevents delete note event from iterfering with the note click event
    event.stopPropagation();

    // Filters through array and only return notes whose ID's do not match parameter
    const updatedNotes = notes.filter((note) => note.id !== noteId);

    setNotes(updatedNotes);
  }

  const handleAddNote = (event: React.FormEvent) => {
    // Prevents the form from submitting and refreshing the page
    event.preventDefault();

    const newNote: Note = {
      id: notes.length + 1,
      title: title,
      content: content,
    };

    setNotes([...notes, newNote]);
    setTitle("");
    setContent("");
  };

  const handleUpdateNote = (event: React.FormEvent) => {
    // Prevents the form from submitting and refreshing the page
    event.preventDefault();

    if (!selectedNote) {
      return;
    }

    const updatedNote: Note = {
      id: selectedNote.id,
      title: title,
      content: content,
    };

    const updatedNotesList = notes.map((note) => (note.id===selectedNote.id ? updatedNote : note));

    setNotes(updatedNotesList);
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  }

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  return (
    <div className="app-container">
      <form className="note-form" onSubmit={(event) => (selectedNote ? handleUpdateNote(event) : handleAddNote(event))}>
        <input
          id="title-input"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          id="content-input"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Content"
          rows={10}
          required
        />
        {selectedNote ? (
          <div className="edit-buttons">
            <button type="submit">Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (<button type="submit">Add Note</button>)}
      </form>
      <h1 className="notes-grid-header">Notes</h1>
      {notes.length===0 && <p className="no-notes-body">No notes to display</p>}
      <div className="notes-grid">
        {notes.map((note) => (
          <div
            className="note-item"
            key={note.id}
            onClick={() => handleNoteClick(note)}
          >
            <div className="notes-header">
              <button onClick={(event) => deleteNote(event, note.id)}>x</button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
