import React, { memo, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { mount } from 'team/TeamApp';

const TeamApp = () => {
  const root = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(null, {
      initialPath: history?.location?.pathname || '',
      onNavigate: (nextPathname) => {
        const { pathname } = history.location;

        if (nextPathname !== pathname) {
          history.push(nextPathname);
        }
      },
      state: history.state
    });

    if (history) {
      history.listen(onParentNavigate);
    }
  }, []);

  return <app-root></app-root>;
};

export default memo(TeamApp);
