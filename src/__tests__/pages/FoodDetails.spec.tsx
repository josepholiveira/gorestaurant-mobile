import React from 'react';

import '@testing-library/jest-native';
import { render, wait, act, fireEvent } from '@testing-library/react-native';
import AxiosMock from 'axios-mock-adapter';
import api from '../../services/api';

import FoodDetails from '../../pages/FoodDetails';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
      setOptions: jest.fn(),
    }),
    useRoute: jest.fn().mockReturnValue({
      params: {
        id: 1,
      },
    }),
  };
});

const apiMock = new AxiosMock(api);

describe('Orders', () => {
  it('should be able to list the food', async () => {
    const item = {
      id: 1,
      name: 'Ao molho',
      description:
        'Macarrão ao molho branco, fughi e cheiro verde das montanhas.',
      price: 19.9,
      category: 1,
      image_url:
        'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-food/food1.png',
      thumbnail_url:
        'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-gorestaurant-mobile/ao_molho.png',
      extras: [
        {
          id: 1,
          name: 'Bacon',
          value: 1.5,
        },
        {
          id: 2,
          name: 'Frango',
          value: 2,
        },
      ],
    };

    apiMock.onGet('/foods/1').reply(200, item);

    const { getByText, getByTestId } = render(<FoodDetails />);

    await wait(() => expect(getByText('Ao molho')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByText('Ao molho')).toBeTruthy();
    expect(
      getByText(
        'Macarrão ao molho branco, fughi e cheiro verde das montanhas.',
      ),
    ).toBeTruthy();

    expect(getByText('Bacon')).toBeTruthy();
    expect(getByText('Frango')).toBeTruthy();

    expect(getByTestId('food-quantity')).toHaveTextContent('1');

    expect(getByTestId('cart-total')).toHaveTextContent('R$ 19,90');
  });

  it('should be able to increment food quantity', async () => {
    const item = {
      id: 1,
      name: 'Ao molho',
      description:
        'Macarrão ao molho branco, fughi e cheiro verde das montanhas.',
      price: 19.9,
      category: 1,
      image_url:
        'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-food/food1.png',
      thumbnail_url:
        'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-gorestaurant-mobile/ao_molho.png',
      extras: [
        {
          id: 1,
          name: 'Bacon',
          value: 1.5,
        },
        {
          id: 2,
          name: 'Frango',
          value: 2,
        },
      ],
    };

    apiMock.onGet('/foods/1').reply(200, item);

    const { getByText, getByTestId } = render(<FoodDetails />);

    await wait(() => expect(getByText('Ao molho')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByText('Ao molho')).toBeTruthy();
    expect(
      getByText(
        'Macarrão ao molho branco, fughi e cheiro verde das montanhas.',
      ),
    ).toBeTruthy();

    expect(getByText('Bacon')).toBeTruthy();
    expect(getByText('Frango')).toBeTruthy();

    expect(getByTestId('food-quantity')).toHaveTextContent('1');

    await act(async () => {
      fireEvent.press(getByTestId('increment-food'));
    });

    expect(getByTestId('food-quantity')).toHaveTextContent('2');

    await act(async () => {
      fireEvent.press(getByTestId('increment-food'));
    });

    expect(getByTestId('food-quantity')).toHaveTextContent('3');

    expect(getByTestId('cart-total')).toHaveTextContent('R$ 59,70');
  });

  it('should be able to decrement food quantity', async () => {
    const item = {
      id: 1,
      name: 'Ao molho',
      description:
        'Macarrão ao molho branco, fughi e cheiro verde das montanhas.',
      price: 19.9,
      category: 1,
      image_url:
        'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-food/food1.png',
      thumbnail_url:
        'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-gorestaurant-mobile/ao_molho.png',
      extras: [
        {
          id: 1,
          name: 'Bacon',
          value: 1.5,
        },
        {
          id: 2,
          name: 'Frango',
          value: 2,
        },
      ],
    };

    apiMock.onGet('/foods/1').reply(200, item);

    const { getByText, getByTestId } = render(<FoodDetails />);

    await wait(() => expect(getByText('Ao molho')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByText('Ao molho')).toBeTruthy();
    expect(
      getByText(
        'Macarrão ao molho branco, fughi e cheiro verde das montanhas.',
      ),
    ).toBeTruthy();

    expect(getByText('Bacon')).toBeTruthy();
    expect(getByText('Frango')).toBeTruthy();

    expect(getByTestId('food-quantity')).toHaveTextContent('1');

    await act(async () => {
      fireEvent.press(getByTestId('increment-food'));
    });

    expect(getByTestId('food-quantity')).toHaveTextContent('2');

    await act(async () => {
      fireEvent.press(getByTestId('increment-food'));
    });

    expect(getByTestId('food-quantity')).toHaveTextContent('3');

    await act(async () => {
      fireEvent.press(getByTestId('decrement-food'));
    });

    expect(getByTestId('food-quantity')).toHaveTextContent('2');

    await act(async () => {
      fireEvent.press(getByTestId('decrement-food'));
    });

    expect(getByTestId('food-quantity')).toHaveTextContent('1');

    expect(getByTestId('cart-total')).toHaveTextContent('R$ 19,90');
  });

  it('should not be able to decrement food quantity below than 1', async () => {
    const item = {
      id: 1,
      name: 'Ao molho',
      description:
        'Macarrão ao molho branco, fughi e cheiro verde das montanhas.',
      price: 19.9,
      category: 1,
      image_url:
        'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-food/food1.png',
      thumbnail_url:
        'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-gorestaurant-mobile/ao_molho.png',
      extras: [
        {
          id: 1,
          name: 'Bacon',
          value: 1.5,
        },
        {
          id: 2,
          name: 'Frango',
          value: 2,
        },
      ],
    };

    apiMock.onGet('/foods/1').reply(200, item);

    const { getByText, getByTestId } = render(<FoodDetails />);

    await wait(() => expect(getByText('Ao molho')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByText('Ao molho')).toBeTruthy();
    expect(
      getByText(
        'Macarrão ao molho branco, fughi e cheiro verde das montanhas.',
      ),
    ).toBeTruthy();

    expect(getByText('Bacon')).toBeTruthy();
    expect(getByText('Frango')).toBeTruthy();

    expect(getByTestId('food-quantity')).toHaveTextContent('1');

    await act(async () => {
      fireEvent.press(getByTestId('increment-food'));
    });

    expect(getByTestId('food-quantity')).toHaveTextContent('2');

    await act(async () => {
      fireEvent.press(getByTestId('decrement-food'));
    });

    expect(getByTestId('food-quantity')).toHaveTextContent('1');

    await act(async () => {
      fireEvent.press(getByTestId('decrement-food'));
    });

    expect(getByTestId('food-quantity')).toHaveTextContent('1');
  });

  it('should be able to increment food quantity', async () => {
    const item = {
      id: 1,
      name: 'Ao molho',
      description:
        'Macarrão ao molho branco, fughi e cheiro verde das montanhas.',
      price: 19.9,
      category: 1,
      image_url:
        'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-food/food1.png',
      thumbnail_url:
        'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-gorestaurant-mobile/ao_molho.png',
      extras: [
        {
          id: 1,
          name: 'Bacon',
          value: 1.5,
        },
        {
          id: 2,
          name: 'Frango',
          value: 2,
        },
      ],
    };

    apiMock.onGet('/foods/1').reply(200, item);

    const { getByText, getByTestId } = render(<FoodDetails />);

    await wait(() => expect(getByText('Ao molho')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByText('Ao molho')).toBeTruthy();
    expect(
      getByText(
        'Macarrão ao molho branco, fughi e cheiro verde das montanhas.',
      ),
    ).toBeTruthy();

    expect(getByText('Bacon')).toBeTruthy();
    expect(getByText('Frango')).toBeTruthy();

    expect(getByTestId('extra-quantity-1')).toHaveTextContent('0');

    await act(async () => {
      fireEvent.press(getByTestId('increment-extra-1'));
    });

    expect(getByTestId('extra-quantity-1')).toHaveTextContent('1');

    await act(async () => {
      fireEvent.press(getByTestId('increment-extra-1'));
    });

    expect(getByTestId('extra-quantity-1')).toHaveTextContent('2');

    expect(getByTestId('cart-total')).toHaveTextContent('R$ 22,90');
  });

  it('should be able to decrement an extra item quantity', async () => {
    const item = {
      id: 1,
      name: 'Ao molho',
      description:
        'Macarrão ao molho branco, fughi e cheiro verde das montanhas.',
      price: 19.9,
      category: 1,
      image_url:
        'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-food/food1.png',
      thumbnail_url:
        'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-gorestaurant-mobile/ao_molho.png',
      extras: [
        {
          id: 1,
          name: 'Bacon',
          value: 1.5,
        },
      ],
    };

    apiMock.onGet('/foods/1').reply(200, item);

    const { getByText, getByTestId } = render(<FoodDetails />);

    await wait(() => expect(getByText('Ao molho')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByText('Ao molho')).toBeTruthy();
    expect(
      getByText(
        'Macarrão ao molho branco, fughi e cheiro verde das montanhas.',
      ),
    ).toBeTruthy();

    expect(getByText('Bacon')).toBeTruthy();

    expect(getByTestId('extra-quantity-1')).toHaveTextContent('0');

    await act(async () => {
      fireEvent.press(getByTestId('increment-extra-1'));
    });

    expect(getByTestId('extra-quantity-1')).toHaveTextContent('1');

    await act(async () => {
      fireEvent.press(getByTestId('increment-extra-1'));
    });

    expect(getByTestId('extra-quantity-1')).toHaveTextContent('2');

    await act(async () => {
      fireEvent.press(getByTestId('decrement-extra-1'));
    });

    expect(getByTestId('extra-quantity-1')).toHaveTextContent('1');

    expect(getByTestId('cart-total')).toHaveTextContent('R$ 21,40');
  });
});
