const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const saleModel = require('../../../models/salesModels');

const {
  rightSaleBody,
  saleCreateResponse,
} = require('../../../__tests__/_dataMock');

describe('List all sales in database', () => {
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
    sinon.stub(connection, 'execute').resolves(data);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('with success', () => {
    it('returns a list of objects', async () => {
      const response = await saleModel.getAll();

      expect(response).to.be.an('array');

      response.forEach((element) => {
        expect(element).to.be.an('object');
      });
    });

    it('returns the correct data', async () => {
      const response = await saleModel.getAll();

      response.forEach((element) => {
        expect(element).to.have.property('saleId');
        expect(element).to.have.property('productId');
        expect(element).to.have.property('quantity');
      })
    });
  });
});

describe('Gets the right element by id', () => {
  const data = [
    {
      productId: 1,
      quantity: 5,
    }
  ]

  before(async () => {
    sinon.stub(connection, 'execute').resolves(data);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('with success', () => {
    it('returns an array', async () => {
      const response = await saleModel.getById(1);

      expect(response).to.be.an('array');
    });

    it('returns correct', async () => {
      const response = await saleModel.getById(1);

      expect(response[0]).to.have.property('productId');
      expect(response[0]).to.have.property('quantity');
    });
  });
});

describe('Gets the saleId', () => {
  before(async () => {
    sinon.stub(connection, 'execute').resolves({
      id: 3,
      itemsSold: [
        {productId:1,quantity:1},
        {productId:2,quantity:5},
      ]
    });
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('with success', () => {
    it('returns an object', async () => {
      const response = await saleModel.getSaleId(3, [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 5 },
      ]);

      expect(response).to.be.an('object');
    })

    it('returns the correct object', async () => {
      const response = await saleModel.getSaleId(3, [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 5 },
      ]);

      expect(response).to.deep.equal(saleCreateResponse);
    })
  });
});

describe('Adds a new sale in database', () => {
  const wrongData = [
    {
      productId: 999,
      quantity: 5,
    }
  ]

  before(async () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('with success', () => {
    it('returns an insertId of 3', async () => {
      const response = await saleModel.addSale(rightSaleBody);

      expect(response).to.be.an('object');
    })

    it('returns the correct object', async () => {
      const response = await saleModel.addSale(rightSaleBody);

      expect(response).to.deep.equal(saleCreateResponse);
    })
  });

  describe('with failure', () => {
    it('return null', async () => {
      const response = await saleModel.addSale(wrongData);

      expect(response).to.be.null;
    });
  });
});

describe('Updates a sale', () => {

  const rightData = [
    {
      productId: 2,
      quantity: 5,
    }
  ];

  const wrongData = [
    {
      productId: 999,
      quantity: 5,
    }
  ]

  const data = {
    saleId: 2,
    itemsUpdated: rightData,
  }

  before(async () => {
    sinon.stub(connection, 'execute').resolves(data);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('with success', () => {
    it('returns an object', async () => {
      const response = await saleModel.update(2, rightData);

      expect(response).to.be.an('object');
    });

    it('returns the correct object', async () => {
      const response = await saleModel.update(2, rightData);

      expect(response).to.deep.equal(data);
    });
  });

  describe('with failure', () => {
    it('returns object with message property when not given productId', async () => {
      const response = await saleModel.update(2, [
        {
          quantity: 5,
        }
      ]);

      expect(response).to.be.an('object');
      expect(response).to.have.property('message');
    });

    it('returns object with message property when wrong productId', async () => {
      const response = await saleModel.update(2, wrongData);

      expect(response).to.be.an('object');
      expect(response).to.have.property('message');
    });

    it('returns object with message property when wrong id', async () => {
      const response = await saleModel.update(9999, rightData);

      expect(response).to.be.an('object');
      expect(response).to.have.property('message');
    });
  });
});

describe('Deletes a sale', () => {
  before(async () => {
    sinon.stub(connection, 'execute').resolves(true);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('with success', () => {
    it('returns true', async () => {
      const response = await saleModel.deleteSale(1);
      
      expect(response).to.be.true;
    });
  });

  describe('with failure', () => {
    it('returns null', async () => {
      const response = await saleModel.deleteSale(9999);
      
      expect(response).to.be.null;
    });
  });
});