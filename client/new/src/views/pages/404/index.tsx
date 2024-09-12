import { useNavigate } from "@solidjs/router";

function NotFound() {
  const navigate = useNavigate();
  navigate("/404");

  return (
    <>
    </>
  );
}

export default NotFound;