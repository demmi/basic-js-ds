const {
  NotImplementedError
} = require('../extensions/index.js');

const {
  Node
} = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
module.exports = class BinarySearchTree {

  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    let newNode = new Node(data);
    if (this.rootNode === null) {
      this.rootNode = newNode;
    } else {
      this.insert(this.rootNode, newNode)
    }
  }

  insert(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insert(node.left, newNode)
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insert(node.right, newNode)
      }
    }
  }

  has(data) {
    console.log(data)
    if (!data) {
      return false;
    }
    return this.searchData(data, this.rootNode)
  }

  searchData(data, node) {
    if (!node) return false;
    if (node.data === data) {
      return true;
    } else if (data < node.data) {
      return this.searchData(data, node.left)
    } else if (data > node.data) {
      return this.searchData(data, node.right)
    } else {
      return false;
    }
  }

  find(data) {
    if (!data) return null;
    return this.searchNode(data, this.rootNode);
  }

  searchNode(data, node) {
    if (!node) return null;
    if (data === node.data) {
      return node;
    } else if (data < node.data) {
      return this.searchNode(data, node.left)
    } else if (data > node.data) {
      return this.searchNode(data, node.right)
    } else {
      return null;
    }
  }

  minNode(node) {
    if (node.left === null)
      return node;
    else
      return this.minNode(node.left);
  }

  remove(data) {
    this.rootNode = this.removeNode(this.rootNode, data);
  }

  removeNode(node, data) {
    if (node === null) {
      return null;

    } else if (data < node.data) {
      node.left = this.removeNode(node.left, data);
      return node;

    } else if (data > node.data) {
      node.right = this.removeNode(node.right, data);
      return node;

    } else {

      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }

      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }

      let newNode = this.minNode(node.right);
      node.data = newNode.data;
      node.right = this.removeNode(node.right, newNode.data);
      return node;
    }
  }

  min() {
    if (!this.rootNode) return;
    let node = this.rootNode;
    while (node.left) {
      node = node.left
    }
    return node.data;
  }

  max() {
    if (!this.rootNode) return;
    let node = this.rootNode;
    while (node.right) {
      node = node.right
    }
    return node.data;
  }

}