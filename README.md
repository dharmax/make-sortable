# make-sortable

Makes a table (no matter what's the html tag type is) sortable.

## Features
* Tiny and elegant - one function, really one and zero dependencies.
* Agnostic - use it with any framework or whatever.
* Super flexible - it calls you own method to do the sorting of the data so it can be in memory data, database, with paging or however you want.  

## Install

`npm install @dharmax/make-sortable`

### CSS 
The styling of the sort direction arrows is up to you. An example (using less css):
```
.sortable {
  background-origin: content-box !important;
  &.ascending {
    background: right no-repeat var(--sort-ascending-icon);
  }
  &.descending {
    background: right no-repeat var(--sort-descending-icon);
  }
}

```

# example

also see the runnable example in the example folder

```
 //  myTableElement is the DOM element with your table.
 // Just add the 'sortable' class to the column heads you want to be sortable.
 // Note that you can add fieldname attribute to give a logical name to the column instead of the text in the TD
 makeSortable(myTableElement, sortBy)
 
 // direction is SortMode ('ascending', 'descending', 'unsorted')
function sortBy(column, direction) {
// sorts the data 
}


```

# License
This library provided as-is, with absolutely no guarantee. Enjoy, support, etc, in
short, it's [ISC](https://opensource.org/licenses/ISC).

# Support me
I'd be happy to receive a star and a million dollars. 
  

```
