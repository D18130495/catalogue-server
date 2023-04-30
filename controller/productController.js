// import required modules
const status = require("../utils/status");
const router = require("../utils/result");
const validator = require("../utils/validator");

// import model
const ProductModel = require('../model/Product');

// get product by product id
router.get('/getProductByProductId/:productId', async (req, res) => {
    const productId = req.params.productId;
    
    if(validator.idValidator(productId)) {
        const product = await ProductModel.findOne({ id: productId })

        if(product !== []) {
            res.result(status.SUCCESS.status, product, 'Successfully get product detail', status.SUCCESS.statusName);
        }else {
            res.result(status.RESOURCE_NOT_FOUND.status, null, 'Can not find this product', status.RESOURCE_NOT_FOUND.statusName);
        }
    }else {
        res.result(status.INVALID_ID.status, null, 'Invalid product ID', status.INVALID_ID.statusName);
    }
});

module.exports = {
    router: router
}