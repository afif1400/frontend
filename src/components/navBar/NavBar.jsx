import React from 'react';
import { useHistory } from 'react-router-dom';
import { Flex, Button, Spacer } from '@chakra-ui/react';
import Logo from '../logo/Logo';
import ProfileButton from '../profileButton/ProfileButton';
import profileData from '../../utils/profileData';

const NavBar = ({ loggedIn }) => {
  const history = useHistory();

  // If user is not loggedIn
  if (!loggedIn) {
    return (
      <Flex
        as='nav'
        position='fixed'
        width='100%'
        alignItems='center'
        padding='1em'
        bgColor='white'
        zIndex='10'
        boxShadow='0 1px 5px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(250, 250, 242)'
      >
        <Logo />
        <Spacer />
        <Flex alignItems='center'>
          <Button
            marginRight='0.8em'
            variant='link'
            onClick={() => {
              history.push('/signup');
            }}
          >
            Sign up
          </Button>
          <Button
            paddingX='1.3em'
            onClick={() => history.push('/login')}
            colorScheme='codeRoyale'
          >
            Login
          </Button>
        </Flex>
      </Flex>
    );
  }

  // Default navBar (loggedIn)
  return (
    <Flex
      as='nav'
      position='fixed'
      width='100%'
      height='70px'
      alignItems='center'
      padding='1em'
      bgColor='white'
      zIndex='10'
    >
      <Logo />
      <Spacer />
      <ProfileButton profileData={profileData()} />
    </Flex>
  );
};

export default NavBar;
