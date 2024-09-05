//App
import React, { useEffect, useState } from "react";

//Component(s)
import { useFormik } from "formik";
import { useFormContext } from "./FormContext";
import PasswordField from "../../../formFields/PasswordField";
import {
  createPassword,
  EmployeeSignUpSchema,
} from "../../../../Data/formikUtils";
import ProgressBar from "../../../Page Components/ProgressBar";
import FormButton from "../../../Buttons/FormButton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputField from "@/components/formFields/InputField";

const EmployeeSignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useFormContext();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    },
    validationSchema: EmployeeSignUpSchema,
    onSubmit: (values) => {
      setLoading(true);
      // dispatch({ type: 'SET_PASSWORD', payload: values.password });
      // dispatch({ type: 'SET_CONFIRM_PASSWORD', payload: values.confirmPassword });
      setLoading(false);
      navigate("/sign-in");
      toast.success("Password Created!");
      // Simulate a delay for form submission
      // setTimeout(() => {
      //   setLoading(false);
      //   navigate("/sign-up/identification");
      // }, 1000);
    },
  });

  return (
    <>
      <section className="flex flex-col justify-center items-center w-full ">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col justify-center items-start gap-[40px] w-[21.875em] h-[24.25em]"
        >
          <div className="flex flex-col justify-center items-start w-full gap-[16px]">
            <h1 className="text-[#101010] text-[2rem] leading-10 font-bold mb-[40px]">
              
            </h1>
            <PasswordField
              label="Password"
              placeholder="Enter your password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              name="password"
              value={formik.values.password}
              error={formik.touched.password && formik.errors.password}
              errorText={formik.errors.password}
            />
            <PasswordField
              label="Confirm Password"
              placeholder="Confirm your password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              name="confirmPassword"
              value={formik.values.confirmPassword}
              error={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              errorText={formik.errors.confirmPassword}
            />
            <InputField
              label="First Name"
              placeholder="John"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              name="firstName"
              value={formik.values.firstName}
              type="text"
              error={formik.touched.firstName && formik.errors.firstName}
              errorText={formik.errors.firstName}
            />
            <InputField
              label="Last Name"
              placeholder="Clinton"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              name="lastName"
              value={formik.values.lastName}
              type="text"
              error={formik.touched.lastName && formik.errors.lastName}
              errorText={formik.errors.lastName}
            />
            <FormButton
              btnName={"Next"}
              value={formik.values.password}
              loading={loading}
            />
          </div>
        </form>
      </section>
    </>
  );
};

export default EmployeeSignUp;
