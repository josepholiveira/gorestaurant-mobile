import React, { useState, useCallback, useMemo, useLayoutEffect } from 'react';
import { Image } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { useNavigation } from '@react-navigation/native';

import {
  Container,
  Header,
  FoodsContainer,
  Food,
  FoodImageContainer,
  FoodContent,
  FoodTitle,
  FoodDescription,
  FoodPricing,
  AdditionalsContainer,
  Title,
  TotalContainer,
  AdittionalItem,
  AdittionalItemText,
  AdittionalQuantity,
  PriceButtonContainer,
  TotalPrice,
  QuantityContainer,
  FinishOrderButton,
  ButtonText,
  IconContainer,
} from './styles';

const FoodDetails: React.FC = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigation = useNavigation();

  const toggleFavorite = useCallback(() => {
    setIsFavorite(!isFavorite);
  }, [isFavorite]);

  const favoriteIconName = useMemo(
    () => (isFavorite ? 'favorite' : 'favorite-border'),
    [isFavorite],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MaterialIcon
          name={favoriteIconName}
          size={24}
          color="#FFB84D"
          onPress={() => toggleFavorite()}
        />
      ),
    });
  }, [navigation, favoriteIconName, toggleFavorite]);

  return (
    <Container>
      <Header />

      <FoodsContainer>
        <Food>
          <FoodImageContainer>
            <Image
              style={{ width: 327, height: 183 }}
              source={{
                uri:
                  'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-food/food1.png',
              }}
            />
          </FoodImageContainer>
          <FoodContent>
            <FoodTitle>Ao Molho</FoodTitle>
            <FoodDescription>Descrição da comida</FoodDescription>
            <FoodPricing>R$ 19,90</FoodPricing>
          </FoodContent>
        </Food>
      </FoodsContainer>
      <AdditionalsContainer>
        <Title>Adicionais</Title>
        <AdittionalItem>
          <AdittionalItemText>Bacon</AdittionalItemText>
          <AdittionalQuantity>
            <Icon size={15} color="#6C6C80" name="minus" />
            <AdittionalItemText>4</AdittionalItemText>
            <Icon size={15} color="#6C6C80" name="plus" />
          </AdittionalQuantity>
        </AdittionalItem>
        <AdittionalItem>
          <AdittionalItemText>Frango</AdittionalItemText>
          <AdittionalQuantity>
            <Icon size={15} color="#6C6C80" name="minus" />
            <AdittionalItemText>2</AdittionalItemText>
            <Icon size={15} color="#6C6C80" name="plus" />
          </AdittionalQuantity>
        </AdittionalItem>
      </AdditionalsContainer>
      <TotalContainer>
        <Title>Total do pedido</Title>
        <PriceButtonContainer>
          <TotalPrice>R$ 44,80</TotalPrice>
          <QuantityContainer>
            <Icon size={15} color="#6C6C80" name="minus" />
            <AdittionalItemText>2</AdittionalItemText>
            <Icon size={15} color="#6C6C80" name="plus" />
          </QuantityContainer>
        </PriceButtonContainer>

        <FinishOrderButton onPress={() => handleNavigate()}>
          <ButtonText>Entrar no Restaurant</ButtonText>
          <IconContainer>
            <Icon name="check-square" size={24} color="#fff" />
          </IconContainer>
        </FinishOrderButton>
      </TotalContainer>
    </Container>
  );
};

export default FoodDetails;
