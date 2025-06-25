import { Fragment } from "react";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { NotesCard } from "../../components/NotesCard";
import { useNotes } from "../../context/notes-context.jsx";

export const Home = () => {

    const { title, text, notes, archive, notesDispatch } = useNotes()
    const onTitleChange = (e) => {
        notesDispatch({ type: "TITLE", payload: e.target.value });
    }

    const onTextChange = (e) => {
        notesDispatch({ type: "TEXT", payload: e.target.value });
    }
    const onAddClick = (e) => {
        notesDispatch({ type: "ADD_NOTE" });
        notesDispatch({ type: "CLEAR" });
    }
    // console.log(notes);
    const pinnedNotes = notes.filter(note => note.isPinned);
    const otherNotes = notes.filter(note => !note.isPinned);

    // console.log(archive);

    return (
        <Fragment>
            <Navbar />
            <main className="flex">
                <Sidebar />
                <div className="flex flex-col w-screen mt-7">
                    <div className="flex flex-col w-[450px] relative my-4 self-center">
                        <input value={title} onChange={onTitleChange} className="border border-neutral-800 rounded-t-md focus:outline-none border-b-0 p-1" placeholder="Enter title" />
                        <textarea value={text} onChange={onTextChange} className="h-[100px] border border-neutral-800 rounded-b-md focus:outline-none border-t-0 p-1" placeholder="Enter text" />
                        <button disabled={title.length === 0} className="w-6 h-6 absolute bottom-0 right-0 bg-[#213547] text-slate-50 rounded-full cursor-pointer" onClick={onAddClick}>
                            <span className="material-icons-outlined">add</span>
                        </button>
                    </div>
                    <div className="mt-14 ml-10 flex flex-col gap-5">
                        {
                            pinnedNotes.length > 0 && (
                                <div>
                                    <h3>Pinned Notes</h3>

                                    <div className="flex flex-wrap gap-6">
                                        {
                                            pinnedNotes?.length > 0 && pinnedNotes.map(({ id, title, text, isPinned }) => (
                                                <NotesCard key={id} id={id} title={title} text={text} isPinned={isPinned} />
                                            ))
                                        }
                                    </div>
                                </div>
                            )
                        }
                        <div>
                            {
                                pinnedNotes.length > 0 && otherNotes.length > 0 && <h3 className="mt-14">Other Notes</h3>
                            }
                            <div className="flex flex-wrap gap-6">
                                {
                                    otherNotes?.length > 0 && otherNotes.map(({ id, title, text, isPinned }) => (
                                        <NotesCard key={id} id={id} title={title} text={text} isPinned={isPinned} />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Fragment>
    );
}