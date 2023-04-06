import { FC } from "react";

type ErrorPageProps = {};
const ErrorPage: FC<ErrorPageProps> = (props) => {
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
    </div>
  );
};
export default ErrorPage;
