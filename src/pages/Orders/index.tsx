import React from 'react';
import { Image } from 'react-native';

import aoMolho from '../../assets/ao-molho.png';

import {
  Container,
  Header,
  HeaderTitle,
  FoodsContainer,
  FoodList,
  Food,
  FoodImageContainer,
  FoodContent,
  FoodTitle,
  FoodDescription,
  FoodPricing,
} from './styles';

const Orders: React.FC = () => {
  const products = [
    {
      id: 1,
      name: 'Ao molho branco',
    },
    {
      id: 2,
      name: 'Veggie',
    },
  ];

  return (
    <Container>
      <Header>
        <HeaderTitle>Meus pedidos</HeaderTitle>
      </Header>

      <FoodsContainer>
        <FoodList
          data={products}
          keyExtractor={(item: any) => item.id}
          renderItem={({ item }) => (
            <Food>
              <FoodImageContainer>
                <Image style={{ width: 88, height: 88 }} source={aoMolho} />
              </FoodImageContainer>
              <FoodContent>
                <FoodTitle>{item.name}</FoodTitle>
                <FoodDescription>Descrição da comida</FoodDescription>
                <FoodPricing>R$ 19,90</FoodPricing>
              </FoodContent>
            </Food>
          )}
        />
      </FoodsContainer>
    </Container>
  );
};

export default Orders;
