const CollectionUtils = (function () {

    return {
        createMatrix: function (size) {
            return new Array(size).fill(null).map(() => {
                return  new Array(size).fill(null);
            });
        }
    };
})();