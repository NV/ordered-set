"use strict";

class LinkedList
{
    constructor()
    {
        this.head = new LinkedListNode;
        this.head.next = this.head.prev = this.head;
        this.length = 0;
    }

    clear()
    {
        this.head.next = this.head.prev = this.head;
        this.length = 0;
    }

    get last()
    {
        return this.head.prev || this.head;
    }

    push(...items)
    {
        var last = this.last;
        for (let item of items) {
            var newNode = new LinkedListNode(item);
            last.addAfter(newNode);
            last = newNode;
        }

        this.length += items.length;

        return last;
    }

    "delete"(node)
    {
        if (!node)
            return false;

        node.delete();
        this.length--;
        return true;
    }

    forEach(callback)
    {
        var node = this.head;
        for (var i = 0, length = this.length; i < length; i++) {
            node = node.next;
            var returnValue = callback(node.value, i);
            if (returnValue === false)
                return;
        }
    }

    toArray()
    {
        var node = this.head;
        var i = this.length;
        var result = new Array(i);
        while (i--) {
            node = node.prev;
            result[i] = node.value;
        }
        return result;
    }

    toJSON()
    {
        return this.toArray();
    }

    [Symbol.iterator]()
    {
        return new LinkedListIterator(this.head);
    }
}


class LinkedListNode
{
    constructor(value)
    {
        this.value = value;
        this.prev = null;
        this.next = null;
    }

    "delete"()
    {
        this.prev.next = this.next;
        this.next.prev = this.prev;
    }

    addBefore(node)
    {
        var prev = this.prev;
        this.prev = node;
        node.prev = prev;
        prev.next = node;
        node.next = this;
    }

    addAfter(node)
    {
        var next = this.next;
        this.next = node;
        node.next = next;
        next.prev = node;
        node.prev = this;
    }
}


class LinkedListIterator
{
    constructor(head) {
        this.head = head;
        this.at = head.next;
        this.index = 0;
    }

    next() {
        if (this.at === this.head)
            return {done: true};
        else {
            this.index++;
            var at = this.at;
            this.at = at.next;
            return {done: false, value: at.value};
        }
    }
}
