import { FC, SVGProps, useState } from "react";

type SVGIconProps = FC<SVGProps<SVGSVGElement>>;

const FavoritesBtn: SVGIconProps = (props) => {
  const { className } = props;

  const [isFavorite, setIsFavorite] = useState(false);

  // 좋아요 상태 토글 함수
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <svg
      onClick={toggleFavorite}
      className={className}
      width="23"
      height="21"
      viewBox="-2 -2 24 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 18.35L8.55 17.03C3.4 12.36 0 9.27 0 5.5C0 2.41 2.42 0 5.5 0C7.24 0 8.91 0.81 10 2.08C11.09 0.81 12.76 0 14.5 0C17.58 0 20 2.41 20 5.5C20 9.27 16.6 12.36 11.45 17.03L10 18.35Z"
        fill={isFavorite ? "black" : "none"}
        stroke="black"
        strokeWidth="2"
      />
    </svg>
  );
};

export default FavoritesBtn;
