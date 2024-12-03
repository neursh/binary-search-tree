import { ReactElement } from 'react';

export default function Note() {
  return (
    <section className="fixed bottom-0 left-0 flex flex-col p-2 sm:text-sm text-xs">
      <Annotate>
        <div className="w-3 h-1 bg-red-600 rounded-full"></div>
        <p>Right branch</p>
      </Annotate>
      <Annotate>
        <div className="w-3 h-1 bg-blue-600 rounded-full"></div>
        <p>Left branch</p>
      </Annotate>
      <Annotate>
        <div className="w-3 h-3 bg-red-600 rounded-full"></div>
        <p>Root node</p>
      </Annotate>
      <Annotate>
        <div className="w-3 h-3 bg-black rounded-full"></div>
        <p>Node</p>
      </Annotate>
      <Annotate>
        <div className="w-3 h-3 bg-[#663399] rounded-full"></div>
        <p>Last node travelled before failing</p>
      </Annotate>
      <Annotate>
        <div className="w-3 h-3 bg-yellow-300 rounded-full"></div>
        <p>Travelled node</p>
      </Annotate>
      <Annotate>
        <div className="w-3 h-3 bg-green-600 rounded-full"></div>
        <p>Destination node</p>
      </Annotate>
    </section>
  );
}

function Annotate(props: {
  children: ReactElement | [ReactElement, ReactElement];
}) {
  return <div className="flex gap-2 items-center">{props.children}</div>;
}
