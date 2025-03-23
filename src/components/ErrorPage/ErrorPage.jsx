import { Link, useRouteError } from "react-router-dom";
import "./ErrorPage.css";
import img from "../../assets/error404.svg";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="ErrorPage">
      <h1>Oops! Something went wrong</h1>
      <img className="Image" src={img} alt="404" />
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error?.statusText || error?.message}</i>
      </p>
      <button>
        <Link className="Btn" to={"/"}>
            Go back to home
        </Link>
      </button>
    </div>
  );
};

export default ErrorPage;
