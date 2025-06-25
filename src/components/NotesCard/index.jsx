import { useNotes } from "../../context/notes-context.jsx";
import { findNotesInArchive } from "../../utils/findNotesInArchive.js";
import { findNotesInBin } from "../../utils/findNotesInBin.js";
import { findNotesInImportant } from "../../utils/findNotesInImportant.js";
export const NotesCard = ({ id, title, text, isPinned }) => {

    const { notesDispatch, archive, bin, important } = useNotes();
    console.log(important);


    const isNotesInArchive = findNotesInArchive(archive, id);
    const isNotesInBin = findNotesInBin(bin, id);
    const isNotesInImportant = findNotesInImportant(important, id);

    const onPinClick = (id) => {
        !isPinned ? notesDispatch({
            type: "PIN",
            payload: { id }
        }) : notesDispatch({
            type: "UNPIN",
            payload: { id }
        });
    };

    const onArchiveClick = (id) => {
        !isNotesInArchive ? notesDispatch({
            type: "ADD_TO_ARCHIVE",
            payload: { id }
        }) : notesDispatch({
            type: "REMOVE_FROM_ARCHIVE",
            payload: { id }
        })
    };

    const onDeleteClick = (id) => {
        !isNotesInBin ? notesDispatch({
            type: "MOVE_TO_BIN",
            payload: { id }
        }) : notesDispatch({
            type: "DELETE_FROM_BIN",
            payload: { id }
        })
    };

    const onRestoreFromBinClick = (id) => {
        notesDispatch({
            type: "RESTORE_FROM_BIN",
            payload: { id }
        });
    };

    const onImportantClick = (id) => {
        !isNotesInImportant ? notesDispatch({
            type: "MOVE_TO_IMPORTANT",
            payload: { id }
        }) : notesDispatch({
            type: "REMOVE_FROM_IMPORTANT",
            payload: { id }
        });
    };

    return (
        <div key={id} className="p-2 rounded-md border border-neutral-800 w-[300px]">
            <div className="flex justify-between">
                <p>{title}</p>
                {
                    !isNotesInArchive && !isNotesInBin && !isNotesInImportant &&
                    <button onClick={() => onPinClick(id)}>
                        <span className={isPinned ? "material-icons" : "material-icons-outlined"}>push_pin</span>
                    </button>
                }

            </div>
            <div className="flex flex-col">
                <p>{text}</p>
                <div className="ml-auto">
                    {
                        !isNotesInArchive && !isNotesInBin &&
                        <button onClick={() => onImportantClick(id)}>
                            <span className="material-icons-outlined">label_important</span>
                        </button>
                    }
                    {
                        !isNotesInBin && !isNotesInImportant &&
                        <button onClick={() => onArchiveClick(id)}>
                            <span className={isNotesInArchive ? "material-icons" : "material-icons-outlined"}>archive</span>
                        </button>
                    }
                    {
                        isNotesInBin &&
                        <button onClick={() => onRestoreFromBinClick(id)}>
                            <span className="material-icons-outlined">restore_from_trash</span>
                        </button>
                    }
                    <button onClick={() => onDeleteClick(id)}>
                        <span className="material-icons-outlined">delete</span>
                    </button>
                </div>
            </div>
        </div>
    );
}