import { Link } from "react-router-dom";
import "./AppHeader.css";

export const AppHeader = () => {
    return (
        <header className="App-header">
            <Link to="/guilds-members"><h1>Guild Management</h1></Link>
            <Link to="/party-finder"><h1>Party Finder</h1></Link>
        </header>
    );
};