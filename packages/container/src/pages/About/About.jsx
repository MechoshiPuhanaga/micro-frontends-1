import React, { memo, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { mount } from 'about/AboutApp';

const AboutApp = () => {
  const root = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(root.current, {
      initialPath: history?.location?.pathname || '',
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;

        console.log('pathname: ', pathname);

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

export default memo(AboutApp);
