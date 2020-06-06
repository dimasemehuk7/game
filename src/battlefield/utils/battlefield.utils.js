const BattlefieldUtils = (function () {
    return {
        getRandomCellCoords: function () {
            return {
                row: NumberUtils.getRandom(0, AppProperties.FIELD_SIZE - 1),
                col: NumberUtils.getRandom(0, AppProperties.FIELD_SIZE - 1)
            };
        }
    };
})();