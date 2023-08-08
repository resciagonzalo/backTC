import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Factura } from './Factura.entity/Factura.entity';
import { FacturaDTO } from './dto/factura.dto';
import { FacturaArticuloDTO } from './dto/factura-articulo.dto';
import { RemitoService } from 'src/remito/remito.service';
import { RemitoDTO } from 'src/remito/dto/remito.dto';
import { EstadoRemito } from 'src/remito/enums/estado-remito.enum';
import { ArticulosService } from 'src/articulos/articulos.service';
import { FacturaProducto } from './factura-producto.entity/factura-producto.entity';
import { Readable } from 'stream';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class FacturaService {
  constructor(
    @InjectRepository(Factura)
    private facturaRepository: Repository<Factura>,
    @InjectRepository(FacturaProducto)
    private facturaArticuloRepository: Repository<FacturaProducto>,
    private remitoService: RemitoService,
    private articulosService: ArticulosService,
  ) {}

  async getAll(): Promise<FacturaDTO[]> {
    return await this.facturaRepository.find();
  }

  async get(_id: number): Promise<Factura[]> {
    return await this.facturaRepository.find({
      where: [{ idbfactura: _id }],
    });
  }

  async create(facturaData: FacturaDTO) {
    let articulosFactura: FacturaArticuloDTO[] = [];

    if (facturaData.idpedido) {
      //TODO: traer productos de nota de pedido y guardar en facturaProducto
    } else {
      articulosFactura = facturaData.facturaArticulo;
    }

    const articulosIds = articulosFactura.map((art) => art.idArticulo);
    const articulos = await this.articulosService.getAllByIds(articulosIds);
    let totalPrecioArt = 0;

    articulosFactura.forEach((artFactura) => {
      const articulo = articulos.find(
        (art) => art.idArt === artFactura.idArticulo,
      );
      if (articulo) {
        totalPrecioArt += Number(articulo.precioArt) * artFactura.cantidad;
      }
    });
    const factura = await this.facturaRepository.save({
      ...facturaData,
      precio: totalPrecioArt,
    });

    articulosFactura.forEach(async (facturaArticulo) => {
      facturaArticulo.idbfactura = factura.idbfactura;
      await this.facturaArticuloRepository.save(facturaArticulo);
    });

    if (facturaData.generaRemito) {
      const remito: RemitoDTO = {
        estado: EstadoRemito.PENDIENTE,
        idcfactura: factura.idbfactura,
        idpedido: facturaData.idpedido,
        importeFinal: totalPrecioArt,
      };
      await this.remitoService.create(remito);
    }
  }

  async update(Factura: Factura) {
    this.facturaRepository.save(Factura);
  }

  async delete(Factura: Factura) {
    this.facturaRepository.delete(Factura);
  }

  async getFacturaDocument(facturaId: number): Promise<StreamableFile> {
    // Load the Factura (with relations) from the database
    const factura = await this.facturaRepository.findOne({
      where: { idbfactura: facturaId },
      relations: ['cliente', 'facturaProductos', 'facturaProductos.articulo'],
    });

    // Check if factura exists
    if (!factura) {
      throw new NotFoundException(`Factura with ID ${facturaId} not found`);
    }

    // Create a new PDF document
    const doc = new PDFDocument();

    doc
      .fontSize(16)
      .font('Helvetica-Bold')
      .text(`Factura ID: ${factura.idbfactura}`, 50, 50)
      .text(`Cliente: ${factura.cliente.nombreCliente}`, 50, 70)
      .fontSize(14)
      .font('Helvetica')
      .text(`Fecha: ${factura.createdAt.toISOString().slice(0, 10)}`, 50, 90)
      .moveDown();

    // Line separator
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke().moveDown();

    // Table headers
    let currentY = doc.y;
    doc
      .fontSize(12)
      .font('Helvetica-Bold')
      .text('Producto', 50, currentY, { continued: true })
      .text('Cantidad', 230, currentY, { continued: true })
      .text('Precio unit.', 350, currentY)
      .moveDown();

    // Line separator
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke().moveDown();

    factura.facturaProductos.forEach((fp) => {
      const articulo = fp.articulo;
      currentY = doc.y;
      doc
        .fontSize(12)
        .font('Helvetica')
        .text(articulo.nombreArt, 50, currentY, { continued: true })
        .text(fp.cantidad.toString(), 250, currentY, { continued: true })
        .text((+articulo.precioArt).toFixed(2), 400, currentY)
        .moveDown();
    });

    // Line separator
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke().moveDown();

    // Total price
    doc
      .fontSize(14)
      .font('Helvetica-Bold')
      .text(`Precio total: ${factura.precio.toFixed(2)}`, 50, doc.y)
      .moveDown();
    // Finalize the PDF
    doc.end();

    // Return the PDF as a stream
    return new StreamableFile(doc);
  }
}
