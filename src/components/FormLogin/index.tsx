import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  VStack,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useAuth } from "../../providers/auth";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";

const FormLogin = () => {
  const navigate = useNavigate();
  const { Login } = useAuth();

  const formSchema = yup.object().shape({
    email: yup.string().required("Email obrigatório"),
    password: yup
      .string()
      .required("Senha obrigatória")
      .min(6, "Senha deve ter no mínimo 6 caracteres"),
  });

  interface User {
    email: string;
    password: string;
  }

  const onSubmit = (data: User) => {
    Login(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(formSchema),
  });
  const isError = errors.email || errors.password ? true : false;
  return (
    <VStack
      p={4}
      boxShadow={"0px 0px 20px black"}
      w={"40%"}
      minW={"350px"}
      bgColor={"blackAlpha.800"}
      rounded={"xl"}
    >
      <FormControl
        h={"100%"}
        w={"100%"}
        display={"flex"}
        flexDir={"column"}
        justifyContent={"space-evenly"}
        textAlign={"center"}
        alignItems={"center"}
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        isInvalid={isError}
      >
        <FormLabel
          alignSelf={"flex-start"}
          fontWeight={"600"}
          fontSize={"1.8rem"}
          color={"white"}
        >
          Login
        </FormLabel>
        <InputGroup m={4}>
          <InputLeftElement children={<MdOutlineEmail color="grey" />} />
          <Input
            type="email"
            variant={"flushed"}
            color={"honeydew"}
            rounded={"md"}
            placeholder="Digite seu e-mail"
            {...register("email")}
          />
        </InputGroup>
        {errors.email && (
          <Text color={"red.500"} fontFamily={"Inter"} fontSize={["sm", "lg"]}>
            {errors.email.message}
          </Text>
        )}
        <InputGroup m={4}>
          <InputLeftElement children={<MdLockOutline color="grey" />} />
          <Input
            type="password"
            placeholder="Digite a sua senha"
            rounded={"md"}
            color={"honeydew"}
            variant={"flushed"}
            {...register("password")}
          />
        </InputGroup>
        {errors.password && (
          <Text color={"red.500"} fontFamily={"Inter"} fontSize={["sm", "lg"]}>
            {errors.password.message}
          </Text>
        )}
        <Text
          as="p"
          fontFamily={"Nunito"}
          color={"honeydew"}
          fontSize={"1.4rem"}
        >
          Crie sua conta para saborear muitas delícias e matar sua fome!
        </Text>
        <Button
          colorScheme={"green"}
          w={"100%"}
          m={2}
          fontSize={"1.2rem"}
          boxShadow={"0px 0px 10px black"}
          textShadow={"0px 0px 2px black"}
          type={"submit"}
        >
          Logar
        </Button>

        <Button
          colorScheme={"orange"}
          w={"100%"}
          onClick={() => navigate("/register")}
          m={2}
          fontSize={"1.2rem"}
          boxShadow={"0px 0px 10px black"}
          textShadow={"0px 0px 2px black"}
        >
          Cadastrar
        </Button>
      </FormControl>
    </VStack>
  );
};

export default FormLogin;
