import React from 'react';
import { Image, ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../assets/logo-header.png';
import aoMolho from '../../assets/ao-molho.png';
import massas from '../../assets/massas.png';
import SearchInput from '../../components/SearchInput';

import {
  Container,
  Header,
  FilterContainer,
  Title,
  CategoryContainer,
  CategorySlider,
  CategoryItem,
  CategoryItemTitle,
  FoodsContainer,
  FoodList,
  Food,
  FoodImageContainer,
  FoodContent,
  FoodTitle,
  FoodDescription,
  FoodPricing,
} from './styles';

const Dashboard: React.FC = () => {
  const navigation = useNavigation();

  async function handleNavigate(): Promise<void> {
    navigation.navigate('FoodDetails', {
      id: 1,
    });
  }

  const products = [
    {
      id: 1,
      name: 'Ao molho branco',
    },
    {
      id: 2,
      name: 'Veggie',
    },
    {
      id: 3,
      name: 'Ao molho branco',
    },
    {
      id: 4,
      name: 'Veggie',
    },
    {
      id: 5,
      name: 'Ao molho branco',
    },
    {
      id: 6,
      name: 'Veggie',
    },
    {
      id: 7,
      name: 'Ao molho branco',
    },
    {
      id: 8,
      name: 'Veggie',
    },
  ];

  return (
    <Container>
      <Header>
        <Image source={Logo} />
        <Icon
          name="log-out"
          size={24}
          color="#FFB84D"
          onPress={() => navigation.navigate('Home')}
        />
      </Header>
      <FilterContainer>
        <SearchInput />
      </FilterContainer>
      <ScrollView>
        <CategoryContainer>
          <Title>Categorias</Title>
          <CategorySlider
            contentContainerStyle={{
              paddingHorizontal: 20,
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <CategoryItem
              // onPress={() => handleSelectItem(item.id)}
              activeOpacity={0.6}
            >
              <Image source={massas} />
              <CategoryItemTitle>Massas</CategoryItemTitle>
            </CategoryItem>

            <CategoryItem
              isSelected
              // onPress={() => handleSelectItem(item.id)}
              activeOpacity={0.6}
            >
              <Image source={massas} />
              <CategoryItemTitle>Pizzas</CategoryItemTitle>
            </CategoryItem>
            <CategoryItem
              // onPress={() => handleSelectItem(item.id)}
              activeOpacity={0.6}
            >
              <Image source={massas} />
              <CategoryItemTitle>Massas</CategoryItemTitle>
            </CategoryItem>
            <CategoryItem
              // onPress={() => handleSelectItem(item.id)}
              activeOpacity={0.6}
            >
              <Image source={massas} />
              <CategoryItemTitle>Massas</CategoryItemTitle>
            </CategoryItem>
          </CategorySlider>
        </CategoryContainer>
        <FoodsContainer>
          <Title>Pratos</Title>
          <FoodList
            data={products}
            keyExtractor={(item: any) => item.id}
            renderItem={({ item }) => (
              <Food onPress={() => handleNavigate()} activeOpacity={0.6}>
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
      </ScrollView>
    </Container>
  );
};

export default Dashboard;
