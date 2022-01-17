import React, { useEffect, useState } from "react";
import { Button, Container, Table, Form, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router";
import { GrAddCircle, GrSubtractCircle } from 'react-icons/gr'
import { MdDelete } from 'react-icons/md'
import { createOrders } from '../config/MyService';

import { Link } from "react-router-dom";

export default function Cart() {
  let items = [];
  const history = useHistory();
  const [cart, setCart] = useState([]);
  const [Flag, setFlag] = useState(1);
  const [temp, settemp] = useState(1);
  let total = [0];
  useEffect(() => {
    let cartItems = JSON.parse(localStorage.getItem("mycart"));

    if (cartItems) {
      setCart(cartItems);
      setFlag(1)
    } else {
      setFlag(0)
    }

  }, []);
  console.log(cart);

  const onAdd = (product) => {
    const exist = cart.find((item) => item._id === product._id);
    if (exist) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...exist, quantity: exist.quantity + 1 }
            : item
        )
      );
      localStorage.setItem("mycart", JSON.stringify(cart));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const onRemove = (product) => {
    const exist = cart.find((item) => item._id === product._id);
    if (exist.quantity === 1) {
      // setCart(cart.filter((item) => item._id !== product._id));
    } else {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...exist, quantity: exist.quantity - 1 }
            : item
        )
      );
      localStorage.setItem("mycart", JSON.stringify(cart));
    }
  };

  const onDelete = (index) => {
    let lstore = JSON.parse(localStorage.getItem("mycart"));
    lstore.splice(index, 1);
    console.log(lstore);
    let setStore = JSON.stringify(lstore);
    localStorage.setItem("mycart", setStore);
    setCart(lstore);
    window.location.reload(false);
  };


  const checkout = () => {
    console.log(cart);

    cart.map((value) => {
      let allorders = { product_name: `${value.name}`, product_cost: `${value.price}`, product_image: `${value.image}`, quantity: `${value.quantity} ` }
      items.push(allorders)

    });

    let email = localStorage.getItem('user')
    let tot = total.reduce((result, number) => result + number) + (0.05 * total.reduce((result, number) => result + number))
    localStorage.setItem('total', tot)
    let orderno = Math.random().toFixed(6).split('.')[1];
    let checkout = {
      email: email,
      items: items,
      orderno: orderno,
      total: total.reduce((result, number) => result + number),
    };
    console.log(checkout);

    createOrders(checkout)
      .then((res) => {
        console.log(res.data)


        // history.push("/checkout");
        history.push(
          {
            pathname: '/checkout',
            state: { orderno: orderno }
          }
        )

      });


  };
  return (
    <div><br />
      {cart.length !== 0 ?
        <div className=" container-fluid col-md-12 col-lg-12 col-sm-12" >
          <div className="row">


            <Table className="table card2  col-md-6 col-lg-10 col-sm-12" >
              <thead >
                <tr className="text-uppercase text-center" >

                  <td>Product</td>
                  <td>Price:</td>
                  <td>Quantity</td>
                  <td>Total</td>
                  <td></td>
                </tr>
              </thead>
              <tbody className=" text-center" >

                {cart.map((value, index) => {
                  return (
                    <tr key={index} >
                      {/* <td>{index + 1}</td> */}

                      <td>
                        <Row>
                          <Col>
                            <img src={value.image} height="150px" width="200px" />
                          </Col>
                          <Col><br /><br />{value.name}
                          </Col>
                        </Row>


                      </td>

                      <td> <br /><br />Rs: {value.price}</td>
                      <td className="text-center"><br /><br />
                        <Row style={{ width: '200px', marginLeft: "40px" }}>
                          <Col>
                            <a variant="danger" onClick={() => onRemove(value)}>
                              <GrSubtractCircle size="25px" />
                            </a>
                          </Col>
                          <Col>
                            <input className="form-control" type="text" value={value.quantity} />
                          </Col>
                          <Col>
                            <a onClick={() => onAdd(value)}>
                              <GrAddCircle size="25px" />
                            </a>
                          </Col>
                        </Row>
                      </td>
                      <td><br /><br />
                        Rs: {value.quantity * value.price}
                      </td>
                      <td><br /><br />
                        <a onClick={() => onDelete(index)}>
                          <MdDelete size="25px" className="text-danger" />
                        </a>
                      </td>
                      {console.log(
                        total.push(
                          value.price * value.quantity
                        )
                      )}
                    </tr>
                  );
                })
                }
              </tbody>

            </Table>
            <div className="col-lg-3 col-md-6 col-sm-6 card3">
              <h4>Review Order</h4>
              <hr />
              <table width="300px" >
                <tr><td> Sub Amount:{" "}</td>
                  <td>₹:{total.reduce((result, number) => result + number)}</td>


                </tr>
                <br />
                <tr>
                  <td>GST:</td>
                  <td>₹:{0.05 * total.reduce((result, number) => result + number)} </td>
                </tr>
                <br />
                <tr>
                  <th>Order Total:</th>
                  <th>₹:{total.reduce((result, number) => result + number) + (0.05 * total.reduce((result, number) => result + number))} </th>
                </tr>
                <br />
                <tr className="text-center">

                  <button className="btn btn-danger sha" onClick={() => checkout()}>
                    PROCEED TO BUY
                  </button>

                </tr>
              </table>
              <br />

            </div>
          </div>
          <br />
        </div>

        : <div className="text-center">

          <img src="https://i.pinimg.com/originals/2e/ac/fa/2eacfa305d7715bdcd86bb4956209038.png" className="img-fluid" height="500px"></img><br />
          <button className="btn btn-danger"><Link to="/Product" className="nav-link text-light" >Continue Shopping!!</Link></button>
        </div>
      }<br />
    </div>
  );
}