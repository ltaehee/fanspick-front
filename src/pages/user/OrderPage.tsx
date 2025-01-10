import { ChangeEvent, useState } from 'react';
import api from '../../utils/api';
import ProductTableHeader from '../../components/productTable/ProductTableHeader';
import ProductTableMenu from '../../components/productTable/ProductTableMenu';
import tableStyles from '../../css/productTable/productTable.module.css';
import orderstyles from '../../css/order.module.css';
import dummyImg2 from '/images/product/dog2.jpg';
import { Button, Input } from 'ys-project-ui';
import AddressSearch from '../../components/AddressSearch';
import { Address } from 'react-daum-postcode';
import { useUserContext } from '../../context/UserContext';

const OrderPage = () => {
  const { user } = useUserContext();
  const userId = user?.id;
  const favorites = JSON.parse(
    localStorage.getItem(`favorite_${userId}`) || '[]',
  );
  console.log('즐겨찾기목록', favorites);

  console.log('유저 정보', user);
  const [address, setAddress] = useState({
    roadAddress: '',
    zoneCode: '',
    jibunAddress: '',
    detailAddress: '',
  });

  const [updatedUser, setUpdatedUser] = useState({
    name: '',
    email: '',
    role: '',
  });

  const handleDaumPost = (data: Address) => {
    setAddress((prev) => ({
      ...prev,
      roadAddress: data.roadAddress,
      jibunAddress: data.jibunAddress,
      zoneCode: data.zonecode,
      detailAddress: prev.detailAddress || '',
    }));
    setIsOpen(false);
  };
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (
      ['roadAddress', 'zoneCode', 'jibunAddress', 'detailAddress'].includes(
        name,
      )
    ) {
      setAddress((prev) => ({ ...prev, [name]: value }));
    } else {
      setUpdatedUser((prev) => ({ ...prev, [name]: value }));
    }
  };

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
        <div className={orderstyles.productInfoWrap}>
          <ProductTableHeader className={orderstyles.Header_wrap}>
            <ProductTableHeader.Menu
              menu="상품정보"
              className={tableStyles.Header_menu_first}
            />
            <ProductTableHeader.Menu
              menu="판매 금액"
              className={tableStyles.Header_menu}
            />
            <ProductTableHeader.Menu
              menu="수량"
              className={tableStyles.Header_menu}
            />
          </ProductTableHeader>
          <ProductTableMenu>
            {favorites.map((product: any) => (
              <div key={product.id} className={orderstyles.content}>
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
        <div className={orderstyles.totalPriceBox}>
          <p>주문상품금액?</p>
          <p>+</p>
          <p>배송비 0(임시)</p>
          <p>=</p>
          <p>최종 결제 금액??</p>
        </div>
        <h3 className={orderstyles.h3}>고객 / 배송지 정보</h3>
        <div className={orderstyles.inputBoxWrap}>
          <div className={orderstyles.inputBox}>
            <label>받는분</label>
            <Input
              name="name"
              value={updatedUser.name}
              onChange={handleChange}
            />
          </div>
          <div className={orderstyles.inputBox}>
            <label>이메일</label>
            <input />
          </div>
        </div>

        <div className={orderstyles.inputBoxWrap}>
          <Input
            placeholder="우편번호"
            name="zoneCode"
            value={address.zoneCode || ''}
            onChange={handleChange}
          />
          <Button onClick={() => setIsOpen(true)} label="주소 검색" />
        </div>
        <AddressSearch
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onComplete={handleDaumPost}
        />
        <div className={orderstyles.inputBoxWrap}>
          <Input
            placeholder="도로명 주소"
            name="roadAddress"
            value={address.roadAddress || ''}
            onChange={handleChange}
          />
          <Input
            placeholder="상세 주소"
            name="detailAddress"
            value={address.detailAddress || ''}
            onChange={handleChange}
          />
        </div>
        <Button label="결제하기" className={orderstyles.paymentBtn} />
      </div>
    </>
  );
};

export default OrderPage;
