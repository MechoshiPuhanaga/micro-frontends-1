import React, { memo, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';

const CustomEmployee = ({ setParam }) => {
  const match = useRouteMatch();

  useEffect(() => {
    if (typeof match?.params?.id !== 'undefined') {
      setParam(match?.params?.id);
    }
  }, [match?.params?.id, setParam]);

  return <h1>Custom Employee {match?.params?.id}</h1>;
};

export default memo(CustomEmployee);
