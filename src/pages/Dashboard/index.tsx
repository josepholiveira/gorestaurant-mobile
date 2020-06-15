import React, { useEffect, useState } from 'react';
import { Image, ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../assets/logo-header.png';
import SearchInput from '../../components/SearchInput';

import api from '../../services/api';
import formatValue from '../../utils/formatValue';

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

interface Food {
  id: number;
  name: string;
  description: string;
  price: number;
  thumbnail_url: string;
  formattedPrice: string;
}

interface Category {
  id: number;
  title: string;
  image_url: string;
}

const Dashboard: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<
    number | undefined
  >();
  const [searchValue, setSearchValue] = useState('');

  const navigation = useNavigation();

  async function handleNavigate(id: number): Promise<void> {
    navigation.navigate('FoodDetails', {
      id,
    });
  }

  useEffect(() => {
    async function loadDashboard(): Promise<void> {
      const foodsResponse = await api.get('/foods', {
        params: {
          category_like: selectedCategory,
          name_like: searchValue,
        },
      });

      const categoriesResponse = await api.get('/categories');

      setCategories(categoriesResponse.data);
      setFoods(
        foodsResponse.data.map((food: Food) => ({
          ...food,
          formattedPrice: formatValue(food.price),
        })),
      );
    }

    loadDashboard();
  }, [selectedCategory, searchValue]);

  function handleSelectCategory(id: number): void {
    if (selectedCategory === id) {
      setSelectedCategory(undefined);
    } else {
      setSelectedCategory(id);
    }
  }

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
        <SearchInput value={searchValue} onChangeText={setSearchValue} />
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
            {categories.map(category => (
              <CategoryItem
                key={category.id}
                isSelected={category.id === selectedCategory}
                onPress={() => handleSelectCategory(category.id)}
                activeOpacity={0.6}
              >
                <Image
                  style={{ width: 56, height: 56 }}
                  source={{ uri: category.image_url }}
                />
                <CategoryItemTitle>{category.title}</CategoryItemTitle>
              </CategoryItem>
            ))}
          </CategorySlider>
        </CategoryContainer>
        <FoodsContainer>
          <Title>Pratos</Title>
          <FoodList
            data={foods}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Food onPress={() => handleNavigate(item.id)} activeOpacity={0.6}>
                <FoodImageContainer>
                  <Image
                    style={{ width: 88, height: 88 }}
                    source={{ uri: item.thumbnail_url }}
                  />
                </FoodImageContainer>
                <FoodContent>
                  <FoodTitle>{item.name}</FoodTitle>
                  <FoodDescription>{item.description}</FoodDescription>
                  <FoodPricing>{item.formattedPrice}</FoodPricing>
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
