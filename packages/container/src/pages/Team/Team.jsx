import React, { memo, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { mount } from 'team/TeamApp';

const TeamApp = () => {
  const root = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(null, {
      initialPath: history?.location?.pathname || '',
      onNavigate: (data) => {
        const { pathname } = history.location;
        console.log('data: ', data);
        // if (nextPathname !== pathname) {
        //   history.push(nextPathname);
        // }
      }
    });

    if (history) {
      history.listen(onParentNavigate);
    }
  }, []);

  return <app-root></app-root>;
};

export default memo(TeamApp);
