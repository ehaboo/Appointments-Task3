import { NavLink } from "react-router-dom";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <nav className="Menu">
            <NavLink to="/list">Meetings List</NavLink>
            <NavLink to="/add">Add Meeting</NavLink>
        </nav>
    );
}

export default Menu;
