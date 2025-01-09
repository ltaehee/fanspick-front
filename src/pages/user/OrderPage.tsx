import { useState } from "react";
import api from "../../utils/api";
import ProductTableHeaderMenu from "../../components/productTable/ProductTableHeaderMenu";
import ProductTableHeader from "../../components/productTable/ProductTableHeader";
import ProductTableMenu from "../../components/productTable/ProductTableMenu";
import tableStyles from "../../css/productTable/productTable.module.css";
import orderstyles from "../../css/order.module.css";
import dummyImg2 from "/images/product/dog2.jpg";

const OrderPage = () => {
  const product = [
    {
      id: "1",
      name: "상품 A",
      price: "10,000원",
      image: dummyImg2,
      quantity: 1,
    },
    {
      id: "2",
      name: "상품 A",
      price: "10,000원",
      image: dummyImg2,
      quantity: 1,
    },
  ];
  /* 예시 데이터 */
  /* const [userId] = useState("60d5f8f5b2c7a38b9c9d56d4");
  const [products] = useState([
    { productId: "60d5f8f5b2c7a38b9c9d56d5", quantity: 2, price: 100 },
  ]);
  const [orderAddress] = useState({
    roadAddress: "123 Road St.",
    jibunAddress: "Jibun Address",
    zoneCode: "12345",
    detail: "Some details here",
  });
  const [imp_uid] = useState("imp123456789"); */
  /* const handleOrderClick = async () => {
    const orderData = {
      userId,
      products,
      orderAddress,
      imp_uid,
    };

    try {
      const response = await api.post("/purchase/order", orderData);
      console.log("test", response);
      if (response.status === 200) {
        console.log("Order created successfully:", response.data);
        alert("주문이 완료되었습니다!");
      }
    } catch (error) {
      console.error("Error creating order:");
      alert("주문 생성에 실패했습니다.");
    }
  }; */
  return (
    <>
      <div className={orderstyles.orderPageWrap}>
        <ProductTableHeader className={tableStyles.Header_wrap}>
          <ProductTableHeaderMenu
            menu="상품정보"
            className={tableStyles.Header_menu_first}
          />
          <ProductTableHeaderMenu
            menu="판매 금액"
            className={tableStyles.Header_menu}
          />
          <ProductTableHeaderMenu
            menu="수량"
            className={tableStyles.Header_menu}
          />
          <ProductTableHeaderMenu menu="" className={tableStyles.Header_menu} />
        </ProductTableHeader>
        <ProductTableMenu>
          {product.map((product) => (
            <div key={product.id} className={tableStyles.content}>
              <ProductTableMenu.Detail
                productName={product.name}
                image={product.image}
              />
              <ProductTableMenu.Content content={product.price} />
              <div className={tableStyles.quantity_wrap}>
                <ProductTableMenu.Quantity quantity={product.quantity} />
              </div>
            </div>
          ))}
        </ProductTableMenu>
      </div>
    </>
  );
};

export default OrderPage;
