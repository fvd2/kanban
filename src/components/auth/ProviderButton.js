import { Button, Center, Text } from '@chakra-ui/react';

const ProviderButton = ({ providerName, icon, onSignIn }) => {

  const handleSignIn = () => {
    onSignIn(providerName)
  }

  return (
    <Center p={1}>
      <Button
        w={'full'}
        maxW={'md'}
        variant={'outline'}
        leftIcon={icon}
        onClick={handleSignIn}
        >
        <Center>
        {providerName !== 'anonymous' ? <Text>Sign in with {providerName}</Text> : <Text>Sign in anonymously</Text>}
        </Center>
      </Button>
    </Center>
  );
}

export default ProviderButton