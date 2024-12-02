import ForceSupervisor from 'graphology-layout-force/worker';
import { useEffect, useRef } from 'react';
import Sigma from 'sigma';
import Context from '../context';

export default function DisplayGraph() {
  const container = useRef<HTMLElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (container.current && !initialized.current) {
      initialized.current = true;
      //start here
      Context.Buildtree();
      //end here
      const layout = new ForceSupervisor(Context.graph, {
        isNodeFixed: (_, attr) => attr.highlighted,
      });
      layout.start();

      const renderer = new Sigma(Context.graph, container.current);

      let draggedNode: string | null = null;
      let isDragging = false;

      renderer.on('downNode', (e) => {
        isDragging = true;
        draggedNode = e.node;
        Context.graph.setNodeAttribute(draggedNode, 'highlighted', true);
        if (!renderer.getCustomBBox())
          renderer.setCustomBBox(renderer.getBBox());
      });

      renderer.on('moveBody', ({ event }) => {
        if (!isDragging || !draggedNode) return;

        const pos = renderer.viewportToGraph(event);

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
  }, [container]);

  return <section ref={container} className="w-full h-screen"></section>;
}
