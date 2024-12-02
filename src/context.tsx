import Graph from 'graphology';
import { nanoid } from 'nanoid';

// tree Node
class BSTNode {
  value: number;
  added: boolean = false;
  left: BSTNode | null = null;
  right: BSTNode | null = null;
  id: string | undefined = nanoid();

  constructor(value: number) {
    this.value = value;
  }
}

// build tree
class BinaryST {
  root: BSTNode | null = null;

  build(userInput: number[]): void {
    const length = userInput.length;
    this.root = this.buildBST(userInput, 0, length - 1);
  }

  private buildBST(
    userInput: number[],
    start: number,
    end: number
  ): BSTNode | null {
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
    if (!this.root) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  private insertNode(root: BSTNode, newNode: BSTNode): void {
    if (root.value < newNode.value) {
      if (!root.left) {
        root.left = newNode;
      }
    } else if (root.value >= newNode.value) {
      if (!root.right) {
        root.right = newNode;
      }
    }
  }

  // i want to print the tree with inorder travelsals
  printTreeInorder(): void {
    if (this.root) {
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
    const userInput: number[] = [1, 2, 3, 4, 6, 7, 8, 9, 10];
    userInput.sort();
    const root = new BinaryST();
    root.build(userInput);
    // root.insert(10);
    root.printTreeInorder();
  }
}
