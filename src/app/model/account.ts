export interface Account {
	id: string;
	name: string;
	icon: string;
	iconColor: string;
	amount: number;
	currencyId: number;
	currencyName: string;
  isDeleted: boolean;
  transactions: any;
}
