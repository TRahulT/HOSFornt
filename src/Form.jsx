import React from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Select,
  Heading,
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Form = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
    setValue,
  } = useForm();

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);
  const [submitError, setSubmitError] = React.useState(null);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Post request to the API endpoint
      const response = await axios.post(
        "https://trahult.pythonanywhere.com/createPatient/",
        data
      );
      console.log(response.data);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Handle success or show a success message
    } catch (error) {
      setIsSubmitting(false);
      setSubmitError("Error submitting the form. Please try again later.");
      // Handle error or show an error message
    }
  };

  const fetchStates = async () => {
    try {
      const response = await axios.get(
        "https://trahult.pythonanywhere.com/patient-phonenumber/1234567890/"
        // {
        //   auth: {
        //     username: "root",
        //     password: "root",
        //   },
        // }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching states:", error);
      return [];
    }
  };

  React.useEffect(() => {
    // Fetch states data and set it to the state
    fetchStates().then((statesData) => {
      // Set the state data here
      // Example: setValue('state', statesData[0]?.name);
    });
  }, []);

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)} py={4}>
      <VStack spacing={4}>
        <Heading as="h1" size="lg">
          Add a New Patient
        </Heading>

        {/* Success Message */}
        {submitSuccess && (
          <Alert status="success" borderRadius="md">
            <AlertIcon />
            <AlertTitle>Success!</AlertTitle>
            <CloseButton
              onClick={() => setSubmitSuccess(false)}
              position="absolute"
              right="8px"
              top="8px"
            />
            Patient added successfully!
          </Alert>
        )}

        {/* Error Message */}
        {submitError && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            <AlertTitle>Error!</AlertTitle>
            <CloseButton
              onClick={() => setSubmitError(null)}
              position="absolute"
              right="8px"
              top="8px"
            />
            {submitError}
          </Alert>
        )}

        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input {...register("name", { required: true })} />
          {errors.name && <span>This field is required</span>}
        </FormControl>

        <FormControl>
          <FormLabel>Father's Name</FormLabel>
          <Input {...register("fh_name", { required: true })} />
          {errors.fh_name && <span>This field is required</span>}
        </FormControl>

        <FormControl>
          <FormLabel>Phone Number</FormLabel>
          <Input type="tel" {...register("phonenumber", { required: true })} />
          {errors.phonenumber && <span>This field is required</span>}
        </FormControl>

        <FormControl>
          <FormLabel>Alternate Number</FormLabel>
          <Input type="tel" {...register("alternate_number")} />
        </FormControl>

        <FormControl>
          <FormLabel>Date of Birth</FormLabel>
          <Controller
            name="dob"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <DatePicker
                {...field}
                selected={field.value}
                onChange={(date) => setValue("dob", date)}
                dateFormat="yyyy-MM-dd"
              />
            )}
          />
          {errors.dob && <span>This field is required</span>}
        </FormControl>

        {/* State Select */}
        <FormControl>
          <FormLabel>State</FormLabel>
          <Select {...register("state", { required: true })}>
            {/* Map through state data and generate options */}
          </Select>
          {errors.state && <span>This field is required</span>}
        </FormControl>

        <Button
          type="submit"
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          loadingText="Submitting..."
        >
          Add Patient
        </Button>
      </VStack>
    </Box>
  );
};

export default Form;
