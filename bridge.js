function Bridge(tree) {
    this.path = [tree];
    this.treeSelected = undefined;
}

// #### Methods
Bridge.prototype.goPath = function(i) {
    this.path = this.path.slice(0,i+1);
};

Bridge.prototype.goSub = function(i) {
    this.path.push(i);
};

Bridge.prototype.deleteSub = function(i) {
    this.current().subTrees.splice(i,1);
};

Bridge.prototype.add = function() {
    this.subTrees().push(new Tree(new Mission()));
};

Bridge.prototype.include = function() {
    if ( this.treeSelected !== undefined )
        this.subTrees().push(this.treeSelected);
};

Bridge.prototype.select = function() {
    this.treeSelected = this.current();
};

// ##### Getters
Bridge.prototype.current = function() {
    return this.path[this.path.length - 1];
};

Bridge.prototype.data = function() {
    return this.current().data;
};

Bridge.prototype.subTrees = function() {
    return this.current().subTrees;
};

Bridge.prototype.subBridge = function(i) {
    return new Bridge(this.subTrees()[i]);
};

// ##### Get\Setters
Bridge.prototype.done = function(value) {
    if ( value !== undefined )
        this.data().isDone = value;
    return this.data().isDone;
};

Bridge.prototype.title = function(value) {
    if ( value !== undefined )
        this.data().title = value;
    return this.data().title;
};

Bridge.prototype.description = function(value) {
    if ( value !== undefined )
        this.data().description = value;
    return this.data().description;
};

Bridge.prototype.deadline = function(value) {
    if ( value !== undefined )
        this.data().deadline = new Date(value).valueOf();
    return this.data().deadline;
};
