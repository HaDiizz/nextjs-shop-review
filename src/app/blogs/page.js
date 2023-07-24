import React from "react";
import Link from "next/link";
import moment from "moment/moment";

const Blogs = async () => {
  const API_URL = "http://localhost:1337";
  const res = await fetch(`${API_URL}/api/posts?populate=*`, {
    next: { revalidate: 10 },
  });
  const blogs = await res.json();
  return (
    <div className="h-screen px-5 pt-10">
      <div className="grid gap-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 xs:grid-cols-1">
        {blogs.data.length > 0 &&
          blogs.data.map((post) => (
            <Link href={`/blogs/${post.id}`} key={post.id}>
              <div className="rounded overflow-hidden shadow-lg align-items: center hover:-translate-y-2 duration-200">
                <div
                  className="overflow-hidden"
                  style={{ width: "100%", height: "200px" }}
                >
                  <img
                    className="w-full h-full object-cover hover:scale-150 ease-in duration-200 cursor-pointer"
                    src={`${API_URL}${post.attributes.image_cover.data.attributes.url}`}
                    alt="thumbnail"
                  />
                </div>
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
                  {post.attributes.categories.data.length > 0 &&
                    post.attributes.categories.data.map((category) => (
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        {category.attributes.name}
                      </span>
                    ))}
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Blogs;
