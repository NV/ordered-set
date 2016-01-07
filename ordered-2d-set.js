"use strict";

class Ordered2DSet
{
    constructor()
    {
        this._list = new LinkedList;

        // id -> node
        this._map = new Map;

        // itemA or itemB -> id
        this._ids = new Map;

        this._lastId = 0;
    }

    get size()
    {
        return this._list.length;
    }

    add(a, b)
    {
        var idA = this._ids.get(a);
        if (!idA) {
            idA = this._nextId();
            this._ids.set(a, idA);
        }

        var idB = this._ids.get(b);
        if (!idB) {
            idB = this._nextId();
            this._ids.set(b, idB);
        }

        var id = this._buildId(idA, idB);
        var node = this._map.get(id);
        if (node)
            node.value = [a, b];
        else {
            node = this._list.push([a, b]);
            this._map.set(id, node);
        }
    }

    "delete"(a, b)
    {
        var idA = this._ids.get(a);
        if (!idA)
            return false;

        var idB = this._ids.get(b);
        if (!idB)
            return false;

        var id = this._buildId(idA, idB);
        var node = this._map.get(id);
        if (!node) {
            // FIXME: Since we never clear this._ids maps, it can cause memory leaks.
            return false;
        }

        this._list.delete(node);
        this._map.delete(id);

        return true;
    }

    has(a, b)
    {
        var idA = this._ids.get(a);
        if (!idA)
            return false;

        var idB = this._ids.get(b);
        if (!idB)
            return false;

        return this._map.has(this._buildId(idA, idB));
    }

    clear()
    {
        this._ids = new Map;
        this._map = new Map;
        this._list = new LinkedList;
        this._lastId = 0;
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

    _buildId(idA, idB)
    {
        return idA + "-" + idB;
    }

    _nextId() {
        return ++this._lastId;
    }
}
