
var braintree = require("braintree");

  const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    
    merchantId: "xsq6283kjsqmkkf3",
    publicKey: "wccjynwcm9k5k8h7",
    privateKey: "6d853722afba1d44c8ece59b2718d543",
  });


 


     exports.getToken = (req, res) => {
           gateway.clientToken.generate({}, function(err, response) {
             if (err) {
               res.status(500).send(err);
             } else {
               res.send(response);
             }
           });
         };

        exports.processPayment = (req, res) => {
               let nonceFromTheClient = req.body.paymentMethodNonce;
            
               let amountFromTheClient = req.body.amount;
               gateway.transaction.sale(
                 {
                   amount: amountFromTheClient,
                   paymentMethodNonce: nonceFromTheClient,
            
                   options: {
                     submitForSettlement: true
                   }
                 },
                 function(err, result) {
                   if (err) {
                     res.status(500).json(error);
                   } else {
                     res.json(result);
                   }
                 }
               );
            }