import View from './View';
import icons from 'url:../../img/icons.svg';
import { RES_PER_PAGE } from '../config';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  // curPage = this._data.page;

  _addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const gotoPage = +btn.dataset.goto;

      handler(gotoPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(this._data.results.length / RES_PER_PAGE);

    const prevPage = `      
    <button data-goto=${curPage - 1} class="btn--inline pagination__btn--prev">
      <span>${curPage - 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
    </button>
  `;
    const nextPage = `      
    <button data-goto=${curPage + 1} class="btn--inline pagination__btn--next">
      <span>${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
  `;

    // Page 1 and other pages exist
    if (curPage === 1 && numPages > 1) {
      return nextPage;
    }
    // last page
    if (curPage === numPages && numPages > 1) {
      return prevPage;
    }
    // other page
    if (curPage < numPages) {
      return `${nextPage + prevPage}`;
    }
    // Page 1 and there are no other pages
    return '';
  }
}

export default new PaginationView();
