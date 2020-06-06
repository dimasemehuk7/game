document.addEventListener('DOMContentLoaded', function () {
    const battlefieldModel = new BattlefieldModel();

    const playerBattlefieldView = new PlayerBattlefieldView(battlefieldModel);
    const appView = new AppView(battlefieldModel);
    appView.setPlayerBattlefieldView(playerBattlefieldView);

    const appController = new AppController(appView, battlefieldModel);
    appController.initialize();
});
