const pool = require("../pool.js");

async function getAllCategories(){
    const {rows} = await pool.query("SELECT * FROM categories ORDER BY id");
    return rows;
}

async function getCategory(categoryId){
    let {rows} = await pool.query("SELECT * FROM categories WHERE id = $1", [categoryId]);
    return rows[0].category;
}

async function addCategory(category){
    await pool.query("INSERT INTO categories(category) VALUES ($1)", [category]);
}

async function updateCategory(category, categoryId){
    await pool.query("UPDATE categories set category = ($1) WHERE id = ($2)", [category, categoryId]);
}

async function deleteCategory(categoryId){
    await pool.query("DELETE FROM categories WHERE id=$1",[categoryId]);
}

module.exports = { getAllCategories, getCategory, addCategory, updateCategory, deleteCategory }