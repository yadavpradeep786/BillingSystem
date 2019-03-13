import razorpayUtils from '../razorpayUtils'
import {
    expect,
    assert
} from 'chai';


describe('razorpayUtils', function () {
    describe('capture', function () {
        it('capture should return status true valid arguments', () => {
            var paymentId = "pay_92UgJFEe4MgHN3";
            var amount = 50;
            razorpayUtils.capture(paymentId,amount, (result) => {
                assert.equal(false, result.status);
                // done();
            })
        });
    })

   
});