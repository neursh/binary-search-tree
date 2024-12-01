import { State, useHookstate } from '@hookstate/core';
import { Circle, DragControls, Html, Line } from '@react-three/drei';
import { nanoid } from 'nanoid';
import { useMemo, useRef } from 'react';
import { Group, Vector3 } from 'three';
import { Line2, LineSegments2 } from 'three-stdlib';

export default function Scene() {
  return (
    <group>
      <Nodes></Nodes>
    </group>
  );
}

function Nodes() {
  const nodesTracer = useHookstate<NodesTracer>({});
  const linesTracer = useHookstate<LinesTracer>({});

  const idk = useMemo(() => nanoid(), []);
  const idk2 = useMemo(() => nanoid(), []);
  const idk3 = useMemo(() => nanoid(), []);
  const idk4 = useMemo(() => nanoid(), []);
  const idk5 = useMemo(() => nanoid(), []);

  return (
    <group>
      <DrawNode
        nodesTracer={nodesTracer}
        linesTracer={linesTracer}
        info={{
          id: idk,
          parent: undefined,
          children: [idk2, idk3],
          initialPosition: new Vector3(0, 0, 0),
        }}
      />
      <DrawNode
        nodesTracer={nodesTracer}
        linesTracer={linesTracer}
        info={{
          id: idk2,
          parent: idk,
          children: [],
          initialPosition: new Vector3(-1, -1, 0),
        }}
      />
      <DrawNode
        nodesTracer={nodesTracer}
        linesTracer={linesTracer}
        info={{
          id: idk3,
          parent: idk,
          children: [idk4, idk5],
          initialPosition: new Vector3(1, -1, 0),
        }}
      />
      <DrawNode
        nodesTracer={nodesTracer}
        linesTracer={linesTracer}
        info={{
          id: idk4,
          parent: idk3,
          children: [],
          initialPosition: new Vector3(2, -2, 0),
        }}
      />
      <DrawNode
        nodesTracer={nodesTracer}
        linesTracer={linesTracer}
        info={{
          id: idk5,
          parent: idk3,
          children: [],
          initialPosition: new Vector3(0, -2, 0),
        }}
      />
      {nodesTracer.keys.length == 5 && (
        <>
          <DrawLineFrom2Nodes
            nodesTracer={nodesTracer}
            linesTracer={linesTracer}
            info={{
              nodeIdOwner: idk,
              nodeChild: idk2,
            }}
          />
          <DrawLineFrom2Nodes
            nodesTracer={nodesTracer}
            linesTracer={linesTracer}
            info={{
              nodeIdOwner: idk,
              nodeChild: idk3,
            }}
          />
          <DrawLineFrom2Nodes
            nodesTracer={nodesTracer}
            linesTracer={linesTracer}
            info={{
              nodeIdOwner: idk3,
              nodeChild: idk4,
            }}
          />
          <DrawLineFrom2Nodes
            nodesTracer={nodesTracer}
            linesTracer={linesTracer}
            info={{
              nodeIdOwner: idk3,
              nodeChild: idk5,
            }}
          />
        </>
      )}
    </group>
  );
}

/**
 * # DO NOT TOUCH!!!
 * # IDK WHAT IT'S DOING,
 * ## BUT IT WORKS \OwO/
 *
 * #### UNCHARTED TERRITORY:
 * - Bearly, if not readable.
 * - React standards have been thrown out of the window.
 * - Many weird caveats, just don't change the code, and this project should be fine.
 * - You have been warned, good luck :3
 */
function DrawLineFrom2Nodes(carry: LineCarry) {
  const nodeParent = useMemo(
    () => carry.nodesTracer[carry.info.nodeIdOwner].object.get(),
    [carry.info.nodeIdOwner, carry.nodesTracer]
  );

  return (
    <Line
      ref={(lineObject) => {
        if (lineObject && !carry.linesTracer[carry.info.nodeChild].get()) {
          console.log(lineObject);
          carry.linesTracer[carry.info.nodeChild].set({
            object: lineObject,
            info: carry.info,
          });
        }
      }}
      lineWidth={2}
      transparent
      opacity={0.6}
      color={'black'}
      points={[
        nodeParent!.position,
        carry.nodesTracer[carry.info.nodeChild].object.get({
          stealth: true,
        })!.position,
      ]}
    />
  );
}

/**
 * # DO NOT TOUCH!!!
 * # IDK WHAT IT'S DOING,
 * ## BUT IT WORKS \OwO/
 *
 * #### UNCHARTED TERRITORY:
 * - Bearly, if not readable.
 * - React standards have been thrown out of the window.
 * - Many weird caveats, just don't change the code, and this project should be fine.
 * - You have been warned, good luck :3
 */
