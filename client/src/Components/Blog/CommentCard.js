import React, { memo } from "react";

const CommentCard = ({ comment }) => {
  return (
    <div className="w-full flex gap-3 md:gap-5 mb-8">
        <div className="flex-grow-0 shrink-0">
          <img src={comment.user.avatar.url} alt="" className="w-11 h-11 md:w-14 md:h-14 rounded-full" />
        </div>
        <div className="">
            <h1 className="capitalize text-sm md:text-base text-text-black break-all">
            {comment.user.name}
            </h1>
            <p className="mt-1 md:mt-2 leading-relaxed break-all">
                {comment.comment}
            </p>
        </div>
    </div>
  );
};

export default memo(CommentCard);