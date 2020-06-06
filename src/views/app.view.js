const AppView = function (battlefieldModel) {
    this.battlefieldModel = battlefieldModel;

    document.addEventListener('mousedown', (event) => {
        if (event.button !== 0) {
            return;
        }
        const shipElem = this.getShipElemFromEventTarget(event);
        if (shipElem) {
            this.onDragStart(shipElem, event);
        }
    });
};

AppView.prototype.onInit = function () {
    document.querySelectorAll('.ship').forEach(shipElem => {
         ShipViewRepository.add(new ShipView(shipElem));
    });
    // TODO get auto-location-btn and handle click
    const autoLocationBtnElem = document.getElementById('auto-location-btn');
    autoLocationBtnElem.addEventListener('', function () {
        this.emit(AppView.events.LOCATE_PLAYER_SHIPS_RANDOMLY);
    });
    this.playerBattlefieldView.onInit();
};

AppView.prototype.setPlayerBattlefieldView = function (playerBattlefieldView) {
    this.playerBattlefieldView = playerBattlefieldView;
};

AppView.prototype.onDragStart = function (element, event) {
    const startX = event.pageX;
    const startY = event.pageY;
    const elemPositionX = element.offsetLeft;
    const elemPositionY = element.offsetTop;
    const shiftX = startX - elemPositionX;
    const shiftY = startY - elemPositionY;

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    function onMouseMove(event) {
        element.style.left = `${event.pageX - shiftX}px`;
        element.style.top = `${event.pageY - shiftY}px`;
    }

    function onMouseUp() {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
    }
};

AppView.prototype.getShipElemFromEventTarget = function (event) {
    const targetElem = event.target;
    return targetElem.classList.contains('ship') ? targetElem : null;
};

