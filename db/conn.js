const mongoose = require('mongoose');
const atlasUri = process.env.ATLAS_URI;

mongoose.connect(atlasUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to db successfully!'))
.catch(err => console.log('Something went wrong with the db connection\n' + err.message));