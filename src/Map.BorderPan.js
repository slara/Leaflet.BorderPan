/*
 * L.Map.BorderPan is handling click event on map borders, enabled by default.
 */

L.Map.mergeOptions({
    borderpan: true,
    borderPanOffset: 300,
    borderWidth: 50
});

L.Map.BorderPan = L.Handler.extend({

    initialize: function (map) {
        this._map = map;

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
        var border = map.options.borderWidth;
        var pan = map.options.borderPanOffset;

        var point = new L.Point(0, 0);
        var mapsize = map.getSize();

        if (evt.containerPoint.x > (mapsize.x - border)) {
            point.x = pan;
        } else if (evt.containerPoint.x < border) {
            point.x = -pan;
        }

        if (evt.containerPoint.y > (mapsize.y - border)) {
            point.y = pan;
        } else if (evt.containerPoint.y < border) {
            point.y = -pan;
        }

        map.panBy(point);
        L.DomEvent.stop(evt);
    },

});

L.Map.addInitHook('addHandler', 'borderpan', L.Map.BorderPan);