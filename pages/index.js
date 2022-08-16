import React from 'react'
import { Product,FooterBanner,HeroBanner } from '../components'
import { client } from '../lib/client'



const Home = ({products,bannerData}) => (
    <div>
      <HeroBanner heroBanner = {bannerData.length && bannerData[0]}/>
      <div className="products-heading">
        <h2>Best Seller Products</h2>
        <p>speaker There are many variations passages</p>
      </div>
      
      <div className="products-container">
      {products?.map((product) => <Product key={product._id} product={product} />)}
    </div>
      
      <FooterBanner footerBanner={bannerData && bannerData[0]}/>
    </div>
  )
  
//getStaticProps: cho phép lấy dữ liệu trong quá trình xây dựng;
//getStaticPaths - Chỉ định định tuyến động dựa trên dữ liệu;

//getServerSideProps: cho phép bạn lấy dữ liệu cho từng yêu cầu.
export const  getServerSideProps = async()=>{
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props:{products,bannerData}
  }
}
export default Home;