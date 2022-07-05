const sinon = require('sinon');
const { expect } = require('chai');

const prodServ = require('../../../services/productsServices');
const prodControl = require('../../../controllers/productsControllers');

describe('Gets all products', () => {
  describe('with success', () => {
    const response = {};
    const request = {};

    const data = [
      { id: 1, name: 'Martelo de Thor' },
      { id: 2, name: 'Traje de encolhimento' },
      { id: 3, name: 'Escudo do Capitão América' },
    ];

    before(async () => {
      request.body = {};

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns(response);
      
      sinon.stub(prodServ, 'getAll').resolves(data)
    })

    after(async () => {
      prodServ.getAll.restore();
    })

    it('returns status 200', async () => {
      await prodControl.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    })

    it('returns the correct array', async () => {
      await prodControl.getAll(request, response);

      expect(response.json.calledWith(data)).to.be.equal(true);
    })
  })
});

describe('Gets product by Id', () => {
  describe('with success', () => {
    const response = {};
    const request = {};

    const data = { id: 1, name: 'Martelo de Thor' };

    before(async () => {
      request.params = { id: 1 };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns(response);
      
      sinon.stub(prodServ, 'getById').resolves(data);
    })

    after(async () => {
      prodServ.getById.restore();
    })

    it('returns status 200', async () => {
      await prodControl.getById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    })

    it('returns the correct object', async () => {
      await prodControl.getById(request, response);

      expect(response.json.calledWith(data)).to.be.equal(true);
    })
  })

  describe('with failure', () => {
    const response = {};
    const request = {};

    const data = { message: 'Product not found' };

    before(async () => {
      request.params = { id: 9999 };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns(response);
      
      sinon.stub(prodServ, 'getById').resolves(null);
    })

    after(async () => {
      prodServ.getById.restore();
    })

    it('returns status 404', async () => {
      await prodControl.getById(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    })

    it('returns the correct object', async () => {
      await prodControl.getById(request, response);

      expect(response.json.calledWith(data)).to.be.equal(true);
    })
  })
});

describe('Add a product', () => {
  describe('with success', () => {
    const response = {};
    const request = {};

    const data = { id: 4, name: 'Cinto de utilidades' };

    before(async () => {
      request.body = { name: 'Cinto de utilidades' };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns(response);
      
      sinon.stub(prodServ, 'add').resolves(data)
    })

    after(async () => {
      prodServ.add.restore();
    })

    it('returns status 201', async () => {
      await prodControl.add(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    })

    it('returns the correct object', async () => {
      await prodControl.add(request, response);

      expect(response.json.calledWith(data)).to.be.equal(true);
    })
  })
});

describe('Update a product', () => {
  describe('with success', () => {
    const response = {};
    const request = {};

    const data = {
      id: 2,
      name: 'Cinto de utilidades',
    }

    before(async () => {
      request.body = { name: 'Cinto de utilidades' };
      request.params = { id: 2 };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns(response);
      
      sinon.stub(prodServ, 'update').resolves(data);
    })

    after(async () => {
      prodServ.update.restore();
    })

    it('returns status 200', async () => {
      await prodControl.update(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    })

    it('returns the correct object', async () => {
      await prodControl.update(request, response);

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
      request.body = { name: 'Cinto de utilidades' };
      request.params = { id: 999 };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns(response);
      
      sinon.stub(prodServ, 'update').resolves(null);
    })

    after(async () => {
      prodServ.update.restore();
    })

    it('returns status 404', async () => {
      await prodControl.update(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    })

    it('returns the correct object', async () => {
      await prodControl.update(request, response);

      expect(response.json.calledWith(data)).to.be.equal(true);
    })
  })
});

describe('Deletes a product', () => {
  describe('with success', () => {
    const response = {};
    const request = {};

    before(async () => {
      request.params = { id: 3 };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns(response);
      
      sinon.stub(prodServ, 'deleteProd').resolves(true)
    })

    after(async () => {
      prodServ.deleteProd.restore();
    })

    it('returns status 204', async () => {
      await prodControl.deleteProd(request, response);

      expect(response.status.calledWith(204)).to.be.equal(true);
    })

    it('returns nothing', async () => {
      await prodControl.deleteProd(request, response);

      expect(response.json.calledWith()).to.be.equal(true);
    })
  })

  describe('with failure', () => {
    const response = {};
    const request = {};

    const data = { message: 'Product not found' };

    before(async () => {
      request.params = { id: 9999 };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns(response);
      
      sinon.stub(prodServ, 'deleteProd').resolves(null)
    })

    after(async () => {
      prodServ.deleteProd.restore();
    })

    it('returns status 404', async () => {
      await prodControl.deleteProd(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    })

    it('returns the correct answer', async () => {
      await prodControl.deleteProd(request, response);

      expect(response.json.calledWith(data)).to.be.equal(true);
    })
  })
});

describe('Gets by name', () => {
  describe('with success', () => {
    const response = {};
    const request = {};
    
    const data = [{ id: 1, name: 'Martelo de Thor' }];

    before(async () => {
      request.query = { q: 'Martelo de Thor' };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns(response);
      
      sinon.stub(prodServ, 'getByName').resolves(data)
    })

    after(async () => {
      prodServ.getByName.restore();
    })

    it('returns status 200', async () => {
      await prodControl.getByName(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    })

    it('returns the correct answer', async () => {
      await prodControl.getByName(request, response);

      expect(response.json.calledWith(data)).to.be.equal(true);
    })
  })

  describe('with failure', () => {
    const response = {};
    const request = {};
    
    const data = [];

    before(async () => {
      request.query = { q: 'IMPOSSIBLE NAME' };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns(response);
      
      sinon.stub(prodServ, 'getByName').resolves(null)
    })

    after(async () => {
      prodServ.getByName.restore();
    })

    it('returns status 404', async () => {
      await prodControl.getByName(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    })

    it('returns the correct answer', async () => {
      await prodControl.getByName(request, response);

      expect(response.json.calledWith(data)).to.be.equal(true);
    })
  })
});