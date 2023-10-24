import Model from './model.js';

export default class Bookmark extends Model {
    constructor() {
        super();
        /* Here we set make a class Bookmarks and set it to the key of the model
           so we can use it in the view to display the data in the table */
        this.addField('Title', 'string');
        this.addField('Url', 'url');
        this.addField('Category', 'string');

        this.setKey("Title");
    }
}