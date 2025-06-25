import { v4 as uuid } from "uuid";
export const notesReducer = (state, { type, payload }) => {
    switch (type) {
        case "TITLE":
            return {
                ...state, title: payload
            };
        case "TEXT":
            return {
                ...state, text: payload
            };
        case "ADD_NOTE": {
            const newNotes = [...state.notes, { id: uuid(), title: state.title, text: state.text, isPinned: false }];
            localStorage.setItem("notes", JSON.stringify(newNotes));
            return {
                ...state,
                notes: [...state.notes, { id: uuid(), title: state.title, text: state.text, isPinned: false }]
            };
        }
        case "CLEAR":
            return {
                ...state, title: "", text: ""
            }
        case "PIN": {
            const newNotes = state.notes.map(note => note.id === payload.id ? { ...note, isPinned: true } : note);
            localStorage.setItem("notes", JSON.stringify(newNotes));
            return {
                ...state, notes: state.notes.map(note => note.id === payload.id ? { ...note, isPinned: true } : note)
            };
        }
        case "UNPIN": {
            const newNotes = state.notes.map(note =>
                note.id === payload.id ? { ...note, isPinned: false } : note
            );
            localStorage.setItem("notes", JSON.stringify(newNotes));
            return {
                ...state, notes: state.notes.map(note => note.id === payload.id ? { ...note, isPinned: false } : note)
            };
        }
        case "ADD_TO_ARCHIVE": {
            const archivedNote = state.notes.find(({ id }) => id === payload.id);
            if (!archivedNote) return state; // Safety check

            const newNotes = state.notes.filter(({ id }) => id !== payload.id);
            const newArchive = [...state.archive, archivedNote];

            localStorage.setItem("notes", JSON.stringify(newNotes));
            localStorage.setItem("archive", JSON.stringify(newArchive));
            return {
                ...state,
                archive: [...state.archive, state.notes.find(({ id }) => id === payload.id)],
                notes: state.notes.filter(({ id }) => id !== payload.id)
            };
        }
        case "REMOVE_FROM_ARCHIVE": {
            const restoredNote = state.archive.find(({ id }) => id === payload.id);
            if (!restoredNote) return state; // Safety check

            const newArchive = state.archive.filter(({ id }) => id !== payload.id);
            const newNotes = [...state.notes, restoredNote];

            localStorage.setItem("notes", JSON.stringify(newNotes));
            localStorage.setItem("archive", JSON.stringify(newArchive));
            return {
                ...state,
                notes: [...state.notes, state.archive.find(({ id }) => id === payload.id)],
                archive: state.archive.filter(({ id }) => id !== payload.id)
            };
        }
        case "MOVE_TO_BIN": {
            const deletedNote = state.notes.find(({ id }) => id === payload.id)
                || state.archive.find(({ id }) => id === payload.id) || state.important.find(({id}) => id === payload.id);
            if (!deletedNote) return state; // Safety check

            const newNotes = state.notes.filter(({ id }) => id !== payload.id);
            const newArchive = state.archive.filter(({ id }) => id !== payload.id);
            const newImportant = state.important.filter(({id}) => id !== payload.id);
            const newBin = [...state.bin, deletedNote];

            localStorage.setItem("notes", JSON.stringify(newNotes));
            localStorage.setItem("archive", JSON.stringify(newArchive));
            localStorage.setItem("important", JSON.stringify(newImportant));
            localStorage.setItem("bin", JSON.stringify(newBin));
            return {
                ...state,
                bin: newBin,
                archive: newArchive,
                notes: newNotes,
                important: newImportant
            };
        }
        case "DELETE_FROM_BIN": {
            const newBin = state.bin.filter(({ id }) => id !== payload.id);
            localStorage.setItem("bin", JSON.stringify(newBin));
            return {
                ...state,
                bin: state.bin.filter(({ id }) => id !== payload.id)
            };
        }
        case "RESTORE_FROM_BIN": {
            const newNotes = [...state.notes, state.bin.find(({ id }) => id === payload.id)];
            const newBin = state.bin.filter(({ id }) => id !== payload.id);
            localStorage.setItem("bin", JSON.stringify(newBin));
            localStorage.setItem("notes", JSON.stringify(newNotes));
            return {
                ...state,
                notes: newNotes,
                bin: newBin
            }
        }
        case "MOVE_TO_IMPORTANT": {
            const important = [...state.important, state.notes.find(({ id }) => id === payload.id)];
            const newNotes = state.notes.filter(({ id }) => id !== payload.id);
            localStorage.setItem("notes", JSON.stringify(newNotes));
            localStorage.setItem("important", JSON.stringify(important));
            return {
                ...state,
                notes: newNotes,
                important: important
            };
        }
        case "REMOVE_FROM_IMPORTANT": {
            const newNotes = [...state.notes, state.important.find(({id}) => id === payload.id)];
            const important = state.important.filter(({id}) => id !== payload.id);
            localStorage.setItem("notes", JSON.stringify(newNotes));
            localStorage.setItem("important", JSON.stringify(important));
            return {
                ...state,
                notes: newNotes,
                important
            }
        }
        default:
            return state;
    }
}