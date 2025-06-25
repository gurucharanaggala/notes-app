import { NavLink } from "react-router-dom";
export const Sidebar = () => {
    const getStyles = ({isActive}) => {
        // const styles = "flex align-middle gap-1 px-2 py-1 rounded-tr-full rounded-br-full";
        // return isActive ? `text-slate-50 bg-[#213547] ${styles}` : `hover: bg-slate-50 hover: text-slate-50 ${styles}`;
        const styles = "flex items-center gap-1 px-2 py-1 mx-2 rounded-tr-full rounded-br-full";
        return isActive ? `text-slate-50 bg-[#213547] ${styles}` : `hover:bg-[#213547] hover:text-slate-50 ${styles}`;
    
    };
    return (
        <aside className="flex flex-col gap-6 border-r-2 border-gray-100 w-[150px] h-screen mx-4">
            <NavLink to="/" className={getStyles}>
                <span className="material-icons-outlined">home</span>
                <span>Home</span>
            </NavLink>
            <NavLink to="/archive" className={getStyles}>
                <span className="material-icons-outlined">archive</span>
                <span>Archive</span>
            </NavLink>
            <NavLink to="/important" className={getStyles}>
                <span className="material-icons-outlined">label_important</span>
                <span>Important</span>
            </NavLink>
            <NavLink to="/bin" className={getStyles}>
                <span className="material-icons-outlined">delete</span>
                <span>Bin</span>
            </NavLink>
        </aside>
    );
}