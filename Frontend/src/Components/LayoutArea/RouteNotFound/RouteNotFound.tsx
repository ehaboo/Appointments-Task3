import "./RouteNotFound.css";
import img from "../../../Assets/Images/404-status-code.png"

function RouteNotFound(): JSX.Element {
    return (
        <div className="RouteNotFound">
			<h1>Oooooops Page Not Found - Error 404</h1>
            <img src={img} alt="Page-Not-found" />
        </div>
    );
}

export default RouteNotFound;
