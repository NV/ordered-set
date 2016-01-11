"use strict";

describe("OrderedSet", function() {

    it("constructor()", function() {
        var orderedSet = new OrderedSet();
        expect(orderedSet.itemsArray()).toEqualOwnProperties([]);
        expect(orderedSet.size).toBe(0);
    });

    it("constructor(uniqItemsList)", function() {
        var orderedSet = new OrderedSet(["cero", "uno", "dos", "tres"]);
        expect(orderedSet.itemsArray()).toEqualOwnProperties(["cero", "uno", "dos", "tres"]);
        expect(orderedSet.size).toBe(4);
    });

    it("constructor(nonUniqItemsList)", function() {
        var orderedSet = new OrderedSet(["cero", "cero", "uno", "cero", "dos"]);
        expect(orderedSet.itemsArray()).toEqualOwnProperties(["cero", "uno", "dos"]);
        expect(orderedSet.size).toBe(3);
    });

    it("add(uniqItem)", function() {
        var orderedSet = new OrderedSet();

        expect(orderedSet.add("zero")).toBe(0);
        expect(orderedSet.add("one")).toBe(1);
        expect(orderedSet.add("two")).toBe(2);
        expect(orderedSet.add("three")).toBe(3);

        expect(orderedSet.itemsArray()).toEqualOwnProperties(["zero", "one", "two", "three"]);
        expect(orderedSet.size).toBe(4);
    });

    it("add(nonUniqItem)", function() {
        var orderedSet = new OrderedSet();

        expect(orderedSet.add("zero")).toBe(0);
        expect(orderedSet.add("zero")).toBe(0);
        expect(orderedSet.add("one")).toBe(1);
        expect(orderedSet.add("two")).toBe(2);
        expect(orderedSet.add("one")).toBe(1);
        expect(orderedSet.add("zero")).toBe(0);
        expect(orderedSet.add("three")).toBe(3);

        expect(orderedSet.itemsArray()).toEqualOwnProperties(["zero", "one", "two", "three"]);
        expect(orderedSet.size).toBe(4);
    });

    it("delete(item)", function() {
        var orderedSet = new OrderedSet();

        orderedSet.add("zero");
        orderedSet.add("one");
        orderedSet.delete("zero");

        expect(orderedSet.itemsArray()).toEqualOwnProperties(["one"]);
        //expect(orderedSet._map.get("one")).toBe(1);

        console.log(orderedSet._map, orderedSet.itemsArray());

        orderedSet.add("zero");
        console.log(orderedSet._map, orderedSet.itemsArray());

        orderedSet.delete("one");

        expect(orderedSet.itemsArray()).toEqualOwnProperties(["zero"]);

        //expect(orderedSet.add("badger")).toBe(1);

        /*
        expect(orderedSet.delete("raccoon")).toBe(1);
        expect(orderedSet.delete("badger")).toBe(0);

        orderedSet.add("opossum");
        orderedSet.add("opossum");
        expect(orderedSet.delete("opossum")).toBe(0);
        expect(orderedSet.delete("opossum")).toBe(-1);
        expect(orderedSet.delete("doesn't exist")).toBe(-1);

        expect(orderedSet.itemsArray()).toEqualOwnProperties([]);
        expect(orderedSet.size).toBe(0);
        */
    });

    it("has(item)", function() {
        var orderedSet = new OrderedSet(["badger"]);

        expect(orderedSet.add("raccoon")).toBe(1);
        expect(orderedSet.add("opossum")).toBe(2);

        expect(orderedSet.has("badger")).toBe(true);
        expect(orderedSet.has("opossum")).toBe(true);
        expect(orderedSet.has("raccoon")).toBe(true);

        expect(orderedSet.has("hamster")).toBe(false);
        expect(orderedSet.has(0)).toBe(false);

        expect(orderedSet.itemsArray()).toEqualOwnProperties(["badger", "raccoon", "opossum"]);
        expect(orderedSet.size).toBe(3);
    });

    it("indexOf(item)", function() {
        var orderedSet = new OrderedSet(["badger", "raccoon", "opossum"]);

        expect(orderedSet.indexOf("badger")).toBe(0);
        expect(orderedSet.indexOf("raccoon")).toBe(1);
        expect(orderedSet.indexOf("opossum")).toBe(2);
        expect(orderedSet.indexOf("missing")).toBe(-1);

        orderedSet.delete("badger");
        expect(orderedSet.itemsArray()).toEqualOwnProperties(["raccoon", "opossum"]);
        //expect(orderedSet._map.te).toEqualOwnProperties(["raccoon", "opossum"]);

        expect(orderedSet.indexOf("raccoon")).toBe(1);
        expect(orderedSet.indexOf("opossum")).toBe(2);
    });

    it("keeps items ordered", function() {
        var orderedSet = new OrderedSet;

        var items = ["zero", "one", "two", "three", "four"];
        orderedSet.add(items[0]);
        orderedSet.add(items[1]);
        orderedSet.add(items[2]);
        orderedSet.add(items[3]);
        orderedSet.add(items[4]);

        orderedSet.delete(items[1]);

        expect(orderedSet.size).toBe(4);

        expect(orderedSet.itemsArray()).toEqualOwnProperties(["zero", "two", "three", "four"]);
    });

});
