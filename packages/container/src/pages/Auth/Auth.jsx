import React, { memo, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { mount } from 'auth/AuthApp';

const AuthApp = () => {
  const root = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(root.current, {
      initialPath: history?.location?.pathname || '',
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;

        if (nextPathname !== pathname) {
          history.push(nextPathname);
        }
      }
    });

    if (history) {
      history.listen(onParentNavigate);
    }
  }, []);

  return <div ref={root} />;
};

export default memo(AuthApp);
