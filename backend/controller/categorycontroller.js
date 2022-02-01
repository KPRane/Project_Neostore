
const colormodel = require('../db/colorSchema')
const categorymodel = require('../db/categorySchema')

const productmodel = require('../db/productSchema')

const categorycontroller = {

    getcategory: (req, res) => {

        if (req.params.category_id == "dummy") {
            productmodel.find({ color_id: req.params.color_id }).populate()
                .then(product => {

                    res.status(200).json({ product: product })
                })
        }
        else if (req.params.color_id == "dummy") {
            productmodel.find({ category_id: req.params.category_id }).populate()
                .then(product => {

                    res.status(200).json({ product: product })
                })
        } else {
            productmodel.find({ category_id: req.params.category_id, color_id: req.params.color_id }).populate()
                .then(product => {

                    res.status(200).json({ product: product })
                })
        }


    },



}
module.exports = categorycontroller

