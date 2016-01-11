"use strict";

class OrderedSet
{
    constructor(items)
    {
        // item -> index
        this._map = new Map();

        this._array = [];
        this._size = 0;

        if (items) {
            var size = items.length;
            for (var i = 0; i < size; i++)
                this.add(items[i]);
        }
    }

    add(item)
    {
        var index = this.indexOf(item);
        if (index === -1) {
            index = this._array.push(item) - 1;
            this._map.set(item, index);
            this._size++;
        }
        return index;
    }

    "delete"(item)
    {
        var index = this.indexOf(item);
        if (index !== -1) {
            this._array[index] = OrderedSet.Empty;

            this._map.delete(item);
            this._size--;
            //this._updateIndexes(index);
        }
        return index;
    }

    _updateIndexes(startIndex)
    {
        for (var i = startIndex, length = this._array.length; i < length; i++) {
            var item = this._array[i];
            this._map.set(item, i);
        }
    }

    has(item)
    {
        return this._map.has(item);
    }

    get size()
    {
        return this._size;
    }

    indexOf(item)
    {
        var index = this._map.get(item);
        return typeof index === "number" ? index : -1;
    }

    clear()
    {
        this._array = [];
        this._map = new Map;
        this._size = 0;
    }

    cleanup()
    {
        var length = this._array.length;
        if (length === 0)
            return;

        var _itemsToDelete = length - this._size;
        var deletedCount = 0;
        var newArray = [];

        //if (_itemsToDelete === 1) {
        //    Splice array
        //}

        for (var i = 0; i < length; i++) {
            var item = this._array[i];
            if (item === OrderedSet.Empty) {
                deletedCount++;
            } else {
                newArray.push(item);
                var currentIndex = this._map.get(item);
                this._map.set(item, currentIndex - deletedCount);
            }
        }
        this._array = newArray;
        this._size = newArray.length;

        if (_itemsToDelete !== deletedCount) {
            console.error("Mismatch", _itemsToDelete, deletedCount);
        }
    }

    itemsArray()
    {
        this.cleanup();
        return this._array;
    }

    getIndexByValue(item)
    {
        return this._map.get(item);
    }

}


OrderedSet.Empty = Symbol("empty");