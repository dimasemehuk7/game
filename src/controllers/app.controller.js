const AppController = function (appView, battlefieldModel) {
    this.appView = appView;
    this.battlefieldModel = battlefieldModel;
};

AppController.prototype.initialize = function () {
    this.appView.onInit();
    this.battlefieldModel.locatePlayerShipsRandomly();
    // this.appView.on(AppView.events.LOCATE_PLAYER_SHIPS_RANDOMLY, () => {
    //     this.battlefieldModel.locatePlayerShipsRandomly();
    // });
};