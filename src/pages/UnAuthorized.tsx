import { Link } from "react-router";

const UnAuthorized = () => {
  return (
    <div className="flex justify-center items-center">
      <h1> You are not Authorized User for This Page</h1>
      <Link to="/">Home</Link>
    </div>
  );
};

export default UnAuthorized;
