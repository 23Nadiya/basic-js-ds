const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.rootTree = null;
  }

  root() {
    return this.rootTree;
  }

  add(data) {
    // this.rootTree = addWithin(this.rootTree, data);

    // function addWithin(node, data) {
    //   if (!this.rootTree) {
    //     return new Node(data);
    //   }

    //   if (node.value === data) {
    //     return node;
    //   }

    //   if (data < node.value) {
    //     node.left = addWithin(node.left, data);
    //   } else {
    //     node.right = addWithin(node.right, data);
    //   }
    //   return node;
    // }

    const newNode = new Node(data);
    if (!this.rootTree) {
      this.rootTree = newNode;
      return;
    }
    let currentNode = this.rootTree;

    while (currentNode) {
      if (newNode.value < currentNode.value) {
        if (!currentNode.left) {
          currentNode.left = newNode;
          return;
        }
        currentNode = currentNode.left;
      } else {
        if (!currentNode.right) {
          currentNode.right = newNode;
          return;
        }
        currentNode = currentNode.right;
      }
    }
  }

  has(data) {
    return searchWithin(this.rootTree, data);

    function searchWithin(node, data) {
      if (!node) {
        return false;
      }

      if (node.value === data) {
        return true;
      }

      return data < node.value
        ? searchWithin(node.left, data)
        : searchWithin(node.right, data);
    }
  }

  find(data) {
    function searchWithin(node, data) {
      if (!node) {
        return null;
      }

      if (node.value === data) {
        return data;
      }

      return data < node.value
        ? searchWithin(node.left, data)
        : searchWithin(node.right, data);
    }
    return searchWithin(this.rootTree, data);
  }

  remove(data) {
    this.rootTree = removeNode(this.rootTree, data);

    function removeNode(node, data) {
      if (!node) {
        return null;
      }

      if (data < node.value) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (node.value < data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        let minFromRight = node.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }

        node.value = minFromRight.value;

        node.right = removeNode(node.right, minFromRight.value);

        return node;
      }
    }
  }

  min() {
    if (!this.rootTree) {
      return null;
    }

    let node = this.rootTree;

    while (node.left) {
      node = node.left;
    }

    return node.value;
  }

  max() {
    if (!this.rootTree) {
      return null;
    }

    let node = this.rootTree;

    while (node.right) {
      node = node.right;
    }

    return node.value;
  }
}

module.exports = {
  BinarySearchTree,
};
