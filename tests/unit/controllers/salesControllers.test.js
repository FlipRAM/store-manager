const sinon = require('sinon');
const { expect } = require('chai');

const saleServ = require('../../../services/salesServices');
const saleControl = require('../../../controllers/salesControllers');

describe('Gets all sales', () => {
  describe('with success', () => {
    const response = {};
    const request = {};

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
    ];

    before(async () => {
      request.body = {};

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns(response);
      
      sinon.stub(saleServ, 'getAll').resolves(data)
    })

    after(async () => {
      saleServ.getAll.restore();
    })

    it('returns status 200', async () => {
      await saleControl.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    })

    it('returns the correct array', async () => {
      await saleControl.getAll(request, response);

      expect(response.json.calledWith(data)).to.be.equal(true);
    })
  })
});

describe('Gets sale by Id', () => {
  describe('with success', () => {
    const response = {};
    const request = {};

    const data = [
      {
        productId: 1,
        quantity: 5,
      }
    ];

    before(async () => {
      request.params = { id: 1 };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns(response);
      
      sinon.stub(saleServ, 'getById').resolves(data);
    })

    after(async () => {
      saleServ.getById.restore();
    })

    it('returns status 200', async () => {
      await saleControl.getById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    })

    it('returns the correct object', async () => {
      await saleControl.getById(request, response);

      expect(response.json.calledWith(data)).to.be.equal(true);
    })
  })

  describe('with failure', () => {
    const response = {};
    const request = {};

    const data = { message: 'Sale not found' };

    before(async () => {
      request.params = { id: 9999 };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns(response);
      
      sinon.stub(saleServ, 'getById').resolves([]);
    })

    after(async () => {
      saleServ.getById.restore();
    })

    it('returns status 404', async () => {
      await saleControl.getById(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    })

    it('returns the correct object', async () => {
      await saleControl.getById(request, response);

      expect(response.json.calledWith(data)).to.be.equal(true);
    })
  })
});

describe('Add a sale', () => {
  describe('with success', () => {
    const response = {};
    const request = {};

    const data = {
      id: 3,
      itemsSold: [
        {productId:1,quantity:1},
        {productId:2,quantity:5},
      ]
    }

    before(async () => {
      request.body = [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 5 },
      ]

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns(response);
      
      sinon.stub(saleServ, 'addSale').resolves(data)
    })

    after(async () => {
      saleServ.addSale.restore();
    })

    it('returns status 201', async () => {
      await saleControl.add(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    })

    it('returns the correct object', async () => {
      await saleControl.add(request, response);

      expect(response.json.calledWith(data)).to.be.equal(true);
    })
  })

  describe('with failure', () => {
    const response = {};
    const request = {};

    const data = {
      message: 'Product not found'
    }

    before(async () => {
      request.body = [
        { productId: 9999, quantity: 1 },
        { productId: 2, quantity: 5 },
      ]

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns(response);
      
      sinon.stub(saleServ, 'addSale').resolves(null)
    })

    after(async () => {
      saleServ.addSale.restore();
    })

    it('returns status 404', async () => {
      await saleControl.add(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    })

    it('returns the correct object', async () => {
      await saleControl.add(request, response);

      expect(response.json.calledWith(data)).to.be.equal(true);
    })
  })
});

describe('Update a product', () => {
  describe('with success', () => {
    const response = {};
    const request = {};

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
      request.body = [
        {
          productId: 2,
          quantity: 5,
        }
      ];
      request.params = { id: 2 };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns(response);
      
      sinon.stub(saleServ, 'update').resolves(data);
    })

    after(async () => {
      saleServ.update.restore();
    })

    it('returns status 200', async () => {
      await saleControl.update(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    })

    it('returns the correct object', async () => {
      await saleControl.update(request, response);

      expect(response.json.calledWith(data)).to.be.equal(true);
    })
  })

  describe('with failure on productId', () => {
    const response = {};
    const request = {};

    const data = { message: 'Product not found' };

    before(async () => {
      request.body = [
        {
          productId: 9999,
          quantity: 5,
        }
      ];
      request.params = { id: 1 };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns(response);
      
      sinon.stub(saleServ, 'update').resolves(data);
    })

    after(async () => {
      saleServ.update.restore();
    })

    it('returns status 404', async () => {
      await saleControl.update(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    })

    it('returns the correct object', async () => {
      await saleControl.update(request, response);

      expect(response.json.calledWith(data)).to.be.equal(true);
    })
  })

  describe('with failure on saleId', () => {
    const response = {};
    const request = {};

    const data = { message: 'Sale not found' };

    before(async () => {
      request.body = [
        {
          productId: 1,
          quantity: 5,
        }
      ];
      request.params = { id: 9999 };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns(response);
      
      sinon.stub(saleServ, 'update').resolves(data);
    })

    after(async () => {
      saleServ.update.restore();
    })

    it('returns status 404', async () => {
      await saleControl.update(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    })

    it('returns the correct object', async () => {
      await saleControl.update(request, response);

      expect(response.json.calledWith(data)).to.be.equal(true);
    })
  })
});

describe('Deletes a product', () => {
  describe('with success', () => {
    const response = {};
    const request = {};

    before(async () => {
      request.params = { id: 1 };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns(response);
      
      sinon.stub(saleServ, 'deleteSale').resolves(true)
    })

    after(async () => {
      saleServ.deleteSale.restore();
    })

    it('returns status 204', async () => {
      await saleControl.deleteSale(request, response);

      expect(response.status.calledWith(204)).to.be.equal(true);
    })

    it('returns nothing', async () => {
      await saleControl.deleteSale(request, response);

      expect(response.json.calledWith()).to.be.equal(true);
    })
  })

  describe('with failure', () => {
    const response = {};
    const request = {};

    const data = { message: 'Sale not found' };

    before(async () => {
      request.params = { id: 9999 };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns(response);
      
      sinon.stub(saleServ, 'deleteSale').resolves(null)
    })

    after(async () => {
      saleServ.deleteSale.restore();
    })

    it('returns status 404', async () => {
      await saleControl.deleteSale(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    })

    it('returns the correct answer', async () => {
      await saleControl.deleteSale(request, response);

      expect(response.json.calledWith(data)).to.be.equal(true);
    })
  })
});