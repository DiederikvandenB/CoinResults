export default class Investment {
  /**
   * Define this model's schema.
   */
  static schema = {
    name: 'Investment',

    properties: {
      amount:   'float',
      date:     {type: 'date', default: new Date},
      currency: {type: 'string', default: 'EUR'},
      owners:   {type: 'linkingObjects', objectType: 'Portfolio', property: 'investments'},
    },
  };
}
