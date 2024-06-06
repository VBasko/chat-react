interface FormFieldProps {
  type: string;
  name: string;
  placeholder: string;
  label?: string;
  error?: boolean;
  message?: string;
}

export const FormField = (props: FormFieldProps) => {
  return (
    <>
      <label>
        <p>{props.label}</p>
        <input
          type={props.type}
          placeholder={props.placeholder}
          name={props.name}
        />
      </label>
      {props.error && <span className="error-message">{props.message}</span>}
    </>
  );
};
