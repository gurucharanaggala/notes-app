import logo from "../../assets/notes-app-icon.jpeg"
export const Navbar = () => {
    return (
        <header className="flex gap-4 px-4 py-4 border-b-2 border-gray-100">
            <div className="w-12 h-12">
                <img className="w-full h-full my-2" src={logo} alt="Logo"/>
            </div>
            <h1>NoteIt</h1>
        </header>
    );
}