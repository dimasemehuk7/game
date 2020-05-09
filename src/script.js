document.addEventListener('DOMContentLoaded', function () {
    const battlefieldElem = document.getElementById('player-battlefield');
    const AppProperties = {
        FIELD_SIZE: 10
    };
    const Orientation = {
        HORIZONTAL: 'horizontal',
        VERTICAL: 'vertical'
    };
    const CellStatus = {
        EMTPY: 'E',
        DECK: 'D'
    };

    renderGrid(battlefieldElem);

    document.addEventListener('mousedown', function (event) {
        if (event.button !== 0) {
            return;
        }
        const shipElem = getShipElemFromEventTarget(event);
        if (shipElem) {
            onDragStart(shipElem, event);
        }
    });

    function onDragStart(element, event) {
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
    }

    function getShipElemFromEventTarget(event) {
        const targetElem = event.target;
        return targetElem.classList.contains('ship') ? targetElem : null;
    }

    function renderGrid(battlefieldElem) {
        const letters = 'А,Б,В,Г,Д,Е,Ж,З,И,К'.split(',');
        const templateStr = document.getElementById('battlefield-tmpl');
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
    }

   
    function extend(parent, child) {
        const f = new Function();
        f.prototype = parent.prototype;
        child.prototype = new f();
        child.prototype.constructor = child;
    }
    
    function EventEmitter() {
        this._eventToListeners = {};
    }
    
    EventEmitter.prototype.on = function (eventName, listener) {
        this._eventToListeners[eventName] = this._eventToListeners[eventName] || [];
        this._eventToListeners[eventName].push(listener);
        return this;
    };
    
    EventEmitter.prototype.emit = function (eventName, data) {
        if (this._eventToListeners[eventName]) {
            this._eventToListeners[eventName].forEach(function (listener) {
                listener(data);
            });
        }
    };
    
    function AppModel() {
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
                ships: []
            },
            computer: {
                field: null,
                ships: []
            }
        };
        EventEmitter.call(this);
    }
    
    extend(AppModel, EventEmitter);
    
    AppModel.prototype.isValidPlaceForShip = function(field, coords, decks, orientation) {
        if (orientation === Orientation.HORIZONTAL && (coords.c + decks) > AppProperties.FIELD_SIZE) {
            return false;
        }
        if (orientation === Orientation.VERTICAL && (coords.r + decks) > AppProperties.FIELD_SIZE) {
            return false;
        }
        const maxIndex = AppProperties.FIELD_SIZE - 1;
        const fromCol = Math.max(coords.c - 1, 0);
        const toCol = orientation === Orientation.HORIZONTAL
            ? Math.min(coords.c + decks, maxIndex)
            : Math.min(coords.c + 1, maxIndex);
        const fromRow = Math.max(coords.r - 1, 0);
        const toRow = orientation === Orientation.HORIZONTAL
            ? Math.min(coords.r + 1, maxIndex)
            : Math.min(coords.r + decks, maxIndex);
        for (let r = fromRow; r <= toRow; r++) {
            for (let c = fromCol; c <= toCol; c++) {
                if (field[r][c] !== CellStatus.EMTPY) {
                    return false;
                }
            }
        }
        return true;
    }
});
