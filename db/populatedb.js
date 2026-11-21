const createTables = `
CREATE TABLE IF NOT EXISTS categories (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
category VARCHAR ( 255 )
);


CREATE TABLE IF NOT EXISTS items (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
item VARCHAR ( 255 ), 
quantity INTEGER, 
unit VARCHAR ( 32 ),
categoryId INTEGER REFERENCES categories (id)
);
`

const insertIntoTables = `
    INSERT INTO categories(category) VALUES 
    ('Nuts and Seeds'),
    ('Snacks'), 
    ('Beverages'), 
    ('Baking'),
    ('Pasta'),
    ('Rice'),
    ('Personal Cared'),
    ('Household and Cleaning');

    INSERT INTO items (item, quantity, unit, categoryId)
    VALUES 
    ('Coffee Beans', 24, 'packs', 6), 
    ('Flour', 65, 'kg', 7), 
    ('Dishwashing Liquid', 43, 'bottles', 10);
`

const {Client} = require("pg");

async function main(){
    console.log("Seeding");
    const client = await new Client({
        connectionString: process.env.CONNECTION_STRING
    });
    await client.connect();
    await client.query(createTables);
    await client.query(insertIntoTables);
    await client.end();
    console.log("done");
}

main();