import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Form from "./Form"; // Or import your main form component

function Rick() {
  return (
    <ChakraProvider>
      <Form />
    </ChakraProvider>
  );
}

export default Rick;
