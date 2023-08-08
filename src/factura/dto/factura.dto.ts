import { FacturaArticuloDTO } from './factura-articulo.dto';

export interface FacturaDTO {
  idFactura?: number;
  idCliente?: number;
  idpedido?: number;
  precio?: number;
  idRemito?: number;
  generaRemito?: boolean;
  facturaArticulo?: FacturaArticuloDTO[];
}
