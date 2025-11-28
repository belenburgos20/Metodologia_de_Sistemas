// Permite cambiar reglas de negocio (descuentos, impuestos) sin modificar el código principal

export interface IPricingStrategy {
    calcularPrecio(precioBase: number, cantidad?: number): number;
    getDescripcion(): string;
}

// Sin descuento ni impuesto
export class PrecioNormalStrategy implements IPricingStrategy {
    calcularPrecio(precioBase: number, cantidad?: number): number {
        return precioBase;
    }

    getDescripcion(): string {
        return "Precio normal";
    }
}

// Descuento por volumen
export class DescuentoVolumenStrategy implements IPricingStrategy {
    private porcentajeDescuento: number;
    private cantidadMinima: number;

    constructor(porcentajeDescuento: number = 10, cantidadMinima: number = 10) {
        this.porcentajeDescuento = porcentajeDescuento;
        this.cantidadMinima = cantidadMinima;
    }

    calcularPrecio(precioBase: number, cantidad?: number): number {
        if (cantidad && cantidad >= this.cantidadMinima) {
            return precioBase * (1 - this.porcentajeDescuento / 100);
        }
        return precioBase;
    }

    getDescripcion(): string {
        return `Descuento por volumen: ${this.porcentajeDescuento}% al comprar ${this.cantidadMinima} o más unidades`;
    }
}

// Descuento por cliente frecuente
export class DescuentoClienteFrecuenteStrategy implements IPricingStrategy {
    private porcentajeDescuento: number;

    constructor(porcentajeDescuento: number = 5) {
        this.porcentajeDescuento = porcentajeDescuento;
    }

    calcularPrecio(precioBase: number, cantidad?: number): number {
        return precioBase * (1 - this.porcentajeDescuento / 100);
    }

    getDescripcion(): string {
        return `Descuento cliente frecuente: ${this.porcentajeDescuento}%`;
    }
}

// Con impuesto
export class PrecioConImpuestoStrategy implements IPricingStrategy {
    private porcentajeImpuesto: number;
    private baseStrategy: IPricingStrategy;

    constructor(porcentajeImpuesto: number = 21, baseStrategy: IPricingStrategy = new PrecioNormalStrategy()) {
        this.porcentajeImpuesto = porcentajeImpuesto;
        this.baseStrategy = baseStrategy;
    }

    calcularPrecio(precioBase: number, cantidad?: number): number {
        const precioConDescuento = this.baseStrategy.calcularPrecio(precioBase, cantidad);
        return precioConDescuento * (1 + this.porcentajeImpuesto / 100);
    }

    getDescripcion(): string {
        return `${this.baseStrategy.getDescripcion()} + IVA ${this.porcentajeImpuesto}%`;
    }
}

// Usa la estrategia seleccionada
export class CalculadoraPrecio {
    private strategy: IPricingStrategy;

    constructor(strategy: IPricingStrategy = new PrecioNormalStrategy()) {
        this.strategy = strategy;
    }

    setStrategy(strategy: IPricingStrategy): void {
        this.strategy = strategy;
    }

    calcular(precioBase: number, cantidad?: number): number {
        return this.strategy.calcularPrecio(precioBase, cantidad);
    }

    getDescripcionEstrategia(): string {
        return this.strategy.getDescripcion();
    }
}