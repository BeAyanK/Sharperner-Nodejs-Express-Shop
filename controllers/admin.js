const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    Product.create({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description
    })
    .then(() => {
        // console.log(res)
        console.log('Product Created!');
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err))
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (! editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findByPk(prodId)
    .then(product => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImage = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDesc = req.body.description;
    
    Product.update(
        { 
            title: updatedTitle,
            imageUrl: updatedImage,
            price: updatedPrice,
            description: updatedDesc
        }, 
        {
            where: { id: prodId }
        }
    )
    .then(result => {
        console.log('Product Updated');
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
}


exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.destroy({where: { id: prodId } })
    .then( () => {
        console.log('Product Deleted');
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
}

exports.getProducts = (req, res, next) => {
    Product.findAll()
    .then(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        });
    })
    .catch(err => console.log(err));
};


