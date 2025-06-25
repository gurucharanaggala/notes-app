import { createContext, useContext, useReducer } from "react";
import { notesReducer } from "../reducers/notesReducer";

const NotesContext = createContext();

const NotesProvider = ({ children }) => {
    const initialState = {
        title: "",
        text: "",
        notes: JSON.parse(localStorage.getItem("notes")) || [],
        archive: JSON.parse(localStorage.getItem("archive")) || [], 
        bin: JSON.parse(localStorage.getItem("bin")) || [],
        important: JSON.parse(localStorage.getItem("important")) || []
    }

    const [{ title, text, notes, archive, bin, important }, notesDispatch] = useReducer(notesReducer, initialState);

    return (
        <NotesContext.Provider value={{title, text, notes, archive, bin, important, notesDispatch}}>
            {children}
        </NotesContext.Provider>
    );
}

const useNotes = () => useContext(NotesContext);
export { NotesProvider, useNotes };