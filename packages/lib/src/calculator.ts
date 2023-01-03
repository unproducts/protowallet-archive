import { getAllLabels } from './assets/labels';
import { Amount, Label, Range, Transaction } from './lookups';
import { Category, Currency, RecordDirection, RecordType } from './lookups/enums';
import { getAllTransactions } from './assets/transactions';

export default class Calculator {
  private dateRange: Range<Date>;

  constructor(dateRange: Range<Date>) {
    this.dateRange = dateRange;
  }

  async calculateTotalExpense(): Promise<Amount> {
    const transactions = await getAllTransactions({
      dateRange: this.dateRange,
      recordTypes: [ RecordType.Expense ]
    })
    return this.aggregateTransactionsAmount(transactions);
  }

  async calculateTotalIncome(): Promise<Amount> {
    const transactions = await getAllTransactions({
      dateRange: this.dateRange,
      recordTypes: [ RecordType.Income ]
    })
    return this.aggregateTransactionsAmount(transactions);
  }

  // Account Level Calculators
  async calculateAccount_NetBalance(accountId: string): Promise<Amount> {
    const transactions = await getAllTransactions({
      dateRange: this.dateRange,
      accounts: [ accountId ]
    })
    return this.aggregateTransactionsAmount(transactions);
  }

  async calculateAccount_TotalExpense(accountId: string): Promise<Amount> {
    const transactions = await getAllTransactions({
      dateRange: this.dateRange,
      accounts: [ accountId ],
      recordTypes: [ RecordType.Expense ]
    })
    return this.aggregateTransactionsAmount(transactions);
  }

  async calculateAccount_TotalIncome(accountId: string): Promise<Amount> {
    const transactions = await getAllTransactions({
      dateRange: this.dateRange,
      accounts: [ accountId ],
      recordTypes: [ RecordType.Income ]
    })
    return this.aggregateTransactionsAmount(transactions);
  }

  // General Analytics Calculators
  async calculateSpendings_CategoryWise(): Promise<Map<Category, Amount>> {
    const transactions = await getAllTransactions({
      dateRange: this.dateRange,
      recordTypes: [ RecordType.Expense ]
    })

    const categoryMap: Map<Category, Transaction[]> = await this.groupTransactions_Categorywise(transactions);
    return await this.aggregateTransactionsGroupAmount<Category>(categoryMap);
  }

  async calculateIncome_CategoryWise(): Promise<Map<Category, Amount>> {
    const transactions = await getAllTransactions({
      dateRange: this.dateRange,
      recordTypes: [ RecordType.Income ]
    })

    const categoryMap: Map<Category, Transaction[]> = await this.groupTransactions_Categorywise(transactions);
    return await this.aggregateTransactionsGroupAmount<Category>(categoryMap);
  }

  async calculateSpendings_LabelWise(): Promise<Map<Label, Amount>> {
    const transactions = await getAllTransactions({
      dateRange: this.dateRange,
      recordTypes: [ RecordType.Expense ]
    })

    const labelMap: Map<Label, Transaction[]> = await this.groupTransactions_Labelwise(transactions);
    return await this.aggregateTransactionsGroupAmount<Label>(labelMap);
  }

  async calculateIncome_LabelWise(): Promise<Map<Label, Amount>> {
    const transactions = await getAllTransactions({
      dateRange: this.dateRange,
      recordTypes: [ RecordType.Income ]
    })

    const labelMap: Map<Label, Transaction[]> = await this.groupTransactions_Labelwise(transactions);
    return await this.aggregateTransactionsGroupAmount<Label>(labelMap);
  }

  // Aggregations
  async aggregateTransactionsAmount(transactions: Transaction[]): Promise<Amount> {
    let currentBalance = 0;
    for (let index = 0; index < transactions.length; index++) {
      const transaction = transactions[index];
      switch (transaction.direction) {
        case RecordDirection.Right:
          currentBalance += transaction.amount;
          break;
        case RecordDirection.Left:
          currentBalance -= transaction.amount;
          break;
      }
    }
    if (currentBalance < 0) {
      return {
        direction: RecordDirection.Left,
        value: currentBalance * -1,
        currency: Currency.INR,
      };
    } else {
      return {
        direction: RecordDirection.Right,
        value: currentBalance,
        currency: Currency.INR,
      };
    }
  }

  async aggregateTransactionsGroupAmount<K>(transactionsMap: Map<K, Transaction[]>): Promise<Map<K, Amount>> {
    const data: Map<K, Amount> = new Map();
    for (let key of transactionsMap.keys()) {
      const transactions = transactionsMap.get(key);
      const aggregatedAmount = await this.aggregateTransactionsAmount(transactions);
      data.set(key, aggregatedAmount);
    }
    return data;
  }

  // Groupings
  async groupTransactions_Categorywise(transactions: Transaction[]): Promise<Map<Category, Transaction[]>> {
    const categoryWiseGrouping: Map<Category, Transaction[]>  = new Map();
    for (let index = 0; index < transactions.length; index++) {
      const transaction = transactions[index];
      const exisitingTransactions = categoryWiseGrouping.get(transaction.category) || [];
      exisitingTransactions.push(transaction);
      categoryWiseGrouping.set(transaction.category, exisitingTransactions);
    }
    return categoryWiseGrouping;
  }

  async groupTransactions_Labelwise(transactions: Transaction[]): Promise<Map<Label, Transaction[]>> {
    const labelWiseGrouping: Map<Label, Transaction[]> = new Map();
    const labelData: Record<string, Label> = await getAllLabels();

    for (let index = 0; index < transactions.length; index++) {
      const transaction = transactions[index];
      const labels = transaction.labels || [];
      for (let index1 = 0; index1 < labels.length; index1++) {
        const labelId = labels[index1];
        const label = labelData[labelId];
        const exisitingTransactions = labelWiseGrouping.get(label) || []
        exisitingTransactions.push(transaction);
        labelWiseGrouping.set(label, exisitingTransactions)
      }
    }
    return labelWiseGrouping;
  }
}
