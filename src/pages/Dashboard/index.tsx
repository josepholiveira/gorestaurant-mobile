import React from 'react';
import { Image } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import Logo from '../../assets/logo-header.png';

import { Container, Header } from './styles';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Header>
        <Image source={Logo} />
        <Icon name="log-out" size={24} color="#FFB84D" />
      </Header>
    </Container>
  );
};

export default Dashboard;
