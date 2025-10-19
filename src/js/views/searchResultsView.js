import icons from 'url:../../img/icons.svg';
import generatePreview from './generatePreview.js';

class bookMarkView extends generatePreview {
    _errorMessage = 'Hungry? Start by typing a recipe name like “pizza” or “pasta” in the search bar!'

    constructor(){
        super(document.querySelector('.results'))
    }

  
}

export default new bookMarkView();
