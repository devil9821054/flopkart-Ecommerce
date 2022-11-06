const User = require("../models/user");
const Order = require("../models/order");


exports.getUserById = (req, res , next,id) => {
    User.findById(id).exec((err , user) =>{
        if(err || !user){
            return res.status(400).json({
                err: "NO USER FOUND IN DB"
            })
        }
     req.profile = user;
     next();
    })
}; 
//geing user in browser...
exports.getUser = (req , res) => {
  
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    
     return res.json(req.profile);
};

//update user through id...

exports.updateUser = (req, res) => {
   User.findByIdAndUpdate(
    { _id: req.profile._id },
    {$set: req.body },
    {new: true, useFindAndModify: false},

    (err, user) => {
    if (err) {
        return res.status(400).json({
            error: "YOU ARE NOT AUTHORIZED TO UPDATE THIS USER.."
        });
    }
    user.salt = undefined;
    user.encry_password = undefined;
    res.json(user);
    }
);
     
};

//Purchases LIST...
exports.userPurchaseList = (req , res) =>{
     Order.find({user: req.profile._id})
     .populate("user" , "_id name")
     .exec((err , order) => {
        if(err){
            return res.status(400).json({
                error: "no order in this account.."
            })
        }
        return res.json(order);
     })
}

//

exports.pushOrderInPurchaseList = (req, res , next) => {
   let Purchases = [];
   req.body.order.products.array.forEach(product => {

    Purchases.push({
        _id: product._id,
        name: product.name,
        description: product.description,
        category: product.category,
        quantity: product.quantity,
        amount: product.amount,
        transcation_id: req.body.order.transcation_id
    });
   });

   //store  this array in database..
  
   User.findOneAndUpdate(
    {_id: req.profile._id},
    {$push: {purchases: purchases }},
    {new: true}, 

    (err,purchases) => {
         if(err){
            return res.status(400).json({
                error: "unable to save purchases list.."
            })
         }

         next();

    }

   )

  
};