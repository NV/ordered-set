## What is it?

It's an implementation of an Ordered Set.

## Why would I need that?

OrderedSet has O(1) time complexity for has/add/delete operations.

It is ordered, so you can iterate over set's values in the order they were inserted.

## Why not use an Array then?

Removing an item from an array is O(n) time operation. Say, we have an array:

    array = ["Platypus", "Opossum", "Wallaby"]

Removing the first item from an array (by using `array.shift()` or `array.splice(0, 1)`)
shifts all the following items by one. That means all indexes for all
the following items, "Opossum" and "Wallaby" in our case, needs to be
updated.

Now, let's say we have an array of 1,000,000 items. Removing the first item
requires updating 999,999 indexes — it's O(n) time complexity.

Now, let's say we have a linked list of 1,000,000 items. Removing the first item
requires to update 2 pointers, same if our list had only 5 items — it's O(1) time complexity.

## Why not use a native Set? It's already ordered.

Good question.

Iterating over a Set or Map is 30-40 times slower than iterating over an array
and is 3-13 times slower than iterating over a linked list.

[JSPerf](http://jsperf.com/linked-list-vs-arraw-iteration-speed/4)

Hopefully, this will improve over time and make this library obsolete.
There is an open issue on [WebKit bug tracker](https://bugs.webkit.org/show_bug.cgi?id=152691).

Until it's fixed, continue reading.

This repository has two OrderedSet implementations: one is backed by a doubly linked list,
another is backed by an array.

Unlike an array, a linked list has O(1) time complexity for has/add/delete operations.

## Why would I use Array backed Ordered Set?

Arrays are faster to iterate than linked lists. 3 times faster in Safari 9, 11 times faster in Chrome 47. 

Item removal is O(n), but here is the trick...

We don't have to delete the items, we can replace them with `undefined` or `Symbol("Empty slot")`. Replacing is O(1) operation and is fast.

[TODO: Add a JSPerf link]

Array-backed OrderedSet is a sound approach when iteration speed is important and removal isn't.

### So, does Array backed Ordered Set has O(n) time complexity for removal operation?

Yes and no. It's Θ(1) amortised time.

If you've ever taken Computer Science 101 class, you may remember how Dynamic arrays work.
If not, go ahead and read about [Dynamic array on Wikipedia](https://en.wikipedia.org/wiki/Dynamic_array):

> The simplest dynamic array is constructed by allocating a fixed-size array and then dividing it into two parts:
> the first stores the elements of the dynamic array and the second is reserved, or unused. We can then add or 
> remove elements at the end of the dynamic array in constant time by using the reserved space, until this
> space is completely consumed. The number of elements used by the dynamic array contents is its logical size
> or size, while the size of the underlying array is called the dynamic array's capacity or physical size,
> which is the maximum possible size without relocating data.

![](https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Dynamic_array.svg/289px-Dynamic_array.svg.png)

Inserting an item at the end of a dynamic array is Θ(1) amortised time.
"Amortised" time means that sometimes, very rarely, the operation would have a different time complexity,
e.g. O(n).

> Consider a dynamic array that grows in size as more elements are added to it such as an ArrayList in Java.
> If we started out with a dynamic array of size 4, it would take constant time to push four elements onto it.
> Yet pushing a fifth element onto that array would take longer as the array would have to create a new array
> of double the current size (8), copy the old elements onto the new array, and then add the new element.
> The next three push operations would similarly take constant time, and then the subsequent addition would
> require another slow doubling of the array size.
>
> ![](https://upload.wikimedia.org/wikipedia/commons/e/e5/AmortizedPush.png)
>
> In general if we consider an arbitrary number of pushes n to an array of size n, we notice that push
> operations take constant time except for the last one which takes O(n) time to perform the size doubling operation.
> Since there were n operations total we can take the average of this and find that for pushing elements onto the
> dynamic array takes O(n/n) = O(1), constant time.

Back to Array-backed OrderedSet.

The cleanup operation is performed only when there are too many empty slots in the array.

### What is *too many*?

Dynamic arrays have what's called growth factor.

![](https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Dynamic_array.svg/289px-Dynamic_array.svg.png)

Here, the growth factor is 2. The array capacity doubles, grows by the factor of 2, when 2nd, 3rd and 5th items are inserted.

Similarly to dynamic arrays, we can define a shrinkage factor — a ratio of empty slots to non-empty slots.
A shrinkage factor of 1 would mean to perform a clean up when a number of empty slots equals non-empty slots.

    [2, ×, 5, 1, ×, 4]

This array has 2 empty slots (marked as ×) and 4 non-empty items.
With a shrinkage factor of 1, removing an item would force a clean up,
as there would be 2 empty slots and 3 non-empty items: 3/3 = 1.

The removal operation is Θ(1) amortised time, which means that sometimes, very rarely,
it needs to perform O(n) cleanup but most of the time it is Θ(1).
