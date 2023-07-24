import moment from "moment";
import Link from "next/link";
import React from "react";
import ReactMarkdown from "react-markdown";

const BlogDetail = async ({ params }) => {
  const API_URL = "http://localhost:1337";
  const res = await fetch(`${API_URL}/api/posts/${params.id}?populate=*`, {
    next: { revalidate: 10 },
  });
  const post = await res.json();
  return (
    <div className="h-screen px-5 pt-10">
      <div className="flex justify-center items-center pb-5">
        <div
          className="overflow-hidden"
          style={{ width: "80%", height: "400px" }}
        >
          <img
            className="w-full h-full object-cover hover:scale-150 ease-in duration-200 cursor-pointer"
            src={`${API_URL}${post.data.attributes.image_cover.data.attributes.url}`}
            alt="thumbnail"
          />
        </div>
      </div>
      <div className="post-detail pt-5 pb-[10rem] flex flex-col gap-10 ml-7 mr-7">
        <div className="flex flex-col items-end">
          <b className="text-gray-400">
            Created: {moment(post.data.attributes.createdAt).format("LLL")}
          </b>
          <b className="text-gray-400">
            Published: {moment(post.data.attributes.publishedAt).fromNow()}
          </b>
        </div>
        <h1 className="text-5xl text-gray-600 font-bold">
          {post.data.attributes.title}
        </h1>
        <ReactMarkdown>{post.data.attributes.content}</ReactMarkdown>
        <Link href={`/authors/${post.data.attributes.author.data.id}`}>
          <b>
            Author:{" "}
            <i className="text-indigo-500">
              {post.data.attributes.author.data.attributes.fname}{" "}
              {post.data.attributes.author.data.attributes.lname}
            </i>
          </b>
        </Link>
      </div>
    </div>
  );
};

export default BlogDetail;
