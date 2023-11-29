export default interface IAnalytics {
  Id: number
  CustomerId?: string  | null
  LocationName?: string  | null
  TransactionDate?: Date 
  MembershipNo?: string  | null
  CashierNo?: string  | null
  RegisterNo?: string  | null
  TransactionNo?: string  | null
  OrderNo?: string | null
  Qty?: number | null
  Amount?: number  | null
  UserId?: string  | null
  DeleteFlag: boolean  | null
}
