import { Heading, HStack, VStack, Text, Box, Icon } from "@chakra-ui/react";
import { FiShoppingBag } from "react-icons/fi";

const IndexHeader = ({ ...rest }) => {
  return (
    <VStack
      fontFamily={"Inter"}
      align={"flex-start"}
      spacing={4}
      w={"40%"}
      justify={"center"}
      minW={"350px"}
      boxShadow={"0 8px 10px 0 black"}
      p={4}
      bgColor={"rgba( 11, 11, 11, 0.8 )"}
      {...rest}
      rounded={"xl"}
    >
      <Heading fontFamily={"Inter"} color={"honeydew"}>
        Burguer
        <Text as="span" color={"green"}>
          .
        </Text>
        Shop
      </Heading>
      <HStack boxShadow={"0px 0px 5px black"} p={3} rounded={"md"}>
        <Icon
          as={FiShoppingBag}
          w={6}
          h={6}
          color={"green"}
          m={3}
          _hover={{ cursor: "pointer", transform: "scale(1.2)" }}
        />

        <Text
          color={"honeydew"}
          fontFamily={"Nunito"}
          fontSize={["1.0rem", "1.4rem"]}
          textShadow={"0px 0px 2px black"}
        >
          A vida é como um sanduíche, é preciso recheá-la com os melhores
          ingredientes.
        </Text>
      </HStack>
    </VStack>
  );
};

export default IndexHeader;
