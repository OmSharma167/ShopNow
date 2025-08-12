import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoutes() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      setOk(false);
      console.log("Spinner should appear now");
      const res = await axios.get("/api/v1/auth/user-auth");
      if (res.data.ok) {
        console.log("User authenticated");
        setOk(true);
      } else {
        console.log("User not authenticated");
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);
  return ok ? <Outlet /> : <Spinner />;
}
