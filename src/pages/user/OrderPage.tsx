import { ChangeEvent, useState } from 'react';
import api from '../../utils/api';
import ProductTableHeader from '../../components/productTable/ProductTableHeader';
import ProductTableMenu from '../../components/productTable/ProductTableMenu';
import tableStyles from '../../css/productTable/productTable.module.css';
import orderstyles from '../../css/order.module.css';
import { Button, Input } from 'ys-project-ui';
import AddressSearch from '../../components/AddressSearch';
import { Address } from 'react-daum-postcode';
import { useUserContext } from '../../context/UserContext';
import { useLocation } from 'react-router-dom';
import { addCommas } from '../../utils/util';
import { toast } from 'react-toastify';
import { emailPattern } from '../../consts/patterns';

const OrderPage = () => {
  const { user, token } = useUserContext();
  const userId = user?.id;

  const location = useLocation();
  const { product, quantity } = location.state;
  const totalPrice = product.price * quantity;

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

  const handleOrderClick = async () => {
    const { name, email } = updatedUser;
    if (!name.trim()) {
      toast.error('이름을 입력해주세요.');
      return;
    }
    if (!emailPattern.test(email)) {
      toast.error('올바른 이메일 형식을 입력해주세요.');
      return;
    }
    if (
      !address.roadAddress.trim() ||
      !address.zoneCode.trim() ||
      !address.jibunAddress.trim() ||
      !address.detailAddress.trim()
    ) {
      toast.error('주소를 입력해주세요.');
      return;
    }
    const orderData = {
      userId,
      products: [
        {
          ...product,
          quantity,
        },
      ],
      orderAddress: address,
      imp_uid: 'imp123456789',
      totalPrice,
    };

    try {
      const response = await api.post('/purchase/order', orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.success('주문이 완료되었습니다!');
      }
    } catch (error) {
      console.error('Error creating order:');
      toast.error('주문 생성에 실패했습니다.');
    }
  };

  return (
    <>
      <div className={orderstyles.orderPageWrap}>
        <h2 className={orderstyles.h2}>주문 페이지</h2>
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
            <div key={product.id} className={orderstyles.content}>
              <ProductTableMenu.Detail
                productName={product.name}
                image={product.image}
              />
              <ProductTableMenu.Content content={addCommas(product.price)} />
              <div className={tableStyles.quantity_wrap}>
                <ProductTableMenu.Quantity quantity={quantity} />
              </div>
            </div>
          </ProductTableMenu>
        </div>
        <div className={orderstyles.totalPriceBox}>
          <p>주문상품금액 {addCommas(product.price)}원</p>
          <p>+</p>
          <p>배송비 0원(무료)</p>
          <p>=</p>
          <p>최종 결제 금액 {addCommas(totalPrice)}원</p>
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
            <Input
              name="email"
              onChange={handleChange}
              value={updatedUser.email}
            />
          </div>
        </div>

        <Button
          onClick={() => setIsOpen(true)}
          label="주소 검색"
          className={orderstyles.addressSearchBtn}
        />
        <div className={orderstyles.inputBoxWrap}>
          <Input
            placeholder="우편번호"
            name="zoneCode"
            value={address.zoneCode || ''}
            onChange={handleChange}
          />
          <Input
            placeholder="도로명 주소"
            name="roadAddress"
            value={address.roadAddress || ''}
            onChange={handleChange}
          />
        </div>
        <AddressSearch
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onComplete={handleDaumPost}
        />
        <div className={orderstyles.inputBoxWrap}>
          <Input
            placeholder="상세 주소"
            name="detailAddress"
            value={address.detailAddress || ''}
            onChange={handleChange}
          />
        </div>
        <Button
          label="결제하기"
          className={orderstyles.paymentBtn}
          onClick={handleOrderClick}
        />
      </div>
    </>
  );
};

export default OrderPage;
