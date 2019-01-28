import { transformData } from '../api'

const rawProducts = [
  {
    id: 69,
    key: 'Classic St Mawes 36',
    elements: [
      {
        type: 'input',
        value: 'DW871395871',
        name: 'sku',
        language: null,
      },
      {
        type: 'input',
        value: 'Classic St Mawes 36',
        name: 'name',
        language: null,
      },
      {
        type: 'textarea',
        value:
          'The Classic St. Mawes, an integral part of the flagship Classic Collection, is a slim timepiece that sits perfectly on your wrist. With a flawlessly round and simple dial, a classy leather band and an elegant casing, you have a timepiece that proves that perfection in engineering not only is a possibility, but a reality.',
        name: 'description',
        language: null,
      },
      {
        type: 'quantityValue',
        value: {
          value: '199',
          unit: '1',
          unitAbbreviation: 'USD',
        },
        name: 'price',
        language: null,
      },
      {
        type: 'numeric',
        value: 1,
        name: 'qty_pack',
        language: null,
      },
      {
        type: 'input',
        value: 'Rose Gold',
        name: 'color',
        language: null,
      },
      {
        type: 'numeric',
        value: 36,
        name: 'size',
        language: null,
      },
      {
        type: 'numeric',
        value: null,
        name: 'depth',
        language: null,
      },
      {
        type: 'href',
        value: {
          type: 'asset',
          subtype: 'image',
          id: 64,
        },
        name: 'main_image',
        language: null,
      },
    ],
  },
  {
    id: 72,
    key: 'Classic Black Sheffield 36',
    elements: [
      {
        type: 'input',
        value: 'DW871321897',
        name: 'sku',
        language: null,
      },
      {
        type: 'input',
        value: 'Classic Black Sheffield 36',
        name: 'name',
        language: null,
      },
      {
        type: 'textarea',
        value:
          'With a black strap made from genuine Italian leather and a distinctive dial, the Classic Black Sheffield is a sophisticated timepiece that adds confidence and attitude to your style.',
        name: 'description',
        language: null,
      },
      {
        type: 'quantityValue',
        value: {
          value: '199',
          unit: '1',
          unitAbbreviation: 'USD',
        },
        name: 'price',
        language: null,
      },
      {
        type: 'numeric',
        value: 1,
        name: 'qty_pack',
        language: null,
      },
      {
        type: 'input',
        value: 'Rose Gold',
        name: 'color',
        language: null,
      },
      {
        type: 'numeric',
        value: 36,
        name: 'size',
        language: null,
      },
      {
        type: 'numeric',
        value: null,
        name: 'depth',
        language: null,
      },
      {
        type: 'href',
        value: {
          type: 'asset',
          subtype: 'image',
          id: 63,
        },
        name: 'main_image',
        language: null,
      },
    ],
  },
  {
    id: 99,
    key: 'Classic Petite Melrose 32',
    elements: [
      {
        type: 'input',
        value: 'DW071395899',
        name: 'sku',
        language: null,
      },
      {
        type: 'input',
        value: 'Classic Petite Melrose 32',
        name: 'name',
        language: null,
      },
      {
        type: 'textarea',
        value:
          'Classic Petite Melrose features an eggshell white dial and an undeniably elegant rose gold mesh strap. This watch elevates your everyday outfit, your mood and your spirit.',
        name: 'description',
        language: null,
      },
      {
        type: 'quantityValue',
        value: {
          value: '189',
          unit: '1',
          unitAbbreviation: 'USD',
        },
        name: 'price',
        language: null,
      },
      {
        type: 'numeric',
        value: 1,
        name: 'qty_pack',
        language: null,
      },
      {
        type: 'input',
        value: 'Rose Gold',
        name: 'color',
        language: null,
      },
      {
        type: 'numeric',
        value: 32,
        name: 'size',
        language: null,
      },
      {
        type: 'numeric',
        value: null,
        name: 'depth',
        language: null,
      },
      {
        type: 'href',
        value: {
          type: 'asset',
          subtype: 'image',
          id: 29,
        },
        name: 'main_image',
        language: null,
      },
    ],
  },
]

const products = rawProducts.map(rp => transformData(rp))

export default {
  rawProducts,
  products,
}
