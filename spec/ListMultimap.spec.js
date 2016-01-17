"use strict";

describe("ListMultimap", function() {

    it("constructor()", function() {
        let set = new ListMultimap();
        expect(set.toArray()).toEqualOwnProperties([]);
        expect(set.size).toBe(0);
    });

    it("add(uniqA, uniqB)", function() {
        let multimap = new ListMultimap();

        multimap.add("zero", "one").add("two", "three");

        expect(multimap.toArray()).toEqualOwnProperties([["zero", "one"], ["two", "three"]]);
        expect(multimap.size).toBe(2);
    });

    it("add(nonUniqA, uniqB)", function() {
        let multimap = new ListMultimap();

        multimap.add("zero", "one");
        multimap.add("zero", "two");

        expect(multimap.toArray()).toEqualOwnProperties([["zero", "one"], ["zero", "two"]]);
        expect(multimap.size).toBe(2);
    });

    it("add(uniqA, nonUniqB)", function() {
        let multimap = new ListMultimap();

        multimap.add("zero", "one");
        multimap.add("two", "one");
        multimap.add("three", "one");

        expect(multimap.toArray()).toEqualOwnProperties([["zero", "one"], ["two", "one"], ["three", "one"]]);
        expect(multimap.size).toBe(3);
    });

    it("add(nonUniqA, nonUniqB)", function() {
        let multimap = new ListMultimap();

        multimap.add("zero", "one");
        multimap.add("two", "one");
        multimap.add("zero", "one");
        multimap.add("zero", "three");

        expect(multimap.toArray()).toEqualOwnProperties([["zero", "one"], ["two", "one"], ["zero", "three"]]);
        expect(multimap.size).toBe(3);
    });

    it("delete(existingItemA, existingItemB)", function() {
        let multimap = new ListMultimap();

        multimap.add(0, 1);
        multimap.add(2, 3);
        multimap.add(2, 3);

        expect(multimap.delete(0, 1)).toBe(true);
        expect(multimap.size).toBe(1);

        expect(multimap.delete(2, 3)).toBe(true);
        expect(multimap.size).toBe(0);
    });

    it("delete(missingItemA, missingItemB)", function() {
        let multimap = new ListMultimap();

        multimap.add(0, 1);
        multimap.add(2, 3);
        multimap.add(4, 4);

        expect(multimap.delete(0, 3)).toBe(false);
        expect(multimap.delete(2, 1)).toBe(false);
        expect(multimap.delete(3, 0)).toBe(false);
        expect(multimap.delete(4, 3)).toBe(false);
        expect(multimap.delete(0, 4)).toBe(false);
        expect(multimap.toArray()).toEqualOwnProperties([[0, 1], [2, 3], [4, 4]]);
        expect(multimap.size).toBe(3);
    });

    it("deleteAll(existingItemA)", function() {
        let multimap = new ListMultimap();

        multimap.add(0, 1);
        multimap.add(0, 2);
        multimap.add(1, 0);
        multimap.add(2, 1);

        expect(multimap.deleteAll(0)).toBe(true);

        expect(multimap.size).toBe(2);
        expect(multimap.toArray()).toEqual([
            [1, 0],
            [2, 1]
        ]);
    });

    it("deleteAll(missingItemA)", function() {
        let multimap = new ListMultimap();

        multimap.add("opossum", "badger");
        multimap.add("opossum", "raccoon");

        expect(multimap.deleteAll("badger")).toBe(false);
        expect(multimap.deleteAll("raccoon")).toBe(false);

        expect(multimap.size).toBe(2);
        expect(multimap.toArray()).toEqual([
            ["opossum", "badger"],
            ["opossum", "raccoon"]
        ]);
    });

    it("has(itemA, itemB)", function() {
        let multimap = new ListMultimap();
        multimap.add("opossum", "badger");
        multimap.add("opossum", "raccoon");

        expect(multimap.has("opossum", "badger")).toBe(true);
        expect(multimap.has("opossum", "raccoon")).toBe(true);

        expect(multimap.has("badger", "raccoon")).toBe(false);
        expect(multimap.has("opossum", "opossum")).toBe(false);

        expect(multimap.toArray()).toEqualOwnProperties([["opossum", "badger"], ["opossum", "raccoon"]]);
        expect(multimap.size).toBe(2);
    });

    it("clear()", function() {
        let digits = ["zero", "one", "two"];
        let multimap = new ListMultimap();
        multimap.add("badger", "raccoon");
        multimap.clear();

        expect(multimap.toArray()).toEqualOwnProperties([]);
        expect(multimap.size).toBe(0);

        expect(digits).toEqualOwnProperties(["zero", "one", "two"]);
    });

    it("forEach", function() {
        let multimap = new ListMultimap();
        multimap.add("Platypus", "Sugar glider");
        multimap.add("Quoll", "Wallaby");

        let list = [];
        multimap.forEach(function(pair) {
            list.push(pair);
        });

        expect(list).toEqual([["Platypus", "Sugar glider"], ["Quoll", "Wallaby"]]);
    });

    xit("for of", function() {
        let multimap = new ListMultimap();
        multimap.add("Quoll", "Wallaby");

        let list = [];
        for (let item of multimap)
            list.push(item);

        expect(list).toEqual([["Quoll", "Wallaby"]]);
    });
});
