const BattlefieldService = (function () {
    return {
        locateShipsRandomly: function (field, ships) {
            ships.forEach(ship => {
                let orientation;
                let coords;
                do {
                     orientation = ShipUtils.getRandomOrientation();
                     coords = BattlefieldUtils.getRandomCellCoords();
                } while (!BattlefieldValidator.isValidPlaceForShip(field, coords, ship.decks, orientation));
                this.attachShip(field, coords, ship, orientation);
            });
        },
        attachShip: function (field, coords, ship, orientation) {
            const fromCol = coords.col;
            const toCol = orientation === Orientation.HORIZONTAL ? coords.col + ship.decks - 1 : coords.col;
            const fromRow = coords.row;
            const toRow = orientation === Orientation.HORIZONTAL ? coords.row : coords.row + ship.decks - 1;
            for (let r = fromRow; r <= toRow; r++) {
                for (let c = fromCol; c <= toCol; c++) {
                    field[r][c] = CellStatus.DECK;
                }
            }
            ship.coords = coords;
            ship.orientation = orientation;
        },
        resetField: function () {
            // TODO implement function
        }
    };
})();