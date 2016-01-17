"use strict";

class Ordered2DSet
{
    constructor()
    {
        this._list = new LinkedList;

        // itemA -> mapB
        this._map = new Map;
    }

    get size()
    {
        return this._list.length;
    }

    add(a, b)
    {
        var mapB = this._map.get(a);
        if (!mapB) {
            mapB = new Map;
            this._map.set(a, mapB);
        }

        var node = mapB.get(b);
        if (!node) {
            node = this._list.push([a, b]);
            mapB.set(b, node);
        }

        return this;
    }

    "delete"(a, b)
    {
        var mapB = this._map.get(a);
        if (!mapB)
            return false;

        var node = mapB.get(b);
        if (!node)
            return false;

        mapB.delete(b);
        this._list.remove(node);
        return true;
    }

    deleteColumn(a)
    {
        var mapB = this._map.get(a);
        if (!mapB)
            return false;

        var list = this._list;
        mapB.forEach(function(node) {
            list.remove(node);
        });

        this._map.delete(a);
    }

    has(a, b)
    {
        var mapB = this._map.get(a);
        if (!mapB)
            return false;

        return mapB.has(b);
    }

    clear()
    {
        this._map = new Map;
        this._list = new LinkedList;
    }

    forEach(callback)
    {
        this._list.forEach(callback);
    }

    toArray()
    {
        return this._list.toArray();
    }

    toJSON()
    {
        return this.toArray();
    }

    [Symbol.iterator]()
    {
        return this._list[Symbol.iterator]();
    }

    inspect()
    {
        console.table(this._list.toArray());
    }
}
