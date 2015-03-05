var mission = load() || new Tree(new Mission());
var bridge = new Bridge(mission);
// static elements event handling

$("#title")
    .keypress( function ( event ) {
        if ( event.which == 10 || event.which == 13 ) {
            $(this).attr("contenteditable","false");
            bridge.title($(this).html());
            reDraw();
            event.preventDefault();
        }
    })
    .click( function () {
        $(this).attr("contenteditable","true");
        $(this).focus();
    });

$("#description")
    .keypress( function ( event ) {
        if ( !event.shiftKey && (event.which == 10 || event.which == 13) ) {
            $(this).attr("contenteditable","false");
            bridge.description($(this).html());
            event.preventDefault();
        }
    })
    .click( function () {
        $(this).attr("contenteditable","true");
        $(this).focus();
    });

$("#deadline")
    .keypress( function ( event ) {
        if ( event.which == 10 || event.which == 13 ) {
            $(this).attr("contenteditable","false");
            bridge.deadline($(this).html());
            reDraw();
            event.preventDefault();
        }
    })
    .click( function () {
        $(this).attr("contenteditable","true");
        $(this).focus();
    });


$("#add")
    .click( function () {
        bridge.add();
        reDraw();
    });

$("#iteminclude")
    .click( function () {
        bridge.include();
        reDraw();
    });

$("#itemselect")
    .click( function() {
        bridge.select();
    });

$("#itemdone")
    .click( function() {
        bridge.done(!bridge.done());
        reDraw();
    });

$("#itemnow")
    .click( function() {
        bridge.done(!bridge.deadline(Date.now()));
        reDraw();
    });

//

function reDraw() {
    $("#itemdone").attr("class", "option pr-" + (bridge.done()?"":"un") + "done");
    $("#title").html(bridge.title());
    $("#description").html(bridge.description());

    var date = bridge.deadline();
    var dateString = (!date) ? "None" : new Date(date).format("mmm d, yyyy HH:MM:ss");
    $("#deadline").html(dateString);

    genPath();
    genList();
    save(mission);
}

reDraw();

// path generation
function genPath(){
    var path = $("#path");
    path.empty();
    var data = bridge.path;
    for ( var pathItem = 0 ; pathItem < data.length ; pathItem ++ ) {
        var title = data[pathItem].data.title;
        path.append(
            $("<span class=\"pathnode\">" + title + "</span>")
                .click((function (pathItem) {
                    return function () {
                        bridge.goPath(pathItem);
                        reDraw();
                    }
                })(pathItem))
        ).append(" / ");
    }
}

// mission list generation
function genList(){
    var submissions = $("#submissions");
    submissions.empty();
    var data = bridge.subTrees();
    for ( var subItem = 0 ; subItem < data.length ; subItem ++ )
        submissions.append(createSubItem(subItem));
}

function createSubItem(subItem) {
    var subbridge = bridge.subBridge(subItem);
    var title = subbridge.title();
    var item =  $("<div class=\"mission\">")
        .append($("<span>" + title + "</span>"))
        .click( function () {
            bridge.goSub(subbridge.current());
            reDraw();
        });

    item.append(" (");
    for ( var progress = 0 ; progress < subbridge.subTrees().length ; ++ progress )
        item.append($("<span class=\"progress pr-" + (subbridge.subBridge(progress).done()?"":"un") + "done\">"));
    if ( subbridge.subTrees().length == 0 )
        item.append($("<span class=\"progress pr-" + (subbridge.done()?"":"un") + "done\">"));
    item.append(")");

    item.append($("<span class=\"remove\">Remove</span>")
        .click(function(e) {
            bridge.deleteSub(subItem);
            reDraw();
            e.stopPropagation()
        }));

    return item;
}