import moment from "moment";
import Link from "next/link";
import React from "react";

const AuthDetail = async ({ params }) => {
  const API_URL = "http://localhost:1337";
  const res = await fetch(`${API_URL}/api/authors/${params.id}?populate=*`, {
    next: { revalidate: 10 },
  });
  const author = await res.json();
  return (
    <div className="h-screen px-5 pt-10">
      <div className="grid pb-5">
        <div className="pb-[5rem]">
          <div className="auth-detail pt-5 flex flex-col gap-10 ml-7 mr-7">
            <div className="flex gap-5">
              <b>
                First Name:{" "}
                <span className="text-gray-400">
                  {author.data.attributes.fname}
                </span>
              </b>
              <b>
                Last Name:{" "}
                <span className="text-gray-400">
                  {author.data.attributes.lname}
                </span>
              </b>
            </div>
            <b>
              Email:{" "}
              <span className="text-gray-400">
                {author.data.attributes.email}
              </span>
            </b>
          </div>
        </div>
        <h1 className="font-bold text-indigo-500">
          Total Posts: {author.data.attributes.posts.data.length}
        </h1>
        <div className="">
          <div className="grid gap-5">
            {author.data.attributes.posts.data.length > 0 &&
              author.data.attributes.posts.data.map((post) => (
                <Link href={`/blogs/${post.id}`} key={post.id}>
                  <div className="rounded overflow-hidden shadow-lg align-items: center hover:-translate-y-2 duration-200">
                    <div className="pt-4 pb-2 text-right pr-3">
                      <p className="text-gray-700 text-base">
                        {moment(post.attributes.publishedAt).format("LLL")}
                      </p>
                    </div>
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-4">
                        {post.attributes.title.length > 25
                          ? `${post.attributes.title.substring(0, 25)}...`
                          : post.attributes.title}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthDetail;
