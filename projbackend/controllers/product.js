
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Product = require("../models/product");
const product = require("../models/product");





exports.getProductById = (req, res, next , id) => {

   Product.findById(id)
   .populate("category")
   .exec((err, product) => {
    if(err){
        return res.status(400).json({
            error: "Product not found"
        });
    }
  
   req.product = product; 
    next();
   })

};


//CREATE PRODUCT FOR IMAGES OF PRODCUT... 

exports.createProduct = (req, res) => {


    const form = new formidable.IncomingForm();
    form.keepExtensions = true;



    form.parse(req, (err , fields, file)  => {

        const product = new Product(fields);
      
        if (err) {
            return res.status(400).json({
            error: "Image could not be uploaded",
             });
            }
        //restrcitions to add..
        

            const {name , description , price ,category, stock } = fields;
             
           if( !name ||
               !description ||
               !price ||
               !category ||
               !stock
            
             )
            {
                return res.status(400).json({
                    error:"all fileds are required."
                })

            }            
    
// for photo...
        if (file.photo) {
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error:"image size big.."
                })
            }
        
            product.photo.data = fs.readFileSync(file.photo.path); 
            product.photo.contentType = file .photo.mimetype;
           
            }
    
            product.save((err, pro) => {
                if(err){
                    return res.status(400).json({
                        error:"proudct cant upload..."
                    })
                } 
                 res.json({pro});
            });

  

    })
}


exports.getProduct = (req, res) =>{
    req.Product.photo = undefined; //will cover by middleware..
    return res.json(req.product);
};

//middleware for photo..

exports.photo = (req, res, next) => {
 if(req.product.photo.data){
    res.set("Content-Type" , req.product.photo.contentType);
    return res.send(req.product.photo.data);
 }

 next();
}

//delete controller
exports.deleteProduct = (req, res) => {
   let product = req.product;
   product.remove((err,deletedProduct) => {
     
    if(err){
         return res.status(400).json({
            error: "ailed to delete the product.."
         })
    }
    res.json({
        message:"Deletion was a success",
        deletedProduct
    });
  });

   
}


//update prodoct controller...
exports.updateProduct = (req, res) => {

    const form = new formidable.IncomingForm();
    form.keepExtensions = true;



    form.parse(req, (err , fields, file)  => {
       // updation code..
        const product = req.product;
        product = _.extend(product, fields);
      
        if (err) {
            return res.status(400).json({
            error: "Image could not be uploaded",
             });
            }
    
        // for photo...
        if (file.photo) {
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error:"image size big.."
                })
            }
        
            product.photo.data = fs.readFileSync(file.photo.path); 
            product.photo.contentType = file .photo.mimetype;
           
            }
    
            product.save((err, pro) => {
                if(err){
                    return res.status(400).json({
                        error:"updattion of product is failed..."
                    })
                } 
                 res.json({pro});
            });
    })

  
}


//Get All Products..

exports.getAllProducts = (req, res) =>{

    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "-id";

    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err , products) =>{
        if(err) {
            return res.status(400).json({
                err:"No prodcut found.."
            })
        }
         res.json(products);
    })
}



exports.getAllUniqueCategories = (req, res) =>{
    Product.distinct("category", {} , (err , category) =>{
        if(err){
            return res.status(400).json({
                error: "no category found"
            })
        }
        res.json(category);
    });
}

exports.updateStock = (req , res, next) => {
    let myOperations = req.body.order.products.map(prod =>{
    return {
        updateOne: {
            filter:{_id: prod._id},
            update: {$inc: {stock: -prod.count, sold: +prod.count}}
        }
    }

    })
    Product.bulkWrite(myOperations, {} , (err, products) =>{
        if(err){
            return res.status(400).json({
                error:"Bulk operations failed.."
            });
        }
        next();
    });
};


