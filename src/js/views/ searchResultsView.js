import icons from 'url:../../img/icons.svg';
import generatePreview from './generatePreview.js';

class bookMarkView extends generatePreview {
    _errorMessage = 'Error in getting recipes for this keyword ;)'

    constructor(){
        super(document.querySelector('.results'))
    }

  
}

export default new bookMarkView();
