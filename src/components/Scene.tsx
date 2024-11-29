import {
  Circle,
  DragControls,
  Line2Props,
  QuadraticBezierLine,
} from '@react-three/drei';
import { forwardRef, MutableRefObject, useMemo, useRef } from 'react';
import { Group, Vector3 } from 'three';

export default function Scene() {
  const demo: NodeInfo[] = useMemo(
    () => [
      {
        id: '1',
        parent: undefined,
        position: [0, 1, 1],
        children: ['2'],
      },
      {
        id: '2',
        parent: '1',
        position: [0, -1, 1],
        children: [],
      },
    ],
    []
  );

  const tracker: MutableRefObject<TrackerData> = useRef({});

  return (
    <group>
      {demo.map((value) => (
        <Node key={`node-${value.id}`} {...value} ref={tracker} />
      ))}
      {Object.entries(tracker.current).map((value) => (
        <QuadraticBezierLine
          key={`line-${value[0]}`}
          color={'black'}
          start={value[1].initialPosition}
          end={value[1].info}
          ref={(element) => {
            if (element) {
              tracker.current[value[0]].lineElements = [element];
            }
          }}
        />
      ))}
    </group>
  );
}

const Node = forwardRef<TrackerData, NodeInfo>((props, tracker) => {
  const center = useMemo(() => new Vector3(), []);

  return (
    <DragControls
      axisLock="z"
      onDrag={() => {
        const changingNode = (
          tracker as unknown as MutableRefObject<TrackerData>
        ).current[props.id];

        const position = changingNode.nodeElement.getWorldPosition(center);

        if (props.parent) {
          const parentNode = (
            tracker as unknown as MutableRefObject<TrackerData>
          ).current[props.parent];

          const childNodeNumber = parentNode.info.children.indexOf(props.id);

          if (childNodeNumber > -1 && parentNode.lineElements) {
            parentNode.lineElements[childNodeNumber].setPoints(
              parentNode.nodeElement.getWorldPosition(center),
              position
            );
          }
        }

        if (changingNode.lineElements) {
          changingNode.lineElements.forEach((line) =>
            line.setPoints(position, [0, 0, 0])
          );
        }
      }}
    >
      <group
        ref={(element) => {
          if (element) {
            (tracker as unknown as MutableRefObject<TrackerData>).current[
              props.id
            ] = {
              nodeElement: element,
              lineElements: undefined,
              initialPosition: props.position,
              info: props,
            };
          }
        }}
        position={props.position}
      >
        <Circle scale={0.5} />
      </group>
    </DragControls>
  );
});

interface NodeInfo {
  id: string;
  parent: string | undefined;
  position: [number, number, number];
  children: string[];
}

interface TrackerData {
  [key: string]: {
    nodeElement: Group;
    lineElements: Line2Props[] | undefined;
    initialPosition: [number, number, number];
    info: NodeInfo;
  };
}
