import { ValidationError, validate } from "class-validator";
import { useEffect, useState } from "react";
import { getPayload } from "src/utils";

export const useFormControl = <T extends Object>(
  clazz: { new (): T },
  onSubmit: (payload: T) => void | Promise<void>
) => {
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [messages, setMessages] = useState<
    Partial<Record<keyof (T & { general: any }), string[]>>
  >({});
  const [isPending, setPending] = useState(false);

  const handleSubmit: React.FormEventHandler = async (event) => {
    event.preventDefault();

    const payload = Object.assign(
      new clazz(),
      getPayload(event.currentTarget as HTMLFormElement)
    );

    const errors = await validate(payload);

    if (errors.length) {
      setErrors(errors);
      return;
    }

    const possiblePromise = onSubmit(payload);

    if (possiblePromise instanceof Promise) {
      setPending(true);
      possiblePromise

        .catch((error) => {
          const vError = new ValidationError();
          vError.property = "general";
          vError.constraints = {
            general: error.message,
          };

          setErrors((currentErrors) => [...currentErrors, vError]);
        })
        .finally(() => setPending(false));
    }
  };

  const cleanErrors = () => setErrors([]);

  useEffect(() => {
    const result: typeof messages = {};

    errors.forEach((error) => {
      const key = error.property as keyof T;

      result[key] = result[key] || [];
      result[key]!.push(...Object.values(error.constraints || {}));
    });

    setMessages(result);
  }, [errors]);

  return { isPending, errors, messages, handleSubmit, cleanErrors };
};
