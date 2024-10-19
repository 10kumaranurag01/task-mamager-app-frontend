import { useEffect } from "react";

const LogInPage = () => {
  useEffect(() => {
    const redirectToLogin = () => {
      window.location.href = window.origin + "/__catalyst/auth/login";
    };

    redirectToLogin();
  }, []);

  return <div></div>;
};

export default LogInPage;
