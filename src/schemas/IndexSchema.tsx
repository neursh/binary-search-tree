import { State } from '@hookstate/core';
import { Suspense } from 'react';

export default function IndexSchema(props: {
  children?: React.ReactElement | React.ReactElement[];
  sceneReady?: State<boolean, object>;
}) {
  return <Suspense>{props.children}</Suspense>;
}
