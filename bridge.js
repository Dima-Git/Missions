function Bridge(mission) {
    this.missionPath = [mission];
    this.missionSelected = undefined;
}

Bridge.prototype.goPath = function(i) {
    this.missionPath = this.missionPath.slice(0,i+1);
};

Bridge.prototype.goSub = function(i) {
    this.missionPath.push(i);
};

Bridge.prototype.deleteSub = function(i) {
    this.current().subMissions.splice(i,1);
};

Bridge.prototype.current = function() {
    return this.missionPath[this.missionPath.length - 1];
};

Bridge.prototype.missionDone = function() {
    this.current().isDone = !this.current().isDone;
};

Bridge.prototype.missionAdd = function() {
    var newMission = new Mission();
    this.current().subMissions.push(newMission);
    this.goSub(newMission);
};

Bridge.prototype.missionInclude = function() {
    this.current().subMissions.push(this.missionSelected);
};

Bridge.prototype.missionSelect = function() {
    this.missionSelected = this.current();
};

Bridge.prototype.setTitle = function(s) {
    this.current().title = s;
};

Bridge.prototype.setDescription = function(s) {
    this.current().description = s;
};

