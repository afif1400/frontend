import React from 'react';
import { Flex, Image, Stack, Text } from '@chakra-ui/react';

const ChatBubble = ({ userImage, userName, userMessage, bubbleColor }) => (
  <Flex padding='0.5em' alignItems='center' bgColor={bubbleColor} width='100%'>
    <Image
      cursor='pointer'
      borderRadius='full'
      boxSize='40px'
      src={userImage}
      alt='Profile Picture'
    />
    <Stack marginLeft='0.8em'>
      <Text fontWeight='bold' fontSize='sm'>
        {userName}
      </Text>
      <Text>{userMessage}</Text>
    </Stack>
  </Flex>
);

export default ChatBubble;
