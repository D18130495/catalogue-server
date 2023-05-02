// import required modules
const status = require("../utils/status");
const router = require("../utils/result");
const validator = require("../utils/validator");

// import model
const ProductModel = require('../model/Product');

// get all products
router.get('/getProductPagination/:current/:limit', async (req, res) => {
    // get all params
    const current = req.params.current;
    const limit = req.params.limit;
    const categories = req.query.categories;

    if(validator.idValidator(current) && validator.idValidator(limit)) {
        try{
            // covert input page value to integer
            const currentNumber = parseInt(current);
            const limitNumber = parseInt(limit);

            // build query
            const query = {}

            if(categories) {
                query.category = { $in: categories };
            }

            // query value
            const total = await ProductModel.countDocuments(query);
            const pageNumber = Math.ceil(total / limitNumber);

            // ship base on the current page number and qury products
            const skipNumber = (currentNumber - 1) * limitNumber;
            const skipQuery = { limit: limitNumber, skip: skipNumber };
            const products = await ProductModel.find(query, null, skipQuery);

            // form the return value
            const productList = {
                products: products,
                current: currentNumber,
                limit: limitNumber,
                total: total,
                pageNumber: pageNumber
            }

            res.result(status.SUCCESS.status, productList, 'Successfully get product list', status.SUCCESS.statusName);
        }catch (error) {
            res.result(status.SERVER_ERROR.status, null, 'Server error', status.SERVER_ERROR.statusName);
        }
    }else {
        res.result(status.INVALID_PAGE.status, null, 'Invalid page value', status.INVALID_PAGE.statusName);
    }
});

// get categories by fuzzy search
router.get('/getProductCategoriesFuzzySearch/:queryForm', async (req, res) => {
    // get all param
    const queryForm = req.params.queryForm;

    try{
        const result = await ProductModel.find({ category: { $regex: queryForm, $options: "i" } }).distinct("category");

        res.result(status.SUCCESS.status, result, 'Successfully get product list', status.SUCCESS.statusName);
    }catch (error) {
        res.result(status.SERVER_ERROR.status, null, 'Server error', status.SERVER_ERROR.statusName);
    }
});

// get product by product id
router.get('/getProductByProductId/:productId', async (req, res) => {
    // get param
    const productId = req.params.productId;
    
    if(validator.idValidator(productId)) {
        try {
            const product = await ProductModel.findOne({ id: productId })
       
            if(product) {
                res.result(status.SUCCESS.status, product, 'Successfully get product detail', status.SUCCESS.statusName);
            }else {
                res.result(status.RESOURCE_NOT_FOUND.status, null, 'Can not find this product', status.RESOURCE_NOT_FOUND.statusName);
            }
        }catch (error) {
            res.result(status.SERVER_ERROR.status, null, 'Server error', status.SERVER_ERROR.statusName);
        }
    }else {
        res.result(status.INVALID_ID.status, null, 'Invalid product ID', status.INVALID_ID.statusName);
    }
});

// add product
router.post('/addProduct', async (req, res) => {
    // get param
    const product = req.body;
    
    if(validator.numberValidator(product.price) && validator.numberValidator(product.discountPercentage) && validator.numberValidator(product.stock)) {
        try {
            // set new id
            const maxIdResult = await ProductModel.aggregate([{ $group: { _id: null, maxId: { $max: "$id" } } }]);
            const maxId = maxIdResult.length > 0 ? maxIdResult[0].maxId : 0;
            product.id = maxId + 1;

            // remove empty images
            product.images = product.images.filter((value) => value !== '');

            // add product
            const result = await ProductModel.create(product);

            res.result(status.SUCCESS.status, result, 'Successfully add product', status.SUCCESS.statusName);
        }catch (error) {
            res.result(status.SERVER_ERROR.status, null, 'Server error', status.SERVER_ERROR.statusName);
        }
    }
});

// edit product by product id
router.put('/editProductByProductId', async (req, res) => {
    // get param
    const product = req.body;

    if(validator.idValidator(product.id)) {
        // remove empty images
        product.images = product.images.filter((value) => value !== '');

        if(validator.numberValidator(product.price) && validator.numberValidator(product.discountPercentage) && validator.numberValidator(product.stock)) {
            try {
                // update
                const result = await ProductModel.updateOne({ id: product.id }, { $set: product })
                
                if(result.matchedCount !== 0) {
                    const editProduct = await ProductModel.findOne({ id: product.id })

                    res.result(status.SUCCESS.status, editProduct, 'Successfully edit product detail', status.SUCCESS.statusName);
                }else {
                    res.result(status.RESOURCE_NOT_FOUND.status, null, 'Can not find this product', status.RESOURCE_NOT_FOUND.statusName);
                }
            }catch (error) {
                res.result(status.SERVER_ERROR.status, null, 'Server error', status.SERVER_ERROR.statusName);
            }
        }else {
            res.result(status.INVALID_INPUT.status, null, 'Your input is invalid in the filed of Price, Discount or Stock', status.INVALID_ID.statusName);
        }
    }else {
        res.result(status.INVALID_ID.status, null, 'Invalid product ID', status.INVALID_ID.statusName);
    }
});

// delete product by product id
router.delete('/deleteProductByProductId/:productId', async (req, res) => {
    // get param
    const productId = req.params.productId;
    
    if(validator.idValidator(productId)) {
        try{
            const product = await ProductModel.deleteOne({ id: productId })
            
            if(product.deletedCount !== 0) {
                res.result(status.SUCCESS.status, null, 'Successfully delete product', status.SUCCESS.statusName);
            }else {
                res.result(status.RESOURCE_NOT_FOUND.status, null, 'Can not find this product', status.RESOURCE_NOT_FOUND.statusName);
            }
        }catch (error) {
            res.result(status.SERVER_ERROR.status, null, 'Server error', status.SERVER_ERROR.statusName);
        }
    }else {
        res.result(status.INVALID_ID.status, null, 'Invalid product ID', status.INVALID_ID.statusName);
    }
});

module.exports = {
    router: router
}