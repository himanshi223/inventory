const pool = require("../pool.js");

async function getAllItems(){
    const {rows} = await pool.query("SELECT * FROM items ORDER BY categoryid, id");
    return rows;
}

async function getItemsOfCategory(categoryId){
    const {rows} = await pool.query("SELECT * FROM items WHERE categoryId = $1", [categoryId]);
    return rows;
}

async function getItemDetails(itemId){
    const {rows} = await pool.query("SELECT * FROM items WHERE id = $1", [itemId]);
    return rows[0];
}

async function addNewItem(item, quantity, unit, categoryId){
    await pool.query(
        "INSERT INTO items (item, quantity, unit, categoryId) VALUES ($1, $2, $3, $4)",
        [item, quantity, unit, categoryId]
    )
}

async function updateItemDetails(item, quantity, unit, categoryId, itemId){
    await pool.query(
        "UPDATE items SET item = $1, quantity = $2, unit = $3, categoryId = $4 WHERE id = $5",
        [item, quantity, unit, categoryId, itemId]
    )
}

async function deleteItemById(id){
    await pool.query("DELETE FROM items WHERE id = $1", [id]);
}

async function deleteItemByCategory(categoryId){
    await pool.query("DELETE FROM items WHERE categoryid=$1", [categoryId]);
}

module.exports = {getAllItems, getItemsOfCategory, getItemDetails, addNewItem, updateItemDetails, deleteItemById, deleteItemByCategory};