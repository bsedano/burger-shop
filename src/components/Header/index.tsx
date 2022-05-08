import {
  Heading,
  HStack,
  Text,
  Box,
  Icon,
  Center,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Img,
  VStack,
} from "@chakra-ui/react";
import drawer from "../../assets/images/drawer.gif";
import InputSearch from "../InputSearch";
import logoburguer from "../../assets/images/logoburguer.png";
import { IoMdExit } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCart } from "../../providers/cart";
import { useAuth } from "../../providers/auth";
import CardProduct from "../CardProduct";

const Header = () => {
  const { cart, clearCart } = useCart();
  const quantity = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };
  const { Logout } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <HStack
      as="header"
      w={"100%"}
      bgColor={"rgba( 11, 11, 11, 0.9 )"}
      p={4}
      justify={"space-between"}
      boxShadow={"0 8px 10px 0 black"}
    >
      <HStack>
        <Img src={logoburguer} h={"80px"} display={["none", "block"]} />
        <Heading
          fontFamily={"Bangers"}
          color={"honeydew"}
          textShadow={"0px 0px 5px black"}
          fontSize={["2xl", "3xl", "4xl"]}
        >
          Burger
          <Text color={"green"} as="span">
            .
          </Text>
          Shop
        </Heading>
      </HStack>

      <HStack spacing={6}>
        <InputSearch />
        <HStack>
          <Icon
            as={AiOutlineShoppingCart}
            color={"honeydew"}
            w={8}
            h={8}
            _hover={{ cursor: "pointer", transform: "scale(1.1)" }}
            onClick={onOpen}
            marginRight={"-20px"}
          />

          <Center w={5} h={5} bgColor={"green.500"} borderRadius={"100%"}>
            <Text color={"white"} textShadow={"0px 0px 2px black"}>
              {quantity}
            </Text>
          </Center>
        </HStack>

        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"md"}>
          <DrawerOverlay />
          <DrawerContent boxShadow={"0 8px 10px 0 black"}>
            <DrawerCloseButton color={"white"} />
            <DrawerHeader
              fontFamily={"Inter"}
              bgColor={"green.700"}
              color={"white"}
              textShadow={"0px 0px 5px black"}
            >
              Resumo do pedido:{" "}
            </DrawerHeader>

            <DrawerBody bgColor={"green.400"}>
              {cart.length > 0 ? (
                cart.map((item, index) => (
                  <CardProduct key={index} product={item} type="cart" />
                ))
              ) : (
                <VStack
                  w={"100%"}
                  h={"100%"}
                  display={"flex"}
                  flexDir={"column"}
                  spacing={4}
                  justify={"center"}
                >
                  <Heading
                    fontFamily={"Inter"}
                    textAlign={"center"}
                    color={"white"}
                    textShadow={"0px 0px 5px black"}
                  >
                    Adicione alguns itens deliciosos.
                  </Heading>
                  <Img src={drawer} w={"100%"} rounded={"100%"} />
                </VStack>
              )}
            </DrawerBody>

            <DrawerFooter bgColor={"orange.200"}>
              <VStack w={"100%"}>
                <HStack
                  w={"100%"}
                  justify={"space-between"}
                  fontFamily={"Inter"}
                  color={"black"}
                  fontWeight={"600"}
                  fontSize={"xl"}
                  textShadow={"0px 0px 1px black"}
                >
                  <Text>Total: {formatPrice(totalPrice)}</Text>
                  <Text>Itens: {quantity}</Text>
                </HStack>
                <HStack w={"100%"}>
                  <Button w={"50%"} colorScheme={"orange"} onClick={clearCart}>
                    Limpar carrinho
                  </Button>
                  <Button w={"50%"} colorScheme={"green"}>
                    Finalizar pedido
                  </Button>
                </HStack>
              </VStack>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        <Menu>
          <MenuButton
            as={IconButton}
            bgColor={"transparent"}
            icon={<IoMdExit size={"30px"} color={"white"} />}
            colorScheme={"white"}
          >
            Actions
          </MenuButton>
          <MenuList
            bgColor={"blackAlpha.800"}
            color={"white"}
            fontFamily={"Inter"}
          >
            <MenuItem
              textShadow={"0px 0px 5px black"}
              icon={<IoMdExit />}
              onClick={Logout}
            >
              Deslogar
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </HStack>
  );
};

export default Header;
