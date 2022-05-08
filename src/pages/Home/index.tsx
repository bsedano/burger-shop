import { Box, VStack } from "@chakra-ui/react";
import Header from "../../components/Header";
import { toast } from "react-toastify";
import { useProducts } from "../../providers/products";
import { useNavigate } from "react-router-dom";
import CardProduct from "../../components/CardProduct";
import { motion } from "framer-motion";

import bg from "../../assets/images/bg2.jpg";
import { useEffect } from "react";
const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
      toast.error("Você precisa estar logado para acessar essa página!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  });
  const { search, productsFilter } = useProducts();

  return (
    <motion.div
      initial={{ opacity: 0.2 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      exit={{ opacity: 0 }}
    >
      <VStack
        w={"100vw"}
        h={"100vh"}
        bgImage={bg}
        bgPos={"center"}
        bgSize={"cover"}
        bgRepeat={"no-repeat"}
      >
        <Header />
        <Box
          w={"80vw"}
          justifyContent={["none", "none", "center"]}
          display={"flex"}
          flexWrap={["nowrap", "nowrap", "wrap"]}
          overflow={"auto"}
        >
          {productsFilter(search).map((product, index) => (
            <CardProduct key={index} product={product} type="list" />
          ))}
        </Box>
      </VStack>
    </motion.div>
  );
};

export default Home;
