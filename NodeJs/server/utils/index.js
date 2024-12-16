// it will add data to the database  and return true if data is added successfully otherwise false if there is an error while adding data to the database.

const fs = require("fs/promises");

const addToDb = async (data, path) => {
    try {
        // read file is used to read the data from the file 
        const dbData = await fs.readFile(path, "utf8");
        const parsedData = JSON.parse(dbData);
        parsedData.push(data);
        // write file is used to write data to the file 
        await fs.writeFile(path, JSON.stringify(parsedData));// write data to the file
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}

module.exports.addToDb = addToDb;