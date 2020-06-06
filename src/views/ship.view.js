function ShipView(elem) {
    this.id = elem.id;
    this.elem = elem;
}

ShipView.prototype.setOrientation = function (orientation) {
    this.elem.classList.remove(Orientation.VERTICAL);
    this.elem.classList.remove(Orientation.HORIZONTAL);
    this.elem.classList.add(orientation);
};