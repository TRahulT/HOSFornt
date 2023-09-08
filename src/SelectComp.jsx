import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Select,
  VStack,
  Box,
  Text,
  Button,
  ChakraProvider,
  CSSReset,
} from "@chakra-ui/react";

const StateSelector = () => {
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");

  useEffect(() => {
    // Fetch states data from the API
    axios
      .get("https://trahult.pythonanywhere.com/states/", {
        auth: {
          username: "root",
          password: "root",
        },
      })
      .then((response) => {
        console.log(response.data);
        setStates(response.data);
      })
      .catch((error) => {
        console.error("Error fetching states data:", error);
      });
  }, []);

  const handleChange = (event) => {
    console.log(event.target.value);
    setSelectedState(event.target.value);
  };

  const handleClear = () => {
    setSelectedState("");
  };

  const handleSubmit = () => {
    alert("asdsf");
    // Make a POST request to submit the selected state
    // axios
    //   .post(
    //     "https://trahult.pythonanywhere.com/states/",
    //     {
    //       selectedState,
    //     },
    //     {
    //       auth: {
    //         username: "root",
    //         password: "root",
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     console.log("Successfully submitted:", response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error submitting state:", error);
    //   });
  };

  return (
    <VStack align="center" spacing={4}>
      <Box>
        <Text fontSize="lg" fontWeight="bold">
          Select a State:
        </Text>
        <Select value={selectedState} onChange={handleChange} maxWidth="300px">
          <option value="">Select a state...</option>
          {states.map((state, i) => (
            <option key={state.Stateid} value={state.State_name}>
              {state.State_name}
            </option>
          ))}
        </Select>
      </Box>
      {selectedState && (
        <Box>
          <Text fontSize="lg">
            You have selected: <strong>{selectedState}</strong>
          </Text>
          <Button mt={4} colorScheme="red" onClick={handleClear}>
            Clear Selection
          </Button>
          <Button mt={4} colorScheme="blue" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      )}
    </VStack>
  );
};

const SelectComp = () => {
  return (
    <ChakraProvider>
      <CSSReset />
      <Box p={8}>
        <StateSelector />
      </Box>
    </ChakraProvider>
  );
};

export default SelectComp;
