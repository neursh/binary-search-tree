import ForceSupervisor from 'graphology-layout-force/worker';
import { forwardRef, MutableRefObject, useEffect } from 'react';
import Sigma from 'sigma';
import Context from '../context';

const DisplayGraph = forwardRef<HTMLElement>((_, container) => {
  container = container as MutableRefObject<HTMLElement>;

  useEffect(() => {
    let renderer: Sigma | null = null;
    let layout: ForceSupervisor | null = null;

    if (container.current) {
      layout = new ForceSupervisor(Context.graph, {
        isNodeFixed: (id, attr) =>
          attr.highlighted || Context.tree.root?.id === id,
      });
      layout.start();

      renderer = new Sigma(Context.graph, container.current, {
        labelSize: 24,
      });

      let draggedNode: string | null = null;
      let isDragging = false;

      renderer.on('downNode', (e) => {
        isDragging = true;
        draggedNode = e.node;
        Context.graph.setNodeAttribute(draggedNode, 'highlighted', true);
        if (!renderer!.getCustomBBox())
          renderer!.setCustomBBox(renderer!.getBBox());
      });

      renderer.on('moveBody', ({ event }) => {
        if (!isDragging || !draggedNode) return;

        const pos = renderer!.viewportToGraph(event);

        Context.graph.setNodeAttribute(draggedNode, 'x', pos.x);
        Context.graph.setNodeAttribute(draggedNode, 'y', pos.y);

        event.preventSigmaDefault();
        event.original.preventDefault();
        event.original.stopPropagation();
      });

      const handleUp = () => {
        if (draggedNode) {
          Context.graph.removeNodeAttribute(draggedNode, 'highlighted');
        }
        isDragging = false;
        draggedNode = null;
      };
      renderer.on('upNode', handleUp);
      renderer.on('upStage', handleUp);
    }

    return () => {
      if (layout) {
        layout.kill();
      }
      if (renderer) {
        renderer.kill();
      }
    };
  }, [container]);

  return <section ref={container} className="w-full h-screen"></section>;
});

export default DisplayGraph;
