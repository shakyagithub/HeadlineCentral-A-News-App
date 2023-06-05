import React, { useEffect, useState } from "react";
import { getNews } from "../Services/getNews";
import moment from "moment";
import alanBtn from "@alan-ai/alan-sdk-web";

export default function NewsData() {
  const [newsData, setNewsData] = useState([]);
  const alankey = `98589cb9eee25506ef651c05eba96cc32e956eca572e1d8b807a3e2338fdd0dc/stage`;
  const [selectOption, setSelectOption] = useState("");
  const getAllNews = async () => {
    let data = await getNews(selectOption);
    setNewsData(data.data.articles);
  };

  const selectCategory = (event) => {
    setSelectOption(event.target.value);
  };

  useEffect(() => {
    alanBtn({
      key: alankey,
      onCommand: (commandData) => {
        setSelectOption(commandData.data);
      },
    });
  }, []);

  useEffect(() => {
    getAllNews();
  }, [selectOption]);
  return (
    <>
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <h1><strong>HeadlineCentral</strong></h1>
          <div className="select">
            <label for="cars">Choose a Category:</label>
            <select
              className="select-box"
              name="category"
              id="category"
              onChange={selectCategory}
              value={selectOption}
            >
              <option value="general">General</option>
              <option value="health">Health</option>
              <option value="business">Business</option>
              <option value="politics">Politics</option>
              <option value="sports">Sports</option>
              <option value="entertainment">Entertainment</option>
              <option value="technology">Technology</option>
            </select>
          </div>
        </div>
      </nav>
      <div className="container">
        <div className="grid-main">
          {newsData?.map((news) => {
            return (
              <div className="grid-child">
                <img
                  src={
                    news?.urlToImage
                      ? news?.urlToImage
                      : "https://media4.s-nbcnews.com/i/newscms/2019_01/2705191/nbc-social-default_b6fa4fef0d31ca7e8bc7ff6d117ca9f4.png"
                  }
                  className="news-image"
                />
                <p className="">
                  <strong>{news?.title}</strong>
                </p>
                <p className="news-content">{news?.content}</p>
                <div className="space-between">
                  <p className="news-author">
                    Author: {news?.author ? news?.author : "Not Available"}
                  </p>
                  <p className="news-date">
                    Date: {moment(news?.publishedAt).format("LL")}
                  </p>
                </div>
                <a href={news?.url} target="blank">
                  Read More
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </>
    // <div className="main">
    //   <h1>HappyMorning News</h1>
    //   <div className="select">
    //     <label for="cars">Choose a Category:</label>
    //     <select
    //       className="select-box"
    //       name="category"
    //       id="category"
    //       onChange={selectCategory}
    //       value={selectOption}
    //     >
    //       <option value="general">General</option>
    //       <option value="health">Health</option>
    //       <option value="business">Business</option>
    //       <option value="politics">Politics</option>
    //       <option value="sports">Sports</option>
    //       <option value="entertainment">Entertainment</option>
    //       <option value="technology">Technology</option>
    //     </select>
    //   </div>
    //   <div className="grid-main">
    //     {newsData?.map((news) => {
    //       return (
    //         <div className="grid-child">
    //           <img
    //             src={
    //               news?.urlToImage
    //                 ? news?.urlToImage
    //                 : "https://media4.s-nbcnews.com/i/newscms/2019_01/2705191/nbc-social-default_b6fa4fef0d31ca7e8bc7ff6d117ca9f4.png"
    //             }
    //             className="news-image"
    //           />
    //           <p className="">
    //             <strong>{news?.title}</strong>
    //           </p>
    //           <p className="news-content">{news?.content}</p>
    //           <div className="space-between">
    //             <p className="news-author">
    //               Author: {news?.author ? news?.author : "Not Available"}
    //             </p>
    //             <p className="news-date">
    //               Date: {moment(news?.publishedAt).format("LL")}
    //             </p>
    //           </div>
    //           <a href={news?.url} target="blank">
    //             Read More
    //           </a>
    //         </div>
    //       );
    //     })}
    //   </div>
    // </div>
  );
}
