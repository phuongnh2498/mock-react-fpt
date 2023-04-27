import { FormikErrors, FormikTouched, ErrorMessage, Field } from "formik";

interface InputFieldProps {
  name: keyof FormValues;
  label: string;
  type: string;
  maxlength?: number;
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  type,
  errors,
  touched,
  maxlength,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2" htmlFor={name}>
        {label}
      </label>
      <Field
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          errors[name] && touched[name] ? "border-red-500" : ""
        }`}
        maxLength={maxlength}
        type={type}
        name={name}
      />
      <ErrorMessage name={name} className="text-red-500 mt-2" />
    </div>
  );
};
export default InputField;
