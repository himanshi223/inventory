const itemsdb = require("../db/queries/items.js");
const categoriesdb = require("../db/queries/categories.js");
const { matchedData, body, validationResult } = require("express-validator")

async function listAllItems(req, res){
    try {
        const items = await itemsdb.getAllItems();
        res.render("items", {title: "All Items", items});
    } catch(err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

async function viewItem(req,res){
    try{
        const {itemId} = req.params;
        const itemDetails = await itemsdb.getItemDetails(itemId);
        console.log(itemDetails);
        const category = await categoriesdb.getCategory(itemDetails.categoryid);
        console.log(category)
        res.render("item", {title:itemDetails.item, itemDetails, category})
    }  catch(err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

async function addNewItemGet(req, res){
    res.render("itemForm", {
        title: "Add New Item", 
        categories: await categoriesdb.getAllCategories()
    });
}

async function updateItemGet(req, res){
    const {itemId} = req.params;
    const itemDetails = await itemsdb.getItemDetails(itemId);
    console.log(itemDetails)
    res.render("updateItemForm", {
        title: "Update Item", 
        categories: await categoriesdb.getAllCategories(),
        itemDetails
    });
}

const lengthErr = "must not be empty."

const validateItemDetails = [
    body("item").trim().notEmpty().withMessage(`Item name ${lengthErr}`),
    body("quantity").trim().notEmpty().withMessage(`Quantity ${lengthErr}`)
    .isInt({min:1}).withMessage("Quantity can not be less than 1"),
    body("unit").trim().notEmpty().withMessage(`Unit ${lengthErr}`)
]


const addNewItemPost = [
    validateItemDetails, 
    async (req, res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(404).render("itemForm", 
               {
                title: "Add New Item", 
                errors: errors.array(),
                categories: await categoriesdb.getAllCategories()
               } 
            )
        }
        const {item, quantity, unit, categoryId} = matchedData(req);
        await itemsdb.addNewItem(item, quantity, unit, categoryId);
        console.log("added");
        res.redirect("/items");
    }
]

const updateItemPost = [
    validateItemDetails, 
    async (req, res)=>{
        const {itemId} = req.params;
        const itemDetails = await itemsdb.getItemDetails(itemId);
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(404).render("updateItemForm", 
               {
                title: "Update Item", 
                errors: errors.array(),
                categories: await categoriesdb.getAllCategories(),
                itemDetails
               } 
            )
        }
        const {item, quantity, unit, categoryId} = matchedData(req);
        await itemsdb.addNewItem(item, quantity, unit, categoryId, itemId);
        res.redirect(`/items/${itemId}`);
    }
]

module.exports = {listAllItems, viewItem, addNewItemGet, addNewItemPost, updateItemGet, updateItemPost}