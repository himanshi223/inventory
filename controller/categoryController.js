const itemsdb = require("../db/queries/items.js");
const categoriesdb = require("../db/queries/categories.js");
const {validationResult, body, matchedData} = require("express-validator");

async function listAllCategories(req, res){
    try {
        const categories = await categoriesdb.getAllCategories();
        res.render("categories", {title: "All Categories", categories});
    } catch(err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
} 

async function listItemsOfCategory(req,res){
    try {
        const {categoryId} = req.params;
        const category  = await categoriesdb.getCategory(categoryId);
        const items = await itemsdb.getItemsOfCategory(categoryId);
        res.render("categoryItems", {title: category, items, category: {id: categoryId, category: category}});
    } catch(err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

function addNewCategoryGet(req, res){
    res.render("categoryForm", {title:"Add New Category", action:"./add", buttonText:"Add Category"});
}

const lengthErr = "must not be empty"
const validateCategory = [
    body("category").trim().notEmpty().withMessage(`Category ${lengthErr}`)
]

const addNewCategoryPost = [
    validateCategory, 
    async (req, res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).render(
                "categoryForm", 
                {title:"Add New Category", action:"./add", buttonText:"Add Category", errors: errors.array()}
            )
        }
        await categoriesdb.addCategory(matchedData(req).category);
        res.redirect("/categories");
    }   
]

async function updateCategoryGet(req, res){
    const {categoryId} = req.params
    const category = await categoriesdb.getCategory(categoryId);
    res.render(
        "categoryForm", 
        {title:"Update Category", action:`./update`, buttonText:"Update Category", category}
    );
}

const updateCategoryPost = [
    validateCategory,
    async (req, res)=>{
        const {categoryId} = req.params;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).render(
                "categoryForm", 
                {title:"Update Category", action:`./update`, buttonText:"Update Category", errors: errors.array()}
            )
        }
        await categoriesdb.updateCategory(matchedData(req).category, categoryId);
        res.redirect(`/categories/${categoryId}`);
    }
];

async function deleteCategoryGet(req, res){
    const {categoryId} = req.params;
    const category = await categoriesdb.getCategory(categoryId);
    res.render(
        "deleteCategoryForm", {
            title: "Delete Category",
            category : {categoryId, category}
        }
    )
}

async function deleteCategoryPost(req, res){
    const {categoryId} = req.params;
    const {confirmation} = req.body;
    if(confirmation === "true"){
        await itemsdb.deleteItemByCategory(categoryId);
        await categoriesdb.deleteCategory(categoryId);
        res.redirect("/categories");
    }
    res.redirect("/categories");
}

module.exports = {listAllCategories,listItemsOfCategory, addNewCategoryGet, addNewCategoryPost, updateCategoryGet, updateCategoryPost, deleteCategoryGet, deleteCategoryPost}