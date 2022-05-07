import {
  VStack,
  Img,
  Heading,
  Text,
  Button,
  Center,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { useCart } from "../../providers/cart";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
interface Product {
  product: {
    id: number;
    name: string;
    price: number;
    img: string;
    quantity: number;
    category: string;
  };
  type: string;
}

const CardProduct = ({ product, type }: Product) => {
  const { addCart, removeCart } = useCart();
  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };
  const { name, price, img, category } = product;
  return (
    <VStack
      bgColor={"green.400"}
      m={4}
      justify={"space-between"}
      w={"350px"}
      minW={"350px"}
      h={"370px"}
      _hover={{
        cursor: "pointer",
        border: "2px solid green",
      }}
      border={"2px solid white"}
      textAlign={"center"}
      fontFamily={"Inter"}
      textShadow={"0px 0px 3px black"}
      color={"honeydew"}
      boxShadow={"0px 0px 10px black"}
    >
      <Center bgColor={"green.400"} w={"100%"}>
        <Img
          src={img}
          alt={name}
          h={"150px"}
          _hover={{ cursor: "pointer", transform: "scale(1.1)" }}
        />
      </Center>
      <Heading fontFamily={"Inter"} color={"orange.200"}>
        {name}
      </Heading>
      <Text color={"orange.200"}>{category}</Text>
      <Text color={"orange.200"} fontSize={"xl"}>
        {formatPrice(price)}
      </Text>
      {type === "list" ? (
        <Button
          colorScheme={"green"}
          w={"100%"}
          borderRadius={"0px"}
          fontFamily={"Inter"}
          onClick={() => addCart(product)}
          borderTop={"1px solid white"}
        >
          Adicionar
        </Button>
      ) : (
        <HStack
          w={"100%"}
          justifyContent={"space-between"}
          bgColor={"orange.500"}
          borderTop={"1px solid white"}
        >
          <IconButton
            aria-label="remove item"
            borderRadius={"0px"}
            fontFamily={"Inter"}
            colorScheme={"orange"}
            onClick={() => removeCart(product)}
            icon={<AiFillMinusCircle size={25} />}
          />
          <Text fontFamily={"Inter"}>{product.quantity}</Text>
          <IconButton
            aria-label="Add to cart"
            borderRadius={"0px"}
            fontFamily={"Inter"}
            colorScheme={"orange"}
            onClick={() => addCart(product)}
            icon={<AiFillPlusCircle size={25} />}
          />
        </HStack>
      )}
    </VStack>
  );
};

export default CardProduct;
