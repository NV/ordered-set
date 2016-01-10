"use strict";

describe("Ordered2DSet", function() {

    it("constructor()", function() {
        var set = new Ordered2DSet();
        expect(set.toArray()).toEqualOwnProperties([]);
        expect(set.size).toBe(0);
    });

    it("add(uniqA, uniqB)", function() {
        var set = new Ordered2DSet();

        set.add("zero", "one");
        set.add("two", "three");

        expect(set.toArray()).toEqualOwnProperties([["zero", "one"], ["two", "three"]]);
        expect(set.size).toBe(2);
    });

    it("add(nonUniqA, uniqB)", function() {
        var set = new Ordered2DSet();

        set.add("zero", "one");
        set.add("zero", "two");

        expect(set.toArray()).toEqualOwnProperties([["zero", "one"], ["zero", "two"]]);
        expect(set.size).toBe(2);
    });

    it("add(uniqA, nonUniqB)", function() {
        var set = new Ordered2DSet();

        set.add("zero", "one");
        set.add("two", "one");
        set.add("three", "one");

        expect(set.toArray()).toEqualOwnProperties([["zero", "one"], ["two", "one"], ["three", "one"]]);
        expect(set.size).toBe(3);
    });

    it("add(nonUniqA, nonUniqB)", function() {
        var set = new Ordered2DSet();

        set.add("zero", "one");
        set.add("two", "one");
        set.add("zero", "one");
        set.add("zero", "three");

        expect(set.toArray()).toEqualOwnProperties([["zero", "one"], ["two", "one"], ["zero", "three"]]);
        expect(set.size).toBe(3);
    });

    it("delete(existingItemA, existingItemB)", function() {
        var set = new Ordered2DSet();

        set.add(0, 1);
        set.add(2, 3);
        set.add(2, 3);

        expect(set.delete(0, 1)).toBe(true);
        expect(set.size).toBe(1);

        expect(set.delete(2, 3)).toBe(true);
        expect(set.size).toBe(0);
    });

    it("delete(missingItemA, missingItemB)", function() {
        var set = new Ordered2DSet();

        set.add(0, 1);
        set.add(2, 3);
        set.add(4, 4);

        expect(set.delete(0, 3)).toBe(false);
        expect(set.delete(2, 1)).toBe(false);
        expect(set.delete(3, 0)).toBe(false);
        expect(set.delete(4, 3)).toBe(false);
        expect(set.delete(0, 4)).toBe(false);
        expect(set.toArray()).toEqualOwnProperties([[0, 1], [2, 3], [4, 4]]);
        expect(set.size).toBe(3);
    });

    it("deleteColumn(itemA)", function() {
        var set = new Ordered2DSet();

        set.add(0, 1);
        set.add(0, 2);
        set.add(1, 0);
        set.add(2, 1);

        set.deleteColumn(0);

        expect(set.size).toBe(2);
        expect(set.toArray()).toEqual([
            [1, 0],
            [2, 1]
        ]);
    });

    it("deleteColumn(itemA)", function() {
        var set = new Ordered2DSet();

        set.add("opossum", "badger");
        set.add("opossum", "raccoon");

        set.deleteColumn("badger");
        set.deleteColumn("raccoon");

        expect(set.size).toBe(2);
        expect(set.toArray()).toEqual([
            ["opossum", "badger"],
            ["opossum", "raccoon"]
        ]);
    });

    it("has(itemA, itemB)", function() {
        var set = new Ordered2DSet();
        set.add("opossum", "badger");
        set.add("opossum", "raccoon");

        expect(set.has("opossum", "badger")).toBe(true);
        expect(set.has("opossum", "raccoon")).toBe(true);

        expect(set.has("badger", "raccoon")).toBe(false);
        expect(set.has("opossum", "opossum")).toBe(false);

        expect(set.toArray()).toEqualOwnProperties([["opossum", "badger"], ["opossum", "raccoon"]]);
        expect(set.size).toBe(2);
    });

    it("clear()", function() {
        var digits = ["zero", "one", "two"];
        var set = new Ordered2DSet();
        set.add("badger", "raccoon");
        set.clear();

        expect(set.toArray()).toEqualOwnProperties([]);
        expect(set.size).toBe(0);

        expect(digits).toEqualOwnProperties(["zero", "one", "two"]);
    });

    it("forEach", function() {
        var set = new Ordered2DSet();
        set.add("Platypus", "Sugar glider");
        set.add("Quoll", "Wallaby");

        var list = [];
        set.forEach(function(pair) {
            list.push(pair);
        });

        expect(list).toEqual([["Platypus", "Sugar glider"], ["Quoll", "Wallaby"]]);
    });

    it("for of", function() {
        var set = new Ordered2DSet();
        set.add("Quoll", "Wallaby");

        var list = [];
        for (var item of set)
            list.push(item);

        expect(list).toEqual([["Quoll", "Wallaby"]]);
    });
});
