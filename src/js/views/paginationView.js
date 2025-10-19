import { View } from "./view.js";
import icons from 'url:../../img/icons.svg';

class PaginationView extends View{
    _parentElement = document.querySelector('.pagination')


  _generateMarkup() {
    const pagesNum = Math.ceil(this._data.result.length/this._data.resPerPage)
     const curPage = this._data.page
    
    // page 1 and other pages
    if(curPage === 1 && pagesNum > 1 ){
        return this._generatePaginationButton('next' , curPage)
    }
    // other page
    if(curPage >1 && pagesNum>curPage ){
        return `
            ${this._generatePaginationButton('prev' , curPage)}
            ${this._generatePaginationButton('next' , curPage)}
                
        `
    }
    // last page 
    if(curPage === pagesNum && pagesNum>1){
        return this._generatePaginationButton('prev' , curPage)
    }
    // page 1 and no other pages
    if(curPage === pagesNum && pagesNum===1){
        return ``
    }
  }
  _generatePaginationButton(state , pageNum){
    return `
    <button  data-goto = ${state==='prev'?pageNum-1:pageNum+1} class="btn--inline pagination__btn--${state}">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-${state==='prev'?'left':'right'}"></use>
            </svg>
            <span>Page ${state==='prev'?pageNum-1:pageNum+1}</span>
    </button>
    `
  }
  paginationBtnHandler(handler){
    this._parentElement.addEventListener('click' , function(e){
        e.preventDefault()
        const btn = e.target.closest('.btn--inline')
        if (!btn) return
        const gotoPage = +btn.dataset.goto
        handler(gotoPage)
        
    })
  }
}
export default new PaginationView()