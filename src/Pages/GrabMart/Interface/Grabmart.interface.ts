export default interface IGrabmart {
    FootprintId: number,
    FootprintCode: string,
    Length: number,
    Width: number,
    Tie: number,
    ReceivingHeight: number,
    StorageHeight: number,
    ShippingHeight: number,
    UnitQuantity: number,
    [key: string]: any;
}
