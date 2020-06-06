const ShipUtils = (function () {
    return {
        getRandomOrientation: function () {
            return NumberUtils.getRandom(0, 1) === 1
                ? Orientation.HORIZONTAL
                : Orientation.VERTICAL;
        }
    };
})();