import { useState } from 'react';
import update from '@madappgang/update-by-path';

const useForm = (initialState, validate, submit) => {
  const [values, setValues] = useState(initialState || {});
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validate) {
      const validationResult = validate(values);

      if (Object.keys(validationResult).length > 0) {
        setErrors(validationResult);
        return;
      }
    }

    submit(values);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;

    if (name in errors) {
      setErrors(update(errors, name, ''));
    }

    setValues(update(values, name, value));
  };

  const handleBlur = ({ target }) => {
    const { name, value } = target;

    if (validate) {
      setErrors(validate(update(values, name, value)));
    }
  };

  return {
    values, errors, setValues, handleSubmit, handleChange, handleBlur,
  };
};

export default useForm;
