import React from "react";
import { HomeMenu } from "./HomeMenu";
import { Header } from "./Header";

const ComingSoon = () => {
  return (
    <>
      <Header />
      <div className="coming-soon body-format">
        <HomeMenu />
        <section className="coming-soon__text-container">
          <p className="coming-soon__text">
            ⭐️ Exciting Developments Await! 🚀 Stay Tuned. 🎉
          </p>
        </section>
      </div>
    </>
  );
};

export { ComingSoon };
