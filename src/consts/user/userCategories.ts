const userCategories = (userId: string) => [
  { path: '/mypage', label: '프로필 수정' },
  { path: '/mypage-order', label: '주문내역' },
  { path: '/mypage-review', label: '등록한 리뷰' },
  { path: `/cart/${userId}`, label: '장바구니' },
  { path: '/mypage-bookmark', label: '즐겨찾기' },
];

export default userCategories;
