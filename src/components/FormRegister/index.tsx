import {
  Button,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  Text,
  FormLabel,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { MdLockOutline, MdOutlineEmail, MdPersonOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../../providers/register";

const FormRegister = () => {
  const { Register } = useRegister();

  const formSchema = yup.object().shape({
    name: yup.string().required("O nome é obrigatório"),
    email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
    password: yup
      .string()
      .required("Senha obrigatória")
      .min(6, "Senha deve ter no mínimo 6 caracteres"),
    passwordConfirm: yup
      .string()
      .required("Confirmação obrigatória")
      .oneOf([yup.ref("password"), null], "Senhas não conferem"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(formSchema),
  });

  interface User {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
  }

  const onSubmit = (data: User) => {
    Register(data);
  };

  const navigate = useNavigate();

  const isError =
    errors.name || errors.email || errors.password || errors.passwordConfirm
      ? true
      : false;

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
          Registro
        </FormLabel>
        <InputGroup m={4}>
          <InputLeftElement children={<MdPersonOutline color="grey" />} />
          <Input
            type="text"
            variant={"flushed"}
            color={"honeydew"}
            rounded={"md"}
            placeholder="Digite seu Nome"
            {...register("name")}
          />
        </InputGroup>
        {errors.name && (
          <Text color={"red.500"} fontFamily={"Inter"} fontSize={["md", "lg"]}>
            {errors.name.message}
          </Text>
        )}
        <InputGroup m={4}>
          <InputLeftElement children={<MdOutlineEmail color="grey" />} />
          <Input
            type="email"
            variant={"flushed"}
            color={"honeydew"}
            rounded={"md"}
            placeholder="Digite seu melhor e-mail"
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
        <InputGroup m={4}>
          <InputLeftElement children={<MdLockOutline color="grey" />} />
          <Input
            type="password"
            placeholder="Confirme a sua senha"
            rounded={"md"}
            color={"honeydew"}
            variant={"flushed"}
            {...register("passwordConfirm")}
          />
        </InputGroup>
        {errors.passwordConfirm && (
          <Text color={"red.500"} fontFamily={"Inter"} fontSize={["sm", "lg"]}>
            {errors.passwordConfirm.message}
          </Text>
        )}
        <Text
          as="p"
          fontFamily={"Nunito"}
          color={"honeydew"}
          fontSize={["1.0rem", "1.0rem", "1.4rem"]}
        >
          Crie sua conta para saborear muitas delícias e matar sua fome!
        </Text>
        <Button
          colorScheme={"green"}
          w={"100%"}
          m={2}
          boxShadow={"0px 0px 10px black"}
          textShadow={"0px 0px 2px black"}
          fontSize={"1.2rem"}
          type={"submit"}
        >
          Cadastrar
        </Button>

        <Button
          textShadow={"0px 0px 2px black"}
          colorScheme={"orange"}
          w={"100%"}
          onClick={() => navigate("/")}
          m={2}
          boxShadow={"0px 0px 10px black"}
          fontSize={"1.2rem"}
        >
          Voltar
        </Button>
      </FormControl>
    </VStack>
  );
};

export default FormRegister;
