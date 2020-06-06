function BattlefieldModel() {
    this.state = {
        player: {
            field: [
                ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
                ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
                ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
                ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
                ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
                ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
                ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
                ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
                ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
                ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E']
            ],
            ships: [
                {id: 'p-0', decks: 4},
                {id: 'p-1', decks: 3},
                {id: 'p-2', decks: 3},
                {id: 'p-3', decks: 2},
                {id: 'p-4', decks: 2},
                {id: 'p-5', decks: 2},
                {id: 'p-6', decks: 1},
                {id: 'p-7', decks: 1},
                {id: 'p-8', decks: 1},
                {id: 'p-9', decks: 1}
            ]
        },
        computer: {
            field: null,
            ships: []
        }
    };
    EventEmitter.call(this);
}

ClassUtils.extend(EventEmitter, BattlefieldModel);

BattlefieldModel.events = Object.freeze({
    PLAYER_STATE_CHANGED: 'PLAYER_STATE_CHANGED',
    COMPUTER_STATE_CHANGED: 'COMPUTER_STATE_CHANGED',
});

BattlefieldModel.prototype.locatePlayerShipsRandomly = function () {
    const ships = this.state.player.ships;
    const field = this.state.player.field;
    BattlefieldService.resetField(field, ships);
    BattlefieldService.locateShipsRandomly(field, ships);
    this.emit(BattlefieldModel.events.PLAYER_STATE_CHANGED, ships);
};

BattlefieldModel.prototype.locateComputerShipsRandomly = function () {
    const ships = this.state.computer.ships;
    const field = this.state.computer.field;
    BattlefieldService.locateShipsRandomly(field, ships);
    this.emit(BattlefieldModel.events.COMPUTER_STATE_CHANGED, ships);
};

BattlefieldModel.prototype.logPlayerField = function () {
    const field = this.state.player.field;
    let rows = '';
    for (let r = 0; r < 10; r++) {
        let row = '';
        for (let c = 0; c < 10; c++) {
            row += field[r][c] === CellStatus.DECK ? '▣' : '▢';
        }
        rows += row + '\n';
    }
    console.log(rows);
};