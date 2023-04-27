import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import { axios_addUser } from "../services";
import { useAuth } from "../utils/context";
import { useState } from "react";
import InputField from "../components/InputField";

const registerValidationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .max(11, "Password must not exceed 10 digits")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  phone: Yup.string()
    .matches(/^\d+$/, "Phone number must contain only digits")
    .min(10, "Phone number must be at least 10 digits long")
    .max(12, "Phone number must not exceed 12 digits")
    .required("Phone number is required"),
});

const initialValues: FormValues = {
  password: "",
  confirmPassword: "",
  email: "",
  firstName: "",
  lastName: "",
  phone: "",
};

const Register = () => {
  const { login } = useAuth();
  const [regErr, setRegErr] = useState<string>("");
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const fetch_register = async (requestUser: RegisterRequest) => {
    setIsSubmiting(true);
    const response = await axios_addUser(requestUser);
    let errMsg = "Unknown error occurred!";

    if (
      !(
        response.data.status_code === 200 &&
        response.data.status_message === "OK"
      )
    ) {
      setRegErr(errMsg);
      setIsSubmiting(false);
      return;
    }

    if (response.data.errors) {
      errMsg = response.data.errors
        .map((err: any) => err.error_message)
        .join("\n");

      setIsSubmiting(false);
      setRegErr(errMsg);
      return;
    }

    login(requestUser.email, requestUser.password);
    setIsSubmiting(false);
  };

  const onSubmit = (values: FormValues) => {
    const requestUser: RegisterRequest = {
      first_name: values.firstName,
      last_name: values.lastName,
      phone: values.phone,
      password: values.password,
      confirm_password: values.confirmPassword,
      email: values.email,
    };
    fetch_register(requestUser);
  };
  return (
    <div className="container mx-auto mt-10 lg:w-1/3 border-2 border-gray-300 rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-5 text-center">Register</h2>
      {regErr && <div className="text-red-500 mt-1">{regErr}</div>}
      <Formik
        initialValues={initialValues}
        validationSchema={registerValidationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <InputField
              name="firstName"
              label="First Name"
              errors={errors}
              touched={touched}
              type="text"
            />
            <InputField
              name="phone"
              label="Phone"
              errors={errors}
              touched={touched}
              type="text"
            />
            <InputField
              name="lastName"
              label="Last Name"
              errors={errors}
              touched={touched}
              type="text"
            />
            <InputField
              name="email"
              label="Email Address"
              errors={errors}
              touched={touched}
              type="email"
            />
            <InputField
              name="password"
              label="Password"
              errors={errors}
              touched={touched}
              type="password"
              maxlength={10}
            />
            <InputField
              name="confirmPassword"
              label="Confirm Password"
              errors={errors}
              touched={touched}
              type="password"
              maxlength={10}
            />
            <div className="mb-4 text-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
                disabled={isSubmiting}
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default Register;
