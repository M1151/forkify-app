import icons from 'url:../../img/icons.svg';
import { View } from './view.js';


class addRecipeView extends View{

    _parentElement = document.querySelector('.upload')
    _overlay = document.querySelector('.overlay')
    _addWindow = document.querySelector('.add-recipe-window')
    _showBtn = document.querySelector('.nav__btn--add-recipe')
    _closeBtn = document.querySelector('.btn--close-modal')
    

    constructor(){
        super()
        this._renderForm()
        this._closeForm()
        // this.addUploadHandler()
    }
    _generateMarkup(){
        return `
        <div class="upload__column">
          <h3 class="upload__heading">Recipe data</h3>
          <label>Title</label>
          <input placeHolder="pizza" required name="title" type="text" />
          <label>URL</label>
          <input placeHolder="https://pizza.com" required name="sourceUrl" type="text" />
          <label>Image URL</label>
          <input placeHolder="https://image.pizza.com" required name="image" type="text" />
          <label>Publisher</label>
          <input placeHolder="italian kitchen" required name="publisher" type="text" />
          <label>Prep time</label>
          <input placeHolder="5" required name="cookingTime" type="number" />
          <label>Servings</label>
          <input placeHolder="5" required name="servings" type="number" />
        </div>

        <div class="upload__column">
          <h3 class="upload__heading">Ingredients</h3>
          <label>Ingredient 1</label>
          <input
            type="text"
            required
            name="ingredient-1"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 2</label>
          <input
            type="text"
            name="ingredient-2"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 3</label>
          <input
            type="text"
            name="ingredient-3"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 4</label>
          <input
            type="text"
            name="ingredient-4"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 5</label>
          <input
            type="text"
            name="ingredient-5"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 6</label>
          <input
            type="text"
            name="ingredient-6"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
        </div>

        <button class="btn upload__btn">
          <svg>
            <use href="${icons}#icon-upload-cloud"></use>
          </svg>
          <span>Upload</span>
        </button>
        
        `
    }

    _toggleHiddenClasses(){
        this._overlay.classList.toggle('hidden')
        this._addWindow.classList.toggle('hidden')
        if(!this._overlay.classList.contains('hidden')){
            this._clearError()
            this.render()
        }
        
    }
    _clearError() {
        const errorEl = this._parentElement.querySelector('.error');
        if (errorEl) errorEl.remove();
    }   

    _renderForm(){
        this._showBtn.addEventListener('click' , this._toggleHiddenClasses.bind(this))
    }
    _closeForm(){
        [this._overlay , this._closeBtn].forEach(el=>el.addEventListener('click' , this._toggleHiddenClasses.bind(this)))
    }
    
    addUploadHandler(handler){
        this._parentElement.addEventListener('submit' , function(e){
            e.preventDefault()
            const data = Object.fromEntries(new FormData(this))
            handler(data);
         })
    }
}

export default new addRecipeView()