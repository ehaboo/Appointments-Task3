import { Route, Routes } from "react-router-dom";
import "./Routing.css";
import List from "../../DataArea/List/List";
import Add from "../../DataArea/Add/Add";
import RouteNotFound from "../RouteNotFound/RouteNotFound";

function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/" element={<List />} />
            <Route path="/list" element={<List />} />
            <Route path="/add" element={<Add />} />
            <Route path="*" element={<RouteNotFound />} />
        </Routes>
    );
}

export default Routing;
