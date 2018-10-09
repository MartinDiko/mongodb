(function() {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/"; 
    
    MongoClient.connect(url, function (err, db) {
        if (err) throw err; 
        console.log("Database created!");

        // instance of db 
        var dbo = db.db("mydb");
        var myLargeObject = [
            { firstName: "Martin", lastName: "Diko", Email: "martindiko@live.com", registered: false },
            { firstName: "John", lastName: "Smith", Email: "johnsmith@live.com", registered: false },
            { firstName: "Mary", lastName: "Parser", Email: "maryparser@live.com", registered: false },
            { firstName: "Michael", lastName: "Lint", Email: "michaellint@live.com", registered: false }
        ];
        // control function calls 
        createDbCollection(dbo, "people"); 
        insertToCollection(dbo, "people");
        insertManyToCollection(dbo, "people", myLargeObject);

        findSingleItem(dbo, "people", "firstName");
        //findAllItems(dbo, "people"); 
    });
})();

var createDbCollection = (dbo, collectionName) => {
    dbo.createCollection(collectionName, function (err, res) {
        if (err) throw err;
        console.log("Collection of "+ collectionName + " created!");
    }); 
};

var insertToCollection = (dbo, collectionName) => {
    var myobj = { firstName: "Martin", lastName: "Diko", Email: "martindiko@live.com", PhoneNumber: "4253467990"}; 
    dbo.collection(collectionName).insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 person record inserted"); 
    });
}; 

var findSingleItem = (dbo, collectionName, searchedFor) => {
    dbo.collection(collectionName).findOne({}, function(err, res) {
        if (err) throw err; 
        console.log("Searched for firstname: " + res.firstName); 
    });
};

var findAllItems = (dbo, collectionName) => {
    dbo.collection(collectionName).find({}).toArray(function(err, result) {
        if (err) throw err; 
        console.log("The entire collection: \n" + result);
    });
};

var insertManyToCollection = (dbo, collectionName, myLargeObject) => {
    dbo.collection(collectionName).insertMany(myLargeObject, function(err, res) {
        if (err) throw err; 
        console.log("Inserted " + res.insertedCount + " objects to " + collectionName + " collection!");
    });
};