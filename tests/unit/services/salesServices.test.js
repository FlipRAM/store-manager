const sinon = require('sinon');
const { expect } = require('chai');

const saleModel = require('../../../models/salesModels');
const saleServ = require('../../../services/salesServices');

describe('Gets all sales', () => {
  const data = [
    {
      saleId: 1,
      productId: 1,
      quantity: 5,
    },
    {
      saleId: 1,
      productId: 2,
      quantity: 10,
    },
    {
      saleId: 2,
      productId: 3,
      quantity: 15,
    }
  ]

  before(async () => {
    sinon.stub(saleModel, 'getAll').resolves(data);
  });

  after(async () => {
    saleModel.getAll.restore();
  });

  describe('with success', () => {
    it('returns a list', async () => {
      const response = await saleServ.getAll();

      expect(response).to.be.an('array');
    })

    it('returns the correct answer', async () => {
      const response = await saleServ.getAll();

      expect(response).to.deep.equal(data)
    })
  })
});

describe('Gets the correct element with the id', () => {
  const data = [
    {
      productId: 1,
      quantity: 5,
    }
  ];

  before(async () => {
    sinon.stub(saleModel, 'getById').resolves(data);
  });

  after(async () => {
    saleModel.getById.restore();
  });
  
  describe('with success', () => {
    it('returns an array', async () => {
      const response = await saleServ.getById(1);

      expect(response).to.be.an('array');
    })

    it('returns the correct answer', async () => {
      const response = await saleServ.getById(1);

      expect(response).to.deep.equal(data);
    })
  })
});

describe('Add the element to sales database', () => {
  const data = {
    id: 3,
    itemsSold: [
      {productId:1,quantity:1},
      {productId:2,quantity:5},
    ]
  }
  
  before(async () => {
    sinon.stub(saleModel, 'addSale').resolves(data);
  });

  after(async () => {
    saleModel.addSale.restore();
  });
  
  describe('with success', () => {
    it('returns an object', async () => {
      const response = await saleServ.addSale([
        {productId:1,quantity:1},
        {productId:2,quantity:5},
      ]);

      expect(response).to.be.an('object');
    })

    it('returns the correct answer', async () => {
      const response = await saleServ.addSale([
        {productId:1,quantity:1},
        {productId:2,quantity:5},
      ]);

      expect(response).to.deep.equal(data);
    })
  })
});

describe('Updates an element in sales database', () => {
  const data = {
    saleId: 2,
    itemsUpdated: [
      {
        productId: 2,
        quantity: 5,
      }
    ],
  }

  before(async () => {
    sinon.stub(saleModel, 'update').resolves(data);
  });

  after(async () => {
    saleModel.update.restore();
  });
  
  describe('with success', () => {
    it('returns an object', async () => {
      const response = await saleServ.update(2, [
        {
          productId: 2,
          quantity: 5,
        }
      ]);

      expect(response).to.be.an('object');
    })

    it('returns the correct answer', async () => {
      const response = await saleServ.update(2, [
        {
          productId: 2,
          quantity: 5,
        }
      ]);

      expect(response).to.deep.equal(data);
    })
  })
});

describe('Deletes the sale from database', () => {
  const data = true;

  before(async () => {
    sinon.stub(saleModel, 'deleteSale').resolves(true);
  });

  after(async () => {
    saleModel.deleteSale.restore();
  });
  
  describe('with success', () => {
    it('returns true', async () => {
      const response = await saleServ.deleteSale(1);

      expect(response).to.be.true;
    })
  })
});