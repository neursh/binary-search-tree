import { useThree } from '@react-three/fiber';
import { Suspense, useEffect } from 'react';
import * as THREE from 'three';
import Tunnel from './Tunnel';

interface InitialCameraConfiguration {
  position?: [number, number, number];
  lookAt?: [number, number, number];
  fov?: number;
  zoom?: number;
}

export default function SceneSchema(props: {
  children?: React.ReactElement | React.ReactElement[] | undefined;
  onReady: () => void;
  camera?: InitialCameraConfiguration;
}) {
  return (
    <Tunnel.In name="canvas-view">
      <Suspense>
        <RenderedNotification callback={props.onReady} camera={props.camera} />
        {props.children}
      </Suspense>
    </Tunnel.In>
  );
}

function RenderedNotification(props: {
  callback: () => void;
  camera?: InitialCameraConfiguration;
}) {
  const three = useThree();

  useEffect(() => {
    props.callback();
    if (props.camera) {
      if (props.camera.position) {
        three.camera.position.set(
          props.camera.position[0],
          props.camera.position[1],
          props.camera.position[2]
        );
      }
      if (props.camera.lookAt) {
        three.camera.lookAt(
          props.camera.lookAt[0],
          props.camera.lookAt[1],
          props.camera.lookAt[2]
        );
      }
      if (props.camera.fov) {
        (three.camera as THREE.PerspectiveCamera).fov = props.camera.fov;
        three.camera.updateProjectionMatrix();
      }
      if (props.camera.zoom) {
        three.camera.zoom = props.camera.zoom;
      }
    }
  }, [props, props.callback, three.camera, three.camera.position]);
  return null;
}
