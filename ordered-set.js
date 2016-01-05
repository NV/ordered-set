"use strict";

class OrderedSet
{
    constructor(...items)
    {
        this._list = new LinkedList;

        // item -> LinkedListNode
        this._map = new Map;

        if (items) {
            for (var item of items)
                this.add(item);
        }
    }

    get size()
    {
        return this._list.length;
    }

    add(item)
    {
        var node = this._map.get(item);
        if (node)
            node.value = item;
        else {
            node = this._list.push(item);
            this._map.set(item, node);
        }

        return this;
    }

    "delete"(item)
    {
        var node = this._map.get(item);
        if (!node)
            return false;

        this._map.delete(item);
        this._list.delete(node);
        return true;
    }

    has(item)
    {
        return this._map.has(item);
    }

    clear()
    {
        this._map = new Map;
        this._list = new LinkedList;
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
}
