let Author = require('../models/author');
const assert = require('assert');


describe('Nesting records', () => {

    it('Creates an author with sub-documents', async () => {
        await new Author({
            name: 'Volkan Kahraman',
            books: [{
                title: 'Name of the Wind',
                pages: 400
            }]
        }).save();

        let author = await Author.findOne({
            name: 'Volkan Kahraman'
        });

        assert(author.books.length === 1);

    })

    it('Adds a book to author', async () => {
        let author = await Author.findOne({
            name: 'Volkan Kahraman'
        });

        author.books.push({
            title: '1984',
            pages: 356
        });


        await author.save();

        author = await Author.findOne({
            name: 'Volkan Kahraman'
        });

        assert(author.books.length === 2);


    });

    it('Delete all records', async () => {
        await Author.deleteMany({});
    });
});