import icons from 'url:../../img/icons.svg';
import generatePreview from './generatePreview.js';

class bookMarkView extends generatePreview {

    constructor(){
        super(document.querySelector('.bookmarks__list'))
    }

  bookMarksRenderHandler(handler){
    window.addEventListener('load' , handler)
  }
}

export default new bookMarkView();
