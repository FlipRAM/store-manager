const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const prodModel = require('../../../models/productsModels');

const {
  rightProductBody,
  allProductsResponse,
  productCreateResponse,
} = require('../../../__tests__/_dataMock');

describe('List all products in database', () => {
  before(async () => {
    const data = allProductsResponse;

    sinon.stub(connection, 'execute').resolves(data);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('with success', () => {
    it('returns a list of objects', async () => {
      const response = await prodModel.getAll();

      expect(response).to.be.an('array');

      response.forEach((element) => {
        expect(element).to.be.an('object');
      });
    });

    it('returns the correct data', async () => {
      const response = await prodModel.getAll();

      expect(response).to.be.deep.equal(allProductsResponse);
    });
  });
});

describe('Gets the right element by id', () => {
  const data = { id: 2, name: 'Traje de encolhimento' };

  before(async () => {
    sinon.stub(connection, 'execute').resolves(data);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('with success', () => {
    it('returns an object', async () => {
      const response = await prodModel.getById(2);

      expect(response).to.be.an('object');
    });

    it('returns correct', async () => {
      const response = await prodModel.getById(2);

      expect(response).to.be.deep.equal(data);
    });
  });

  describe('with failure', () => {
    it('returns null', async () => {
      const response = await prodModel.getById(9999);

      expect(response).to.be.null;
    });
  });
});

describe('Adds a new product in database', () => {
  before(async () => {
    const data = productCreateResponse;

    sinon.stub(connection, 'execute').resolves(data);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('with success', () => {
    it('returns an object', async () => {
      const response = await prodModel.add(rightProductBody);

      expect(response).to.be.an('object');
    })

    it('the object has id and name properties', async () => {
      const response = await prodModel.add(rightProductBody);

      expect(response).to.have.a.property('id');
      expect(response).to.have.a.property('name');
    })
  });
});

describe('Updates an element', () => {

  const data = { id: 2, name: 'Cinto de utilidades' };

  before(async () => {
    sinon.stub(connection, 'execute').resolves(data);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('with success', () => {
    it('returns an object', async () => {
      const response = await prodModel.update(data.id, data.name);

      expect(response).to.be.an('object');
    });

    it('with the right properties', async () => {
      const response = await prodModel.update(data.id, data.name);

      expect(response).to.deep.equal(data);
    });
  });

  describe('with failure', () => {
    it('returns null', async () => {
      const response = await prodModel.update(9999, 'ERR');

      expect(response).to.be.null;
    });
  });
});

describe('Deletes an element', () => {
  before(async () => {
    sinon.stub(connection, 'execute').resolves(true);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('with success', () => {
    it('returns true', async () => {
      const response = await prodModel.deleteProd(3);
      
      expect(response).to.be.true;
    });
  });

  describe('with failure', () => {
    it('returns null', async () => {
      const response = await prodModel.deleteProd(9999);
      
      expect(response).to.be.null;
    });
  });
});

describe('Gets the right element', () => {
  const data = [{ id: 1, name: 'Martelo de Thor' }];

  before(async () => {
    sinon.stub(connection, 'execute').resolves(data);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('with success', () => {
    it('returns the right element', async () => {
      const response = await prodModel.getByName(data[0].name);

      expect(response).to.deep.equal(data);
    });
  });

  describe('with failure', () => {
    it('returns an empty array', async () => {
      const response = await prodModel.getByName('IMPOSSIBLE NAME');

      expect(response).to.be.an('array');
      expect(response).to.have.length(0);
    });
  });
});