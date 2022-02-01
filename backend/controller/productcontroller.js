

const productmodel = require('../db/productSchema')

const colormodel = require('../db/colorSchema')



const productcontroller = {

    fetchpost: (req, res) => {

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

    fetchproduct: (req, res) => {

        productmodel.find().populate(["category_id", "color_id"])
            .then(product => {

                res.status(200).json({ product: product })
            })


    },
    fetchpost: (req, res) => {



        productmodel.find({}, { product_name: 1, product_image: 1, product_rating: 1, product_cost: 1 }, (err, data) => {
            if (err) throw err;
            //   res.send(data)
            let final = []
            for (let i = 0; i < 6; i++) {
                final.push(data[i])
            }
            res.status(200).json({ data1: final })
        }).sort({ product_rating: -1 })


    },


    singleproduct: (req, res) => {
        let id = req.params.id

        productmodel.findOne({ _id: id })
            .populate("color_id")
            .then(product => {
                console.log(product);

                res.status(200).json({ product: product, err: "0", image: product.product_subimages })
                //   res.send("Data Fetch")
            })

    },


    Rating: (req, res) => {
        let id = req.params.id;
        let product_rating = req.body.newrating

        console.log(id)

        console.log(product_rating)
        console.log(req.body)

        productmodel.updateOne({ _id: id }, { $set: { product_rating: product_rating } }, (err) => {
            if (err) {
                res.json({ err: err }).status(400);
            }
            else {
                res.status(200).json({ msg: "Rating Updated Succesfully" });
            }

        })
    },


}
module.exports = productcontroller

