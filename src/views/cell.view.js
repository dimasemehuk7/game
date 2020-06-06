function CellView(elem) {
    this.elem = elem;
}

CellView.prototype.attach = function (shipView) {
    this.elem.appendChild(shipView.elem);
};