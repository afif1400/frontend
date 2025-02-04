import React from 'react';
import {
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  Icon,
  Text,
  Flex,
} from '@chakra-ui/react';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';

const SettingsField = ({
  disabled,
  heading,
  value,
  leftElement,
  userNameAvailable,
  checkUserNameAvailability,
  onChange,
  onBlur,
}) => {
  // Show span for availability of userName
  const handleAvailability = () => {
    if (checkUserNameAvailability && userNameAvailable === null) {
      return null;
    }
    if (checkUserNameAvailability && userNameAvailable) {
      return (
        <InputRightElement>
          <Icon as={AiOutlineCheck} color='green.500' />
        </InputRightElement>
      );
    }
    if (checkUserNameAvailability && !userNameAvailable) {
      return (
        <InputRightElement>
          <Icon as={AiOutlineClose} color='red.500' />
        </InputRightElement>
      );
    }
    return null;
  };

  // Check if the input is disabled or not in props
  if (!disabled) {
    return (
      <Flex flexDirection='column'>
        <Text mb='6px'>{heading}</Text>
        <InputGroup>
          <InputLeftElement
            pointerEvents='none'
            color='gray.300'
            fontSize='1.2em'
          >
            {leftElement}
          </InputLeftElement>
          <Input
            placeholder={heading}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            variant='filled'
          />
          {handleAvailability()}
        </InputGroup>
      </Flex>
    );
  }
  return (
    <Flex flexDirection='column'>
      <Text mb='6px'>{heading}</Text>
      <InputGroup>
        <InputLeftElement
          pointerEvents='none'
          color='gray.300'
          fontSize='1.2em'
        >
          {leftElement}
        </InputLeftElement>
        <Input placeholder={heading} value={value} variant='filled' disabled />
      </InputGroup>
    </Flex>
  );
};

export default SettingsField;
