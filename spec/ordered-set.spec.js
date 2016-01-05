"use strict";

describe("OrderedSet", function() {

    it("constructor()", function() {
        var orderedSet = new OrderedSet();
        expect(orderedSet.toArray()).toEqualOwnProperties([]);
        expect(orderedSet.size).toBe(0);
    });

    it("constructor(uniqItemsList)", function() {
        var orderedSet = new OrderedSet("cero", "uno", "dos", "tres");
        expect(orderedSet.toArray()).toEqualOwnProperties(["cero", "uno", "dos", "tres"]);
        expect(orderedSet.size).toBe(4);
    });

    it("constructor(nonUniqItemsList)", function() {
        var orderedSet = new OrderedSet("cero", "cero", "uno", "cero", "dos");
        expect(orderedSet.toArray()).toEqualOwnProperties(["cero", "uno", "dos"]);
        expect(orderedSet.size).toBe(3);
    });

    it("add(uniqItem)", function() {
        var orderedSet = new OrderedSet();

        orderedSet.add("zero");
        orderedSet.add("one");
        orderedSet.add("two");
        orderedSet.add("three");

        expect(orderedSet.toArray()).toEqualOwnProperties(["zero", "one", "two", "three"]);
        expect(orderedSet.size).toBe(4);
    });

    it("add(nonUniqItem)", function() {
        var orderedSet = new OrderedSet();

        orderedSet.add("zero");
        orderedSet.add("zero");
        orderedSet.add("one");
        orderedSet.add("two");
        orderedSet.add("one");
        orderedSet.add("zero");
        orderedSet.add("three");

        expect(orderedSet.toArray()).toEqualOwnProperties(["zero", "one", "two", "three"]);
        expect(orderedSet.size).toBe(4);
    });

    it("delete(item)", function() {
        var orderedSet = new OrderedSet();

        orderedSet.add("zero");
        orderedSet.add("one");
        orderedSet.delete("zero");

        expect(orderedSet.toArray()).toEqualOwnProperties(["one"]);

        orderedSet.add("zero");
        orderedSet.delete("one");

        expect(orderedSet.toArray()).toEqualOwnProperties(["zero"]);
    });

    it("has(item)", function() {
        var orderedSet = new OrderedSet("badger", "raccoon");
        orderedSet.add("opossum");

        expect(orderedSet.has("badger")).toBe(true);
        expect(orderedSet.has("opossum")).toBe(true);
        expect(orderedSet.has("raccoon")).toBe(true);

        expect(orderedSet.has("hamster")).toBe(false);
        expect(orderedSet.has(0)).toBe(false);

        expect(orderedSet.toArray()).toEqualOwnProperties(["badger", "raccoon", "opossum"]);
        expect(orderedSet.size).toBe(3);
    });

    it("clear()", function() {
        var digits = ["zero", "one", "two"];
        var orderedSet = new OrderedSet(...digits);
        orderedSet.clear();

        expect(orderedSet.toArray()).toEqualOwnProperties([]);
        expect(orderedSet.size).toBe(0);

        expect(digits).toEqualOwnProperties(["zero", "one", "two"]);
    });

    it("toArray()", function() {
        var orderedSet = new OrderedSet;

        orderedSet.add("zero");
        orderedSet.add("one");
        orderedSet.add("two");
        orderedSet.add("three");
        orderedSet.add("four");

        orderedSet.delete("one");

        expect(orderedSet.size).toBe(4);

        expect(orderedSet.toArray()).toEqualOwnProperties(["zero", "two", "three", "four"]);
    });

    it("forEach", function() {
        var orderedSet = new OrderedSet("badger", "raccoon");
        orderedSet.add("opossum");

        var list = [];
        for (var item of orderedSet)
            list.push(item);

        expect(list).toEqual(["badger", "raccoon", "opossum"]);
    });

    it("for of", function() {
        var orderedSet = new OrderedSet("badger", "raccoon");
        orderedSet.add("opossum");

        var list = [];
        for (var item of orderedSet)
            list.push(item);

        expect(list).toEqual(["badger", "raccoon", "opossum"]);
    });
});
