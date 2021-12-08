/**
 * Initialize main Searchbox
 *
 */

import searchEngine from '../../models/Search.js';

const initSearchBox = () => {
    const searchBox = document.getElementById('search');

    searchBox.addEventListener('keyup', searchEngine);
};

export default initSearchBox;
