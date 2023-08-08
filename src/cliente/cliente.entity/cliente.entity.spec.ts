import { Cliente } from './cliente.entity';

describe('ClienteEntity', () => {
  it('should be defined', () => {
    expect(new Cliente()).toBeDefined();
  });
});
