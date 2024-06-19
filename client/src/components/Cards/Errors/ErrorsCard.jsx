import { useEffect } from 'react';

import { useUser } from '../../../context/UserContext';

function Error({ error, onRemove }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(error);
    }, 3000);

    return () => clearTimeout(timer);
  }, [error, onRemove]);

  return (
    <article>
      <p>{error}</p>
    </article>
  );
}

function ErrorsCard() {
  const { errors, setErrors } = useUser();

  const removeError = (errorToRemove) => {
    setErrors((prevErrors) => prevErrors.filter((error) => error !== errorToRemove));
  };

  return (
    <>
      {errors && errors.map((error, index) => (
        <Error key={index} error={error} onRemove={removeError} />
      ))}
    </>
  );
}

export default ErrorsCard;