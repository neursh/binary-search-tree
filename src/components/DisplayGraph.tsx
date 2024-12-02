import Graph from 'graphology';
import ForceSupervisor from 'graphology-layout-force/worker';
import { useEffect, useRef } from 'react';
import Sigma from 'sigma';

export default function DisplayGraph() {
  const container = useRef<HTMLElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (container.current && !initialized.current) {
      initialized.current = true;
      const graph = new Graph();

      graph.addNode('1', {
        label: 'Nigga 1',
        x: 0,
        y: 0,
        size: 30,
        color: '#1f2937',
      });
      graph.addNode('2', {
        label: 'Nigga 2',
        x: 1,
        y: 1,
        size: 30,
        color: '#1f2937',
      });
      graph.addEdge('1', '2', { size: 5, color: '#1f2937' });

      const layout = new ForceSupervisor(graph, {
        isNodeFixed: (_, attr) => attr.highlighted,
      });
      layout.start();

      const renderer = new Sigma(graph, container.current);

      let draggedNode: string | null = null;
      let isDragging = false;

      renderer.on('downNode', (e) => {
        isDragging = true;
        draggedNode = e.node;
        graph.setNodeAttribute(draggedNode, 'highlighted', true);
        if (!renderer.getCustomBBox())
          renderer.setCustomBBox(renderer.getBBox());
      });

      renderer.on('moveBody', ({ event }) => {
        if (!isDragging || !draggedNode) return;

        const pos = renderer.viewportToGraph(event);

        graph.setNodeAttribute(draggedNode, 'x', pos.x);
        graph.setNodeAttribute(draggedNode, 'y', pos.y);

        event.preventSigmaDefault();
        event.original.preventDefault();
        event.original.stopPropagation();
      });

      const handleUp = () => {
        if (draggedNode) {
          graph.removeNodeAttribute(draggedNode, 'highlighted');
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
