import ProductHandler from './handler';

export const createProduct = (req, res) => {
    var body = req.body;
    var productHandler = new ProductHandler();
    productHandler.createProduct(req.body, (result, statusCode) => {
        res.status(statusCode).send(result);
    });
}

export const getProducts = (req, res) => {
    var productHandler = new ProductHandler();
    productHandler.getProducts(req.query, (result, statusCode) => {
        res.status(statusCode).send(result);
    });
};


export const updateProduct = (req, res) => {
    var productHandler = new ProductHandler();
    var productid = req.swagger.params.productid.value;
    productHandler.updateProduct(productid, req.body, (result, statusCode) => {
        res.status(statusCode).send(result);
    });
};

export const getProductByID = (req, res) => {
    var productHandler = new ProductHandler();
    var productid = req.swagger.params.productid.value;
    productHandler.getProductByID(productid, (result, statusCode) => {
        res.status(statusCode).send(result);
    });
};