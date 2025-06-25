import { Fragment } from "react";
import { Navbar } from "../../components/Navbar"
import { Sidebar } from "../../components/Sidebar";
import { useNotes } from "../../context/notes-context";
import { NotesCard } from "../../components/NotesCard";


export const Archive = () => {
    const { archive } = useNotes();
    // console.log(archive);
    return (
        <Fragment>
            <Navbar />
            <main className="flex">
                <Sidebar />
                <div>
                    <div className="flex flex-col flex-wrap gap-6 mt-4">
                        {
                            archive?.length > 0 && archive.map(({ id, title, text, isPinned }) => (
                                <NotesCard key={id} id={id} title={title} text={text} isPinned={isPinned} />
                            ))
                        }
                    </div>
                </div>
            </main>
        </Fragment>
    );
}