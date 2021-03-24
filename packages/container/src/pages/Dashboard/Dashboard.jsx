import React, { memo, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { mount } from 'dashboard/DashboardApp';

const Dashboard = () => {
  const root = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(root.current, {
      defaultMode: 'abstract',
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

  return (
    <div>
      <div ref={root} />
    </div>
  );
};

export default memo(Dashboard);
