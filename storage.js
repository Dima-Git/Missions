function recsearch(tree, linear) {
    for ( var i = 0 ; i < linear.length ; ++ i )
        if ( linear[i].link == tree )
            return i;
    return recinclude(tree, linear);
}

function recinclude(tree, linear) {
    var idx = linear.length;
    linear[idx] = {
        link:           tree,
        data:           tree.data,
        indexes:        []
    };
    for ( var i = 0 ; i < tree.subTrees.length ; ++ i )
        linear[idx].indexes[i] = recsearch(tree.subTrees[i], linear);
    return idx;
}

function save(root) {
    var linear = [];
    recinclude(root, linear);
    for ( var i = 0 ; i < linear.length ; ++ i )
        delete linear[i].link;
    localStorage.setItem("save", JSON.stringify(linear));
}

function construct(i, forest, linear) {
    forest[i] = new Tree(linear[i].data);
    linear[i].indexes.forEach(function(j){
        if ( forest[j] === undefined )
            forest[j] = construct(j, forest, linear);
        forest[i].subTrees.push(forest[j]);
    });
    return forest[i];
}

function load() {
    var linear = JSON.parse(localStorage.getItem("save"));
    if ( linear === null ) return null;
    var forest = [];
    return construct(0, forest, linear);
}