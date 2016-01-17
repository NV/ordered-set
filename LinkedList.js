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
        return this.head.prev;
    }

    push(item)
    {
        let newNode = new LinkedListNode(item);
        let last = this.last;
        let head = this.head;

        last.next = newNode;
        newNode.next = head;
        head.prev = newNode;
        newNode.prev = last;

        this.length++;

        return newNode;
    }

    remove(node)
    {
        if (!node)
            return false;

        node.prev.next = node.next;
        node.next.prev = node.prev;

        this.length--;
        return true;
    }

    forEach(callback)
    {
        let node = this.head;
        for (let i = 0, length = this.length; i < length; i++) {
            node = node.next;
            let returnValue = callback(node.value, i);
            if (returnValue === false)
                return;
        }
    }

    toArray()
    {
        let node = this.head;
        let i = this.length;
        let result = new Array(i);
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
}


class LinkedListIterator
{
    constructor(head)
    {
        this.head = head;
        this.at = head.next;
        this.index = 0;
    }

    next()
    {
        if (this.at === this.head)
            return {done: true};

        this.index++;
        let at = this.at;
        this.at = at.next;
        return {done: false, value: at.value};
    }
}
