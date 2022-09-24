class TreeStore {
    constructor(data){
        this.data = data ?? []
    }
    getAll(){
        return this.data
    }
    getItem(id){
        for ( let e of this.data )
            if ( e.id === id ) return e
        return null
    }
    getChildren(id){
        let r = []
        for ( let e of this.data )
            if ( e.parent === id ) r.push(e)
        return r
    }
    getAllChildren(id){
        let r = this.getChildren(id),
            x = []
        while(r.length){
            let e = r.pop()
            x.push(e)
            r = r.concat(this.getChildren(e.id))
        }
        return x
    }
    getAllParents(id){
        let x = this.getItem(id),
            r = []
        while(x) {
            r = r.concat(x)
            x = this.getItem(x.parent)
        }
        return r.slice(1)
    }
}

const items = [
    { id: 1, parent: 'root' },
    { id: 2, parent: 1, type: 'test' },
    { id: 3, parent: 1, type: 'test' },

    { id: 4, parent: 2, type: 'test' },
    { id: 5, parent: 2, type: 'test' },
    { id: 6, parent: 2, type: 'test' },

    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
]

const ts = new TreeStore(items)