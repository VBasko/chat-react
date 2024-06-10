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
      <div className="">
        {props.label && (
          <label htmlFor={`${props.name.toLowerCase()}`}>{props.label}</label>
        )}
        <input
          id={`${props.name}`}
          type={props.type}
          placeholder={props.placeholder}
          name={props.name.toLowerCase()}
          className="block w-full px-4 py-2 bg-black border-2 border-grey-light rounded-md text-sm placeholder-grey-light focus:outline-none focus:border-green focus:ring-1 focus:ring-green disabled:bg-grey-dark disabled:border-grey-dark invalid:border-red-light invalid:text-red-light
      focus:invalid:border-red-light focus:invalid:ring-red-light"
        />
      </div>
      {props.error && <span className="text-sm text-red">{props.message}</span>}
    </>
  );
};
