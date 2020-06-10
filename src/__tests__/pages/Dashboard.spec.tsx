/* eslint-disable import/first */

import React from 'react';

import {mocked} from 'ts-jest/utils';
import {render, fireEvent, act, wait} from '@testing-library/react-native';
import AxiosMock from 'axios-mock-adapter';
import api from '../../services/api';

jest.mock('@react-navigation/native', () => {
  // Require the original module to not be mocked...
  const originalModule = jest.requireActual('@react-navigation/native');

  return {
    __esModule: true, // Use it when dealing with esModules
    ...originalModule,
    useNavigation: jest.fn(),
  };
});

import Dashboard from '../../pages/Dashboard';

const apiMock = new AxiosMock(api);

describe('Dashboard', () => {
  it('should be able to list products', async () => {
    const items = [
      {
        id: 1,
        name: 'Ao molho branco',
        description:
          'Macarrão ao molho branco, fughi e cheiro verde das montanhas.',
        price: '19.90',
        available: true,
        category: 'arroz',
        image:
          'https://cdn.discordapp.com/attachments/678946221733445652/713371630369243146/Foto.png',
      },
    ];

    const items2 = [
      {
        id: 1,
        name: 'Ao molho branco',
        description:
          'Macarrão ao molho branco, fughi e cheiro verde das montanhas.',
        price: '19.90',
        available: true,
        category: 'feijao',
        image:
          'https://cdn.discordapp.com/attachments/678946221733445652/713371630369243146/Foto.png',
      },
    ];

    apiMock.onGet('/foods').reply((config) => {
      switch (config.params.filter) {
        case 'rice':
          return [200, items];

        case 'beans':
          return [200, items2];

        default:
          return items;
          break;
      }
    });

    apiMock.onGet('foods?filter=rice').reply(200, items);
    apiMock.onGet('foods?filter=beans').reply(200, items2);

    const {getByText, getByTestId} = render(<Dashboard />);

    await wait(() => expect(getByText('Ao molho branco')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByText('Ao molho branco')).toBeTruthy();

    expect(1 + 1).toBe(2);
  });
});
