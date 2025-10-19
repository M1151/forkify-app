import icons from 'url:../../img/icons.svg';
import { View } from './view.js';

class generatePreview extends View {
  _parentElement;

  constructor(parentElement){
    super()
    this._parentElement = parentElement;
    
    }
  _generateMarkup() {
    return this._data.map(res=>this._generateResultsPreview(res)).join('')

  }
  _generateResultsPreview(result){

    const id = window.location.hash.slice(1)
        return `
        
        <li class="preview">
            <a class= "preview__link ${id===result.id?'preview__link--active':''}" href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.image.trim()}" alt="${result.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
              </div>
              <div class="recipe__user-generated ${result.key?'':'hidden'}">
                <svg>
                  <use href="${icons}#icon-user"></use>
                </svg>
              </div>
            </a>
        </li>`;
  }
}

export default generatePreview;
