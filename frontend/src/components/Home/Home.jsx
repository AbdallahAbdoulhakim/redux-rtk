import Content from "./Content";
import Cta from "./Cta";
import Feature from "./Feature";
import Hero from "./Hero";
import Pricing from "./Pricing";
import StoreFront from "./StoreFront";
import Team from "./Team";

const Home = () => {
  return (
    <div className="flex-grow">
      <Hero />
      <Feature />
      <Cta />
      <Content />
      <StoreFront />
      <Pricing />
      <Team />
    </div>
  );
};
export default Home;
