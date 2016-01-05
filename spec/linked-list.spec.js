"use strict";

describe("LinkedList", function() {

    it("constructor()", function () {
        var list = new LinkedList();

        list.push("one", "two");
        expect(list.length).toBe(2);

        list.push("three");
        expect(list.length).toBe(3);

        expect(list.toArray()).toEqual(["one", "two", "three"]);

        list.clear();
        expect(list.toArray()).toEqual([]);


    });

});