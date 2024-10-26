import React, { useState, useEffect } from 'react';
import cyber from "./assets/coding.gif";
import { ImSpinner2 } from "react-icons/im";
import { Toaster, toast } from 'sonner';

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/news');
      const data = await response.json();
      setNews(data.news.reverse());
      console.log(data.news);
    } catch (error) {
      toast.error("Failed to fetch news. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div>
      <Toaster richColors />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>

      <section className="text-gray-600 body-font relative">
        <div className="flex flex-col justify-center items-center">
          <img src={cyber} className="h-52 w-52 my-7" alt="Technology News" />
        </div>

        <div className="container px-5 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-bold title-font mb-4 text-gray-900">
              Latest <span className="text-cyan-500">Technology News</span>
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-lg font-semibold">
              Stay updated with the latest trends and news in technology and coding.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center">
              <ImSpinner2 size={40} className="animate-spin text-cyan-500" />
              <span className="ml-4 text-lg">Loading News...</span>
            </div>
          ) : (
            <div className="lg:w-2/3 mx-auto">
              {news.length ? (
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {news.map((article, index) => (
                    <div key={index} className="p-4 mb-4 border bg-white border-cyan-300 rounded-lg">
                      <h2 className="text-xl font-bold">
                        <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-cyan-500 hover:underline">
                          {article.title}
                        </a>
                      </h2>
                      <p className="text-gray-700 mt-2">{article.description}</p>
                      <p className="text-sm text-gray-500">Published on: {article['published date']}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-lg text-gray-500">No news articles available at the moment.</p>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
