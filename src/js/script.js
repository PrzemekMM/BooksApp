/* eslint-disable no-undef */
{
  'use strict';

  const templates = {booktamplate: Handlebars.compile(document.querySelector('#template-book').innerHTML)};

  class BookList{
    constructor(){
      const thisBook = this;
      thisBook.initData();
      thisBook.getElements();
      thisBook.renderIn();
      thisBook.initActions();
    }
    
    initData(){
      
      // eslint-disable-next-line no-undef
      this.data = dataSource.books;
    }

    getElements(){
      const thisBook = this;
      thisBook.booksList = document.querySelector('.books-list');
      thisBook.filteredBooks = document.querySelector('.filters');
      thisBook.filters = [];
      thisBook.favoriteBooks = [];
    }


    renderIn(){
      const thisBook = this;
      
      for(let element of dataSource.books){
        
        const ratingBgc = thisBook.determineRatingBgc(element.rating);
        const ratingWidth = element.rating * 10;
        console.log(ratingBgc);
        console.log(ratingWidth);
        

        const html = templates.booktamplate({ratingWidth, ratingBgc, id: element.id, price: element.price, image: element.image, name: element.name, rating: element.rating});
        const domElement = utils.createDOMFromHTML(html);
        console.log(html);
        thisBook.booksList.appendChild(domElement);

      }

    }

    filterBooks(){
      const thisBook = this;

      // eslint-disable-next-line no-undef
      for(let element of dataSource.books){
        let shouldBeHidden = false;
        for(const filter of thisBook.filters){
          if(!element.details[filter] == false){
            shouldBeHidden = true;
            break;
          }
        }
        const bookID = thisBook.booksList.querySelector('.book__image[data-id= "' + element.id + '"');
        if(shouldBeHidden === true){
          bookID.classList.add('hidden');
        } else {
          bookID.classList.remove('hidden');
        }
      }
    }


    determineRatingBgc(rating){


      let ratingBackground = '';

      if(rating < 6) {
        ratingBackground = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if(rating > 6 && rating <= 8) {
        ratingBackground = 'linear-gradient(to bottom,  #b4df5b 0%, #b4df5b 100%)';
      } else if(rating > 8 && rating <= 9) {
        ratingBackground = 'linear-gradient(to bottom,  #299a0b 0%, #299a0b 100%)';
      } else if(rating >9) {
        ratingBackground = 'linear-gradient(to bottom,  #ff0084 0%, #ff0084 100%)';
      }

      return ratingBackground;

    }

    initActions(){
      const thisBook = this;

      thisBook.favoriteBooks = [];
      console.log(thisBook.booksList);
      thisBook.booksList.addEventListener('dblclick', function(event){
        event.preventDefault();
        const clickedElement = event.target.offsetParent.classList.contains('book__image');
        console.log(event.target.offsetParent);
        console.log('event.target', clickedElement);

        if(clickedElement) {
          const bookAttribute = event.target.offsetParent.getAttribute('data-id');

          if(!event.target.offsetParent.classList.contains('favorite')){
            event.target.offsetParent.classList.add('favorite');
            thisBook.favoriteBooks.push(bookAttribute);
          } else {
            event.target.offsetParent.classList.remove('favorite');
            thisBook.favoriteBooks.splice(thisBook.favoriteBooks.indexOf(bookAttribute, 1));
          }
        } else {
          console.log('clicked element is not a book');
        }


      });
      thisBook.filteredBooks.addEventListener('click', function(event){
        const clickedElement = event.target;
        const tagName = clickedElement.tagName;
        const type = clickedElement.getAttribute('type');
        const name = clickedElement.getAttribute('name');
        const value = clickedElement.getAttribute('value');
        const clickedElementIsCheckbox = tagName== 'INPUT' && type == 'checkbox' && name == 'filter';
        console.log(value);

        if(clickedElementIsCheckbox && clickedElement.checked == true) {
          console.log('add', value);
          thisBook.filters.push(value);
          console.log(thisBook.filters);
        } else if(clickedElementIsCheckbox && clickedElement.checked == false) {
          console.log('delete', value);
          const valueIndex = thisBook.filters.indexOf(value);
          thisBook.filters.splice(valueIndex, 1);
        }
        thisBook.filterBooks();
      });
    }

  }
  const app = new BookList();
  console.log(app);
}