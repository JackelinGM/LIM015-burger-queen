import React, { useEffect, useState } from "react";
import { db } from "../../fb-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import AddProducts from './addProducts'
import "../../styles/pages/waiter.css";


export default function OrderProduct({ setPedido, pedido }) {

  const [arrayProductList, setArrayProductList] = useState([]);
  const [type, setType] = useState("breakfast");

  const getProductsFirebase = async (type) => {
    const arrayProduct = [];
    const querySnapshot = await getDocs(query(collection(db, "products"), where("type", "==", type)));
    querySnapshot.forEach((doc) => {
      arrayProduct.push(doc.data());
    });

    return arrayProduct;
  };

  useEffect(() => {
    async function fetchList() {
      const listMenu = await getProductsFirebase(type);
      // console.log(listMenu);
      setArrayProductList(listMenu);
    }
    fetchList();
  }, [type]);

  return (
    <section className="section-side-right">
      <section className="btn-order">
        <button className="btn-order-waiter" onClick={() => setType('breakfast')}>DESAYUNOS</button>
        <button className="btn-order-waiter" onClick={() => setType('dinner')}>HAMBURGUESAS</button>
        <button className="btn-order-waiter" onClick={() => setType('addfood')}>EXTRAS</button>
        <button className="btn-order-waiter" onClick={() => setType('drink')}>BEBIDAS</button>
      </section>

      <div className="order-container-list">
        {arrayProductList.map((item, index) => {          
          const productList = {
            id: item.id,
            nombre: item.name,
            precio: item.price,
            count: 0
          }
          return (
            <div className="order-container" >
              <p className="text-order">S/ {item.price}.00</p>
              <img className="img-product" alt='img-burguerqueen' src={item.URL}></img>
              <p className="text-order">{item.name}</p>
              <div className="btn--order">
                <section><AddProducts productList={productList} setPedido={setPedido} pedido={pedido} /></section>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  )
}
