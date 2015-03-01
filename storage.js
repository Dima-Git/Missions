function recsearch(mission, data) {
    for ( var i = 0 ; i < data.length ; ++ i )
        if ( data[i].mission == mission )
            return i;
    return recinclude(mission, data);
}

function recinclude(mission, data) {
    var idx = data.length;
    data[idx] = {};
    data[idx].title = mission.title;
    data[idx].mission = mission;
    data[idx].description = mission.description;
    data[idx].subMissions = [];
    for ( var i = 0 ; i < mission.subMissions.length ; ++ i ) {
        console.log("searchin");
        data[idx].subMissions[i] = recsearch(mission.subMissions[i], data);
    }
    return idx;
}

function save(rootMission) {
    var data = [];
    recinclude(rootMission, data);
    for ( var i = 0 ; i < data.length ; ++ i )
        delete data[i].mission;
    localStorage.setItem("save", JSON.stringify(data));
}

function construct(i, missions, data) {
    var mission = new Mission();
    mission.title = data[i].title;
    mission.description = data[i].description;
    console.log( JSON.stringify( data[i] ));
    for ( var j = 0 ; j < data[i].subMissions.length ; ++ j ) {
        if ( missions[data[i].subMissions[j]] === undefined )
            missions[data[i].subMissions[j]] = construct(data[i].subMissions[j], missions, data);
        mission.subMissions[j] = missions[data[i].subMissions[j]];
    }
    mission[i] = mission;
    return mission;
}

function load() {
    var data = JSON.parse(localStorage.getItem("save"));
    if ( data === null ) return new Mission();
    var missions = [];
    return construct(0, missions, data);
}