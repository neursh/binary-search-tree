import { hookstate, useHookstate } from '@hookstate/core';
import { memo, useEffect } from 'react';

const tunnelStore = hookstate<{
  [name in string]: React.ReactElement | React.ReactElement[] | undefined;
}>({});

const Tunnel = {
  In: memo(
    (props: {
      children?: React.ReactElement | React.ReactElement[];
      name: string;
    }) => {
      const tunnel = useHookstate(tunnelStore);

      useEffect(() => {
        tunnel[props.name].set(props.children);

        return () => {
          tunnel[props.name].set(<></>);
        };
      }, [props.children, props.name, tunnel]);

      return null;
    }
  ),
  Out: (props: { name: string }) => {
    const tunnel = useHookstate(tunnelStore);

    useEffect(() => {
      if (!tunnel[props.name].get()) {
        tunnel[props.name].set(<></>);
      }
    }, [props.name, tunnel]);

    return tunnel[props.name].get({ noproxy: true });
  },
};

export default Tunnel;
