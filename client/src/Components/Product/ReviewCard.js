import { Rating } from "@mui/material";
import React, { memo } from "react";

const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
    size:"small"
  };

  return (
    <div className="flex gap-3 sm:gap-5 mb-8">
        <div className="flex-grow-0 shrink-0 w-fit">
          <img src={review.user.avatar.url} alt="" className="w-11 h-11 sm:w-14 sm:h-14 rounded-full" />
        </div>
        <div className="w-[calc(100%-3.5rem)]">
        <div className="flex flex-col sm:flex-row justify-between gap-2">
            <h1 className="capitalize text-sm md:text-base text-text-black">
            {review.user.name}
            </h1>
            <Rating {...options}/>
        </div>
        <p className="mt-2 sm:mt-4 leading-relaxed">
            {review.comment}
        </p>
        </div>
    </div>
  );
};

export default memo(ReviewCard);