import React from "react";
import { Link } from 'react-router-dom';
import NavHome from '../../components/layout/HomeNavBar';
import Multistep from '../../components/template/Form/ParentForm'

function SignUp() {
  return (
    <>
    <div className="h-screen md:p-16 w-full mx-auto bg-[#Fafffd] bg-bg-pattern bg-cover bg-no-repeat">
      <div>
      <NavHome theme='dark' signUpContent="Sign up to Fleex Money" />
      </div>
      <div>
        <Multistep/>
      </div>
    </div>
    </>
  );
}

export default SignUp;