/**
 * This function makes a table sortable. It listens to clicks on the column headers marked with the class "sortable"
 * and react to them by changing the sort state and calling the callback.
 *
 * The TD/TH/whatever nodes which are the concrete table's column headers should have class "sortable" if you want them sortable,
 * and automatically an extra class would be added: ascending, descending (or none). Also, they could have an optional
 * attribute "fieldname" that when populated, it will be used as the logical name in the callback. Otherwise, the lower-cased
 * text in the header would be provided as a default.
 *
 * @param node - the node of the table header (the container of the column headers)
 * @param callback - the callback where the actual sorting should be performed
 */
export function makeSortable(node: HTMLElement, callback: (fieldName: string, state: SortMode) => SorterContext) {

    // @ts-ignore
    if (node.sorterContext)
        return
    // @ts-ignore
    node.sorterContext = new SorterContext(node, callback)
}

const modeClasses = ['ascending', 'descending', 'unsorted'] as const
export type SortMode = typeof modeClasses[number]

class SorterContext {

    constructor(private node: HTMLElement, callback: (fieldName: string, mode: SortMode) => SorterContext) {
        node.addEventListener('mouseup', (event: Event) => {
            const columnHeader = event.target as HTMLElement
            if (!columnHeader.classList.contains('sortable'))
                return
            event.stopPropagation()
            event.preventDefault()

            let state = this.getSortState(columnHeader)
            // normalize state
            if (!state) {
                state = 'unsorted'
                columnHeader.classList.add(state)
            }
            // determine new state
            const newStateNumber = (modeClasses.indexOf(state as SortMode) + 1) % (modeClasses.length)
            const newState = modeClasses[newStateNumber]

            clearPreviousStates()

            // change the sort state class to the new one
            columnHeader.classList.add(newState)

            // execute callback
            const fieldName = columnHeader.getAttribute('fieldname') || columnHeader.textContent
            // @ts-ignore
            callback(fieldName, newState)

        })

        const self = this

        function clearPreviousStates() {
            const sortables = node.getElementsByClassName('sortable')
            // @ts-ignore
            for (let sortable of sortables) {
                const sortState = self.getSortState(sortable)
                sortState && sortable.classList.remove(sortState)
            }
        }
    }

    getSortState(node: Element) {
        for (let smc of modeClasses)
            if (node.classList.contains(smc))
                return smc
        return null

    }
}