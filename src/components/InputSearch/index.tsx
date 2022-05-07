import {
  InputGroup,
  InputRightElement,
  Input,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Box,
} from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";
import { useProducts } from "../../providers/products";

const InputSearch = () => {
  const { search, setSearch, productsFilter } = useProducts();
  return (
    <>
      <InputGroup
        w={"300px"}
        colorScheme={"orange"}
        display={["none", "none", "block", "block"]}
      >
        <Input
          placeholder="Pesquisar"
          size={"lg"}
          variant={"flushed"}
          color={"white"}
          _focus={{ borderColor: "#48bb78" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <InputRightElement
          children={
            <IconButton
              aria-label="Pesquisar"
              colorScheme={"green"}
              icon={<MdSearch />}
              size={"sm"}
              marginBottom={"-5px"}
              onClick={() => productsFilter(search)}
            />
          }
        />
      </InputGroup>
      <Box display={["block", "block", "none", "none"]}>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<MdSearch />}
            colorScheme={"green"}
            size={"sm"}
            boxShadow={"0px 0px 10px black"}
          />
          <MenuList bgColor={"blackAlpha.900"} border={"none"} h={"55px"}>
            <InputGroup h={"50px"}>
              <Input
                placeholder="Pesquisar"
                size={"lg"}
                color={"white"}
                _focus={{ borderColor: "#48bb78" }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <InputRightElement
                children={
                  <IconButton
                    aria-label="Pesquisar"
                    colorScheme={"green"}
                    icon={<MdSearch />}
                    size={"sm"}
                    marginBottom={"-5px"}
                    onClick={() => productsFilter(search)}
                  />
                }
              />
            </InputGroup>
          </MenuList>
        </Menu>
      </Box>
    </>
  );
};

export default InputSearch;
