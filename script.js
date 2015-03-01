var mission = load();
var bridge = new Bridge(mission);

// static elements event handling

$("#title")
    .keypress( function ( event ) {
        if ( event.which == 10 || event.which == 13 ) {
            $(this).attr("contenteditable","false");
            bridge.setTitle($(this).html());
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
            bridge.setDescription($(this).html());
            event.preventDefault();
        }
    })
    .click( function () {
        $(this).attr("contenteditable","true");
        $(this).focus();
    });


$("#add")
    .click( function () {
        bridge.missionAdd();
        reDraw();
    });

$("#iteminclude")
    .click( function () {
        bridge.missionInclude();
        reDraw();
    });

$("#itemselect")
    .click( function() {
        bridge.missionSelect();
    });

$("#itemdone")
    .click( function() {
        bridge.missionDone();
        reDraw();
    });

//

function reDraw() {
    $("#itemdone").attr("class", "option pr-" + (bridge.current().isDone?"":"un") + "done");
    $("#title").html(bridge.current().title);
    $("#description").html(bridge.current().description);
    genPath();
    genList();
    save(mission);
}

reDraw();

// path generation
function genPath(){
    var path = $("#path");
    path.empty();
    var data = bridge.missionPath;
    for ( var pathItem = 0 ; pathItem < data.length ; pathItem ++ ) {
        var title = data[pathItem].title;
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
    var data = bridge.current().subMissions;
    for ( var subItem = 0 ; subItem < data.length ; subItem ++ )
        submissions.append(createSubItem(subItem));
}

function createSubItem(subItem) {
    var data = bridge.current().subMissions;
    var title = data[subItem].title;
    var item =  $("<div class=\"mission\">")
        .append($("<span>" + title + "</span>"))
        .click((function (subItem) {
            return function () {
                bridge.goSub(data[subItem]);
                reDraw();
            }
        })(subItem));

    item.append(" (");
    for ( var progress = 0 ; progress < data[subItem].subMissions.length ; ++ progress )
        item.append($("<span class=\"progress pr-" + (data[subItem].subMissions[progress].isDone?"":"un") + "done\">"));
    if ( data[subItem].subMissions.length == 0 )
        item.append($("<span class=\"progress pr-" + (data[subItem].isDone?"":"un") + "done\">"));
    item.append(")");

    item.append($("<span class=\"remove\">Remove</span>")
        .click(function(e) {
            bridge.deleteSub(subItem);
            reDraw();
            e.stopPropagation()
        }));

    return item;
}