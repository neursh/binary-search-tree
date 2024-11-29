# Inorder Traversal of Binary Tree
Yet another school project.

# Research

## The project was made using WebGL. Why?
The original idea was to make an SVG-based visualizer, by editing and adding elements right onto it.

However, using a single SVG canvas to draw on and update with a large amount of elements
in real-time (+ animation alone) does not sound like a feasible solution,
as some of its rendering process happens on the CPU due to the reliance on DOM to change values.

To overcome this limitation, we moved to a GPU-based solution, `React Three` (`three.js`, `webgl`).

## Approach the problem

## Articles and discussions
[Inorder Traversal of Binary Tree (geeksforgeeks.org)](https://www.geeksforgeeks.org/inorder-traversal-of-binary-tree/)

SVG Performace research:
- [High CPU usage on SVG opacity animation (gsap.com/community)](https://gsap.com/community/forums/topic/16701-high-cpu-usage-on-svg-opacity-animation/)
- [Hardware acceleration and SVG (gsap.com/community)](https://gsap.com/community/forums/topic/11842-hardware-acceleration-and-svg/)
- [Heavy SVG renderer (discourse.vvvv.org)](https://discourse.vvvv.org/t/heavy-svg-renderer/16471)
- [Why don't engines ever support vector graphics? (r/gamedev)](https://old.reddit.com/r/gamedev/comments/w2x5cj/why_dont_engines_ever_support_vector_graphics/)