function DrawNode(carry: NodeCarry) {
  const nodeOjbect = useRef<Group | null>(null);
  const zero = useMemo(() => new Vector3(), []);

  return (
    <DragControls
      axisLock="z"
      onDrag={() => {
        if (carry.info.parent && nodeOjbect.current) {
          carry.linesTracer[carry.info.id].object
            .get()
            .geometry.setPositions([
              ...carry.nodesTracer[carry.info.parent].object
                .get()
                .getWorldPosition(zero.clone())
                .toArray(),
              ...nodeOjbect.current.getWorldPosition(zero.clone()).toArray(),
            ]);
        }
        if (carry.info.children && nodeOjbect.current) {
          carry.info.children.forEach((value) => {
            carry.linesTracer[value].object
              .get()
              .geometry.setPositions([
                ...nodeOjbect.current!.getWorldPosition(zero.clone()),
                ...carry.nodesTracer[value].object
                  .get()
                  .getWorldPosition(zero.clone()),
              ]);
          });
        }
      }}
    >
      <group
        ref={(nodeObject) => {
          if (nodeObject && !carry.nodesTracer[carry.info.id].get()) {
            nodeOjbect.current = nodeObject;
            carry.nodesTracer[carry.info.id].set({
              object: nodeObject,
              info: carry.info,
            });
          }
        }}
        position={carry.info.initialPosition}
      >
        <Html position={[0, 0.01, 2]} center>
          <input
            className="w-12 bg-transparent text-white text-center outline-none"
            type="text"
          ></input>
        </Html>
        <Circle position={[0, 0, 1]} scale={0.25}>
          <meshBasicMaterial color={'#1f2937'} toneMapped={false} />
        </Circle>
        <Circle scale={0.5}>
          <meshBasicMaterial
            color={'#1f2937'}
            transparent
            opacity={0.5}
            toneMapped={false}
          />
        </Circle>
      </group>
    </DragControls>
  );
}

/**
 * # DO NOT TOUCH!!!
 * # IDK WHAT IT'S DOING,
 * ## BUT IT WORKS \OwO/
 *
 * #### UNCHARTED TERRITORY:
 * - Bearly, if not readable.
 * - React standards have been thrown out of the window.
 * - Many weird caveats, just don't change the code, and this project should be fine.
 * - You have been warned, good luck :3
 */
interface NodePrimitiveInfo {
  id: string;
  parent: string | undefined;
  children?: string[];
  initialPosition: Vector3;
}

/**
 * # DO NOT TOUCH!!!
 * # IDK WHAT IT'S DOING,
 * ## BUT IT WORKS \OwO/
 *
 * #### UNCHARTED TERRITORY:
 * - Bearly, if not readable.
 * - React standards have been thrown out of the window.
 * - Many weird caveats, just don't change the code, and this project should be fine.
 * - You have been warned, good luck :3
 */
type NodesTracer = {
  [key: string]: { object: Group; info: NodePrimitiveInfo };
};

/**
 * # DO NOT TOUCH!!!
 * # IDK WHAT IT'S DOING,
 * ## BUT IT WORKS \OwO/
 *
 * #### UNCHARTED TERRITORY:
 * - Bearly, if not readable.
 * - React standards have been thrown out of the window.
 * - Many weird caveats, just don't change the code, and this project should be fine.
 * - You have been warned, good luck :3
 */
type LinesTracer = {
  [key: string]: { object: Line2 | LineSegments2; info: LinePrimitiveInfo };
};

/**
 * # DO NOT TOUCH!!!
 * # IDK WHAT IT'S DOING,
 * ## BUT IT WORKS \OwO/
 *
 * #### UNCHARTED TERRITORY:
 * - Bearly, if not readable.
 * - React standards have been thrown out of the window.
 * - Many weird caveats, just don't change the code, and this project should be fine.
 * - You have been warned, good luck :3
 */
type NodeCarry = {
  nodesTracer: State<NodesTracer, object>;
  linesTracer: State<LinesTracer, object>;
  info: NodePrimitiveInfo;
};

/**
 * # DO NOT TOUCH!!!
 * # IDK WHAT IT'S DOING,
 * ## BUT IT WORKS \OwO/
 *
 * #### UNCHARTED TERRITORY:
 * - Bearly, if not readable.
 * - React standards have been thrown out of the window.
 * - Many weird caveats, just don't change the code, and this project should be fine.
 * - You have been warned, good luck :3
 */
type LineCarry = {
  nodesTracer: State<NodesTracer, object>;
  linesTracer: State<LinesTracer, object>;
  info: LinePrimitiveInfo;
};

/**
 * # DO NOT TOUCH!!!
 * # IDK WHAT IT'S DOING,
 * ## BUT IT WORKS \OwO/
 *
 * #### UNCHARTED TERRITORY:
 * - Bearly, if not readable.
 * - React standards have been thrown out of the window.
 * - Many weird caveats, just don't change the code, and this project should be fine.
 * - You have been warned, good luck :3
 */
interface LinePrimitiveInfo {
  nodeIdOwner: string;
  nodeChild: string;
}
