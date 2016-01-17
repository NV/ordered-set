"use strict";

describe("LinkedList", function() {

    it("constructor()", function() {
        var list = new LinkedList();

        list.push("one");
        var nodeTwo = list.push("two");
        expect(list.length).toBe(2);

        list.push("three");
        expect(list.length).toBe(3);

        expect(list.toArray()).toEqual(["one", "two", "three"]);

        list.remove(nodeTwo);
        expect(list.length).toBe(2);
        expect(list.toArray()).toEqual(["one", "three"]);

        list.clear();
        expect(list.toArray()).toEqual([]);
    });

});