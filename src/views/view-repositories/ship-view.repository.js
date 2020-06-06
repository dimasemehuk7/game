const ShipViewRepository = (function () {
    const shipIdToShipView = {};

    return {
        add: function (shipView) {
            shipIdToShipView[shipView.id] = shipView;
        },
        getById: function (shipId) {
            return shipIdToShipView[shipId];
        }
    };
})();

