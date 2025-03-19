import Router from "components/Router";
import { useState, useEffect } from "react";
import { Layout } from "components/Layout";
import { auth } from "./firebaseApp";
import { ToastContainer } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import Loader from "components/loader/Loader";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser
  );
  const [init, setInit] = useState<boolean>(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setInit(true);
    });
  }, [auth]);
  return (
    <Layout>
      <ToastContainer
        theme="dark"
        autoClose={1000}
        hideProgressBar
        newestOnTop
      />
      {init ? <Router isAuthenticated={isAuthenticated} /> : <Loader />}
    </Layout>
  );
}

export default App;
