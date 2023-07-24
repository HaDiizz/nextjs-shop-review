import React from "react";
import Link from "next/link";
import moment from "moment/moment";

const Blogs = async () => {
  const API_URL = "http://localhost:1337";
  const res = await fetch(`${API_URL}/api/authors?populate=*`, {
    next: { revalidate: 10 },
  });
  const authors = await res.json();
  return (
    <div className="h-screen px-5 pt-10">
      <div className="grid gap-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 xs:grid-cols-1">
        {authors.data.length > 0 &&
          authors.data.map((author) => (
            <Link key={author.id} href={`/authors/${author.id}`}>
              <div className="bg-white rounded-lg shadow-md p-4">
                <h1 className="text-2xl font-bold mb-2">
                  {author.attributes.fname} {author.attributes.lname}
                </h1>
                <p className="text-gray-700 mb-4">{author.attributes.email}</p>
                <b className="text-indigo-500">
                  Total Posts: {author.attributes.posts.data.length}
                </b>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Blogs;
