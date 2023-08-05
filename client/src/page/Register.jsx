import React from "react";
import { useParams } from "react-router-dom";

const Register = () => {
  const { role } = useParams();

  return <div>{role === "company" ? <h1>company</h1> : <h1>Employee</h1>}</div>;
};

export default Register;
