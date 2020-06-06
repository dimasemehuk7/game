const PlayerBattlefieldView = function (battlefieldModel) {
    this.battlefieldModel = battlefieldModel;
    this.field = [];
};

PlayerBattlefieldView.prototype.onInit = function () {
    this.battlefieldModel.on(BattlefieldModel.events.PLAYER_STATE_CHANGED, playerShips => {
        this.updatePlayerView(playerShips);
    });
    this.renderField();
    this.fillFieldByCellViews();
};

PlayerBattlefieldView.prototype.renderField = function () {
    const battlefieldElem = document.getElementById('player-battlefield');
    const letters = 'А,Б,В,Г,Д,Е,Ж,З,И,К'.split(',');
    const templateStr = document.getElementById('battlefield-tmpl');
    // TODO extract template engine from this class
    const template = Handlebars.compile(templateStr.innerHTML);
    const rows = [];
    for (let row = 0; row < AppProperties.FIELD_SIZE; row++) {
        rows[row] = [];
        for (let col = 0; col < AppProperties.FIELD_SIZE; col++) {
            let colLabel = row === 0 ? col + 1 : null;
            let rowLabel = col === 0 ? letters[row] : null;
            rows[row][col] = {row, col, rowLabel, colLabel};
        }
    }
    battlefieldElem.innerHTML = template({rows: rows});
};

PlayerBattlefieldView.prototype.fillFieldByCellViews = function () {
    this.field = CollectionUtils.createMatrix(AppProperties.FIELD_SIZE);
    document.querySelectorAll(`.battlefield__cell`).forEach(cellElem => {
        const row = cellElem.dataset.row;
        const col = cellElem.dataset.col;
        this.field[row][col] = new CellView(cellElem);
    });
};

PlayerBattlefieldView.prototype.updatePlayerView = function (playerShips) {
    playerShips.forEach((ship, i) => {
        const shipView = ShipViewRepository.getById(ship.id);
        const cellView = this.field[ship.coords.row][ship.coords.col];
        shipView.setOrientation(ship.orientation);
        cellView.attach(shipView);
    });
};