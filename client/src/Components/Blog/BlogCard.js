import React , { memo } from 'react'
import { Link } from 'react-router-dom'
import parse from 'html-react-parser';


const BlogCard = ({blog,page}) => {
  return (
    <div className='flex flex-col h-max'>
      <div className={`${page?'aspect-[2/1]':'aspect-[3/2]'} overflow-hidden cursor-pointer grow shrink`}>
        <Link to={`/blog/${blog._id}`} aria-label={`/blog/${blog._id}`}>
          <img src={blog.image.url} alt="" className="w-full h-full object-center object-cover transition-transform ease-linear duration-500 hover:scale-110" />
        </Link>
      </div>
      <div className="mt-4">
        <h1 className='text-text-Grey text-[13px]'>
            By <span className="text-text-black">{blog.createdBy.name}</span> on <span className="text-text-black">{new Date(blog.createdAt).toDateString()}</span>
        </h1>
        <Link  to={`/blog/${blog._id}`}>
          <h1 className={`capitalize cursor-pointer ${page?"font-bold text-2xl":"font-medium text-lg"} my-1 lg:my-3 text-text-black transition-colors duration-500 hover:text-blue-500`}>{blog.title}</h1>
          <div className={`text-xs  sm:text-sm text-text-Grey whitespace-pre-wrap break-all  ${page=="blogDetail"?"leading-6 sm:leading-6":"leading-5 sm:leading-5 line-clamp-2"}`}>{parse(blog.desc)}</div>
        </Link>
      </div>
    </div>
  )
}

export default memo(BlogCard);