import Graph from 'graphology';
import { nanoid } from 'nanoid';

// tree Node
class BSTNode {
  value: number;
  added!: boolean;
  left: BSTNode | null;
  right: BSTNode | null;
  id: string | undefined;

  constructor(value: number) {
    this.value = value;
    this.added = false;
    this.left = null;
    this.right = null;
    this.id = nanoid();
  }
}
// build tree
class BinaryST {

  root: BSTNode | null;

  constructor() {
    this.root = null;
  }
  build(userInput: number[]): void {
    length = userInput.length;
    this.root = this.buildBST(userInput, 0, length - 1);
  }
  private buildBST(userInput: number[], start: number, end: number): BSTNode | null {
    if (end < start) {
      return null;
    }
    const mid: number = start + Math.floor((end - start) / 2);
    const Node = new BSTNode(userInput[mid]);
    // console.log(Node.id);
    Node.left = this.buildBST(userInput, mid + 1, end);
    Node.right = this.buildBST(userInput, start, mid - 1);
    return Node;
  }
  insert(value: number): void {
    const newNode = new BSTNode(value);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }
  private insertNode(root: BSTNode, newNode: BSTNode): void {
    if (root.value < newNode.value) {
      if (root.left === null) {
        root.left = newNode;
      }
    } else if (root.value >= newNode.value) {
      if (root.right === null) {
        root.right = newNode;
      }
    }
  }
  // i want to print the tree with inorder travelsals 
  printTreeInorder(): void {
    if (this.root === null) {
      return;
    } else {
      this.printTree(this.root);
    }
  }
  private printTree(root: BSTNode | null): void {
    if (root !== null && root.added === false) {
      console.log(root.id);
      this.printTree(root.left);
      this.printTree(root.right);
    }
  }
}
export default abstract class Context {
  static graph = new Graph();
  static Buildtree(): void {
    // Implementation of Buildtree method
    let userInput: number[] = [1, 2, 3, 4, 6, 7, 8, 9, 10];
    userInput.sort();
    let root = new BinaryST();
    root.build(userInput);
    // root.insert(10);
    root.printTreeInorder();
  }
}

