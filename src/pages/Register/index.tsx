import { HStack } from "@chakra-ui/react";
import bg from "../../assets/images/loginbg.jpg";
import FormRegister from "../../components/FormRegister";
import IndexHeader from "../../components/IndexHeader";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
const Register = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  });
  return (
    <motion.div
      initial={{ opacity: 0.2 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      exit={{ opacity: 0 }}
    >
      <HStack
        w={"100vw"}
        h={"100vh"}
        justify={"space-evenly"}
        align={"center"}
        flexDir={["column", "column", "row"]}
        bgImage={bg}
        bgSize={"cover"}
        bgRepeat={"no-repeat"}
        bgPosition={"center"}
      >
        <IndexHeader />
        <FormRegister />
      </HStack>
    </motion.div>
  );
};

export default Register;
