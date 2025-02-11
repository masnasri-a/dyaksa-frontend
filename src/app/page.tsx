"use client";
import Headers from "../app/common/header";
import Hero from "./common/hero";
import BlogLanding from "./common/blog";
import Pricelist from "./common/pricelist";
import Review from "./common/review";
import Footer from "./common/footer";

export default function HomePages() {


  return (
    <>
      <Headers />
      <Hero />
      <BlogLanding />
      <Pricelist />
      <Review />
      <Footer />
    </>
  );
}
