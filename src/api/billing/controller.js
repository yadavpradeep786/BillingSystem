import BillingHandler from './handler';

export const fetchBill = (req, res) => {
    var billingHandler = new BillingHandler();
    billingHandler.fetchBill(req.body, req.context, (result, statusCode) => {
        res.status(statusCode).send(result);
    });
}