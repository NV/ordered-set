"use strict";

describe("Ordered2DSet", function() {

    it("constructor()", function() {
        let set = new Ordered2DSet();
        expect(set.toArray()).toEqualOwnProperties([]);
        expect(set.size).toBe(0);
    });

    it("add(uniqA, uniqB)", function() {
        let set = new Ordered2DSet();

        set.add("zero", "one").add("two", "three");

        expect(set.toArray()).toEqualOwnProperties([["zero", "one"], ["two", "three"]]);
        expect(set.size).toBe(2);
    });

    it("add(nonUniqA, uniqB)", function() {
        let set = new Ordered2DSet();

        set.add("zero", "one");
        set.add("zero", "two");

        expect(set.toArray()).toEqualOwnProperties([["zero", "one"], ["zero", "two"]]);
        expect(set.size).toBe(2);
    });

    it("add(uniqA, nonUniqB)", function() {
        let set = new Ordered2DSet();

        set.add("zero", "one");
        set.add("two", "one");
        set.add("three", "one");

        expect(set.toArray()).toEqualOwnProperties([["zero", "one"], ["two", "one"], ["three", "one"]]);
        expect(set.size).toBe(3);
    });

    it("add(nonUniqA, nonUniqB)", function() {
        let set = new Ordered2DSet();

        set.add("zero", "one");
        set.add("two", "one");
        set.add("zero", "one");
        set.add("zero", "three");

        expect(set.toArray()).toEqualOwnProperties([["zero", "one"], ["two", "one"], ["zero", "three"]]);
        expect(set.size).toBe(3);
    });

    it("delete(existingItemA, existingItemB)", function() {
        let set = new Ordered2DSet();

        set.add(0, 1);
        set.add(2, 3);
        set.add(2, 3);

        expect(set.delete(0, 1)).toBe(true);
        expect(set.size).toBe(1);

        expect(set.delete(2, 3)).toBe(true);
        expect(set.size).toBe(0);
    });

    it("delete(missingItemA, missingItemB)", function() {
        let set = new Ordered2DSet();

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

    it("deleteColumn(existingItemA)", function() {
        let set = new Ordered2DSet();

        set.add(0, 1);
        set.add(0, 2);
        set.add(1, 0);
        set.add(2, 1);

        expect(set.deleteColumn(0)).toBe(true);

        expect(set.size).toBe(2);
        expect(set.toArray()).toEqual([
            [1, 0],
            [2, 1]
        ]);
    });

    it("deleteColumn(missingItemA)", function() {
        let set = new Ordered2DSet();

        set.add("opossum", "badger");
        set.add("opossum", "raccoon");

        expect(set.deleteColumn("badger")).toBe(false);
        expect(set.deleteColumn("raccoon")).toBe(false);

        expect(set.size).toBe(2);
        expect(set.toArray()).toEqual([
            ["opossum", "badger"],
            ["opossum", "raccoon"]
        ]);
    });

    it("has(itemA, itemB)", function() {
        let set = new Ordered2DSet();
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
        let digits = ["zero", "one", "two"];
        let set = new Ordered2DSet();
        set.add("badger", "raccoon");
        set.clear();

        expect(set.toArray()).toEqualOwnProperties([]);
        expect(set.size).toBe(0);

        expect(digits).toEqualOwnProperties(["zero", "one", "two"]);
    });

    it("forEach", function() {
        let set = new Ordered2DSet();
        set.add("Platypus", "Sugar glider");
        set.add("Quoll", "Wallaby");

        let list = [];
        set.forEach(function(pair) {
            list.push(pair);
        });

        expect(list).toEqual([["Platypus", "Sugar glider"], ["Quoll", "Wallaby"]]);
    });

    it("for of", function() {
        let set = new Ordered2DSet();
        set.add("Quoll", "Wallaby");

        let list = [];
        for (let item of set)
            list.push(item);

        expect(list).toEqual([["Quoll", "Wallaby"]]);
    });
});
