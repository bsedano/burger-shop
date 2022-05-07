import { HStack } from "@chakra-ui/react";
import IndexHeader from "../../components/IndexHeader";
import FormLogin from "../../components/FormLogin";
import loginbg from "../../assets/images/loginbg.jpg";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const Login = () => {
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
        flexDir={["column-reverse", "column-reverse", "row"]}
        bgImage={loginbg}
        bgSize={"cover"}
        bgRepeat={"no-repeat"}
        bgPosition={"center"}
      >
        <FormLogin />
        <IndexHeader />
      </HStack>
    </motion.div>
  );
};

export default Login;
