import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectEmail } from "../../Redux/features/authSlice";

const AdminOnlyRoute = ({ children }) => {
  const userEmail = useSelector(selectEmail);
  const adminEmails = [process.env.REACT_APP_ADMIN_EMAIL1, process.env.REACT_APP_ADMIN_EMAIL2];

  if (adminEmails.includes(userEmail)) {
    return children;
  }
  return (
    <section style={{ height: "80vh" }}>
      <div className="container">
        <h2>Permission Denied.</h2>
        <p>This page can only be view by an Admin user.</p>
        <br />
        <Link to="/">
          <button className="--btn">&larr; Back To Home</button>
        </Link>
      </div>
    </section>
  );
}

export const AdminOnlyLink = ({ children }) => {
  const userEmail = useSelector(selectEmail);
  const adminEmails = [process.env.REACT_APP_ADMIN_EMAIL1, process.env.REACT_APP_ADMIN_EMAIL2];

  if (adminEmails.includes(userEmail)) {
    return children;
  }
  return null;
};

export default AdminOnlyRoute