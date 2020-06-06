const ClassUtils = (function () {
    return {
        extend: function (parent, child) {
            const f = new Function();
            f.prototype = parent.prototype;
            child.prototype = new f();
            child.prototype.constructor = child;
        }
    }
})();