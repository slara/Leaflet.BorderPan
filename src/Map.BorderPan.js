/*
 * L.Map.BorderPan is handling click event on map borders, enabled by default.
 */

L.Map.mergeOptions({
    borderpan: true,
    borderPanOffset: 300,
});

L.Map.BorderPan = L.Handler.extend({

    initialize: function (map) {
        this._map = map;

        this._setPanOffset(map.options.borderPanOffset);
    },

    addHooks: function () {
        this._map.on('click', this._onClick, this);
    },

    removeHooks: function () {
        this._removeHooks();

        this._map.off('click', this._onClick, this);
    },

    _onClick: function (evt) {
        var map = this._map;

        var point = new L.Point(0, 0);
        var mapsize = map.getSize();

        if (evt.containerPoint.x > (mapsize.x - 50)) {
            point.x = map.options.borderPanOffset;
        } else if (evt.containerPoint.x < 50) {
            point.x = -map.options.borderPanOffset;
        }

        if (evt.containerPoint.y > (mapsize.y - 50)) {
            point.y = map.options.borderPanOffset;
        } else if (evt.containerPoint.y < 50) {
            point.y = -map.options.borderPanOffset;
        }

        map.panBy(point);
        L.DomEvent.stop(evt);
    },

    _setPanOffset: function (pan) {
    },

});

L.Map.addInitHook('addHandler', 'borderpan', L.Map.BorderPan);