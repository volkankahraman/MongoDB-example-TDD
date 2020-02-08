const assert = require('assert');
const MarioChar = require('../models/mariochar');

describe('Database CRUD tests', () => {
    let testChar = {
            name: 'Mario'
        },
        testCharWithWeight = {
            name: 'Prenses',
            weight: 50
        },
        char;
    //Create tests
    it('Create record', async () => {
        char = new MarioChar(testChar);
        try {
            await new MarioChar(testCharWithWeight).save();
            await char.save();
        } catch (e) {
            assert.fail()
        }
    });

    it('Read one record', async () => {
        let char = await MarioChar.findOne(testChar)
        if (char.name == null) {
            assert.fail();
        }
    });

    it('Read one record by id', async () => {
        let charWithId = await MarioChar.findById(char.id)

        if (charWithId.name == null) {
            assert.fail();
        }
    });

    it('Update one record', async () => {
        await MarioChar.findOneAndUpdate(testChar, {
            name: 'Luigi'
        });
        testChar = {
            name: 'Luigi'
        }
        let updatedChar = await MarioChar.findOne(testChar)

        if (updatedChar.name == null) {
            assert.fail();
        }

    });

    it('Increments the weight by 1', async () => {
        await MarioChar.updateOne(testCharWithWeight, {
            $inc: {
                weight: 1
            }
        });


        let updatedChar = await MarioChar.findOne({
            name: testCharWithWeight.name
        });


        if (updatedChar.weight != testCharWithWeight.weight + 1) {
            assert.fail();
        }
    });

    it('Delete one record', async () => {
        await MarioChar.findOneAndDelete(testChar);
        let char = MarioChar.findOne(testChar);

        if (char.name != null) {
            assert.fail();
        }
    });

    it('Delete all records', async () => {
        await MarioChar.deleteMany({});
        let char = MarioChar.findOne(testChar);

        if (char.name != null) {
            assert.fail();
        }
    });
});