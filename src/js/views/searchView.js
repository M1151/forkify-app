class SearchView{
    #parentElement = document.querySelector('.search')
    getQuery(){
        return this.#parentElement.querySelector('.search__field').value
    }

    SearchRenderHandler(handler){
        this.#parentElement.querySelector('.search__btn').addEventListener('click' , function(e){
            e.preventDefault()
            handler()
        })
    }
}

export default new SearchView()