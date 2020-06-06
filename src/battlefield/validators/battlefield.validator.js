const BattlefieldValidator = (function () {
    return {
        isValidPlaceForShip: function (field, coords, decks, orientation) {
            if (orientation === Orientation.HORIZONTAL && (coords.col + decks) > AppProperties.FIELD_SIZE) {
                return false;
            }
            if (orientation === Orientation.VERTICAL && (coords.row + decks) > AppProperties.FIELD_SIZE) {
                return false;
            }
            const maxIndex = AppProperties.FIELD_SIZE - 1;
            const fromCol = Math.max(coords.col - 1, 0);
            const toCol = orientation === Orientation.HORIZONTAL
                ? Math.min(coords.col + decks, maxIndex)
                : Math.min(coords.col + 1, maxIndex);
            const fromRow = Math.max(coords.row - 1, 0);
            const toRow = orientation === Orientation.HORIZONTAL
                ? Math.min(coords.row + 1, maxIndex)
                : Math.min(coords.row + decks, maxIndex);
            for (let r = fromRow; r <= toRow; r++) {
                for (let c = fromCol; c <= toCol; c++) {
                    if (field[r][c] !== CellStatus.EMPTY) {
                        return false;
                    }
                }
            }
            return true;
        },
    };
})();