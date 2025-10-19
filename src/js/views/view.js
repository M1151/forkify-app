import icons from 'url:../../img/icons.svg';

export class View {
  _data;

  render(data=null) {


    this._data = data;
    this._clearParentElement();
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderSpinner() {
    const markup = `
                    <div class="spinner">
                    <svg>
                        <use href="${icons}#icon-loader"></use>
                    </svg>
                    </div> 
            `;
    this._clearParentElement();
    this._parentElement.insertAdjacentHTML('afterBegin', markup);
  }
  renderError(message = this._errorMessage) {
    const markup = `
        
        <div class="error">
          <div>
            <svg>
              <use href="${icons}#icon-alert-triangle"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
        `;
    this._clearParentElement();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }



  renderMessage(message = this._message) {
    const markup = `
        
        <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
        `;
    this._clearParentElement();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }





  
  _clearParentElement() {
    this._parentElement.innerHTML = '';
  }











  update(data){
    if(!data || (Array.isArray(data) && data.length === 0))
      return this.renderError(this._errorMessage)

    this._data = data;
    // this._clearParentElement();
    const newMarkup = this._generateMarkup();

    const newDom = document.createRange().createContextualFragment(newMarkup)     // string => dom
    const newElements = Array.from(newDom.querySelectorAll('*'))
    const curElements = Array.from(this._parentElement.querySelectorAll('*'))
    
    newElements.forEach((newEL , i)=>{
      const curEl = curElements[i]
      if(!curEl) return
      // update changed text
      if(!curEl.isEqualNode(newEL) && curEl.firstChild?.nodeValue.trim() !==''){
        curEl.textContent=newEL.textContent
      }
      
      //update changed attributes
      if(!curEl.isEqualNode(newEL)){
        Array.from(newEL.attributes).forEach(attr=>{
          curEl.setAttribute(attr.name , attr.value)
        })
      }

    })
    

  }
}
