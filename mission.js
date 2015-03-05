// Data type for storing in the tree
function Mission() {
    this.title = "New Title";
    this.description = "Input description here.<br>Use Shift+Enter for new line.";
    this.isDone = false;
    this.deadline = Date.now();
}

// Tree type
function Tree(data) {
    this.data = data;
    this.subTrees = [];
}