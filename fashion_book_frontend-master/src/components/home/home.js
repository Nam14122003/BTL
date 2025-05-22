import React, { Component, useState } from "react";
import HeaderTop from "../header/header.top";
import HeaderMiddle from "../header/header.middle";
import HeaderBottom from "../header/header.bottom";
import ContentHome from "./content.home";
import FooterTop from "../footer/footer.top";
import FooterMiddle from "../footer/footer.middle";
import FooterBottom from "../footer/footer.bottom";
import ChatBot from "../ChatBot/ChatBot";
import banner1 from "./banner1.webp";
import banner2 from "./banner2.webp";
import banner3 from "./banner3.jpg";
import banner4 from "./banner4.jpg";
import banner5 from "./banner5.jpg";
const Home = ({
  islogin,
  logout,
  category,
  publisher,
  book,
  totalpage,
  backPage,
  nextPage,
  setPage,
  page,
  sortType,
  setSortType,
  setRangeType,
  title,
  setTitle,
  setBranch,
  branch,
  setSearchText,
  author,
  setIDBranch,
  branchClick,
  history,
  searchTextSubmit,
  addToCart,
}) => {
  const [showAd, setShowAd] = useState(true);

  return (
    <div>
      <header id="header">
        <HeaderMiddle
          islogin={islogin}
          logout={() => logout()}
          history={history}
          sortType={sortType}
          setSortType={(value) => setSortType(value)}
          setSearchText={(value) => setSearchText(value)}
          searchTextSubmit={() => searchTextSubmit()}
        />
        <HeaderBottom />
      </header>
      {showAd && (
        <div style={{ position: "relative", margin: "20px 0 100px 0" }}>
          <button
            onClick={() => setShowAd(false)}
            style={{
              position: "absolute",
              top: 4,
              right: 4,
              background: "rgba(0,0,0,0.5)",
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              width: 18,
              height: 18,
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: 12,
              zIndex: 2,
              lineHeight: "14px",
              padding: 0,
            }}
            aria-label="Đóng quảng cáo"
          >
            ×
          </button>
          <a
            href="https://pibook.vn/?srsltid=AfmBOoqL7vcllFtmElCXzNW1izpVYj53mSNUunUAp9z8nMkdGJSjz63b"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "block", width: "100%", height: 70 }}
          >
            <div className="fade-banner">
              <img src={banner1} className="fade-img img1" alt="Banner 1" />
              <img src={banner2} className="fade-img img2" alt="Banner 2" />
              <img src={banner3} className="fade-img img3" alt="Banner 3" />
              <img src={banner4} className="fade-img img4" alt="Banner 44" />
              <img src={banner5} className="fade-img img5" alt="Banner 5" />
            </div>
          </a>
        </div>
      )}
      <ContentHome
        category={category}
        publisher={publisher}
        book={book}
        totalpage={totalpage}
        backPage={() => backPage()}
        nextPage={() => nextPage()}
        setPage={(page) => setPage(page)}
        page={page}
        setRangeType={(range) => setRangeType(range)}
        title={title}
        setTitle={(title) => setTitle(title)}
        setBranch={(branch) => setBranch(branch)}
        branch={branch}
        author={author}
        setIDBranch={(id) => setIDBranch(id)}
        branchClick={(branch, id) => branchClick(branch, id)}
        addToCart={(product) => addToCart(product)}
      />
      <footer id="footer">
        <FooterTop />
        <FooterMiddle />
        <FooterBottom />
      </footer>
      <ChatBot />
    </div>
  );
};

export default Home;
