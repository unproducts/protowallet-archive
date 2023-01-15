import React, { useEffect, useState } from 'react';
import AccordionBasic from '../../components/AccordionBasic';
import Datepicker from '../../components/Datepicker';
import DateSelect from '../../components/DateSelect';
import CheckboxList from './CheckboxList';
import MinMaxAmountInput from './MinMaxAmountInput';

import { enums, lookups, transactions } from '@wallet/core';

export type DateSelectedType = 'Today' | 'Last 7 Days' | 'Last Month' | 'Last 12 Months' | 'All Time' | 'Custom';

export type TransactionsFilterBarOptions = {
  accounts: lookups.Account[];
  categories: lookups.Category[];
  labels: lookups.Label[];
  setFilterQuery: (q: transactions.GetAllTransactionsOptions) => void;
};

function TransactionsFilterBar(options: TransactionsFilterBarOptions) {
  const [dateSelectedType, setDateSelectedType] = useState<DateSelectedType>('Last 7 Days');
  const [selectedAccounts, setSelectedAccounts] = useState<lookups.Account[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<lookups.Category[]>([]);
  const [selectedLabels, setSelectedLabels] = useState<lookups.Label[]>([]);
  const [selectedRecordType, setSelectedRecordType] = useState<enums.RecordType[]>([]);
  const [selectedMinAmmount, setSelectedMinAmmount] = useState<number>();
  const [selectedMaxAmmount, setSelectedMaxAmmount] = useState<number>();
  const [selectedStartDate, setSelectedStartDate] = useState<Date>(new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000));
  const [selectedEndDate, setSelectedEndDate] = useState<Date>(new Date());

  useEffect(() => {
    const filterQuery: transactions.GetAllTransactionsOptions = {
      dateRange: {
        from: selectedStartDate,
        to: selectedEndDate,
      },
    };
    if (selectedAccounts?.length) {
      filterQuery.accounts = selectedAccounts.map((acc) => acc.id);
    }
    if (selectedCategories?.length) {
      filterQuery.categories = selectedCategories.map((ctg) => ctg.id);
    }
    if (selectedLabels?.length) {
      filterQuery.labels = selectedLabels.map((l) => l.id);
    }
    if (selectedRecordType?.length) {
      filterQuery.recordTypes = selectedRecordType;
    }
    if (selectedMaxAmmount || selectedMinAmmount) {
      filterQuery.amountRange = {};
      if (selectedMaxAmmount) filterQuery.amountRange.to = selectedMaxAmmount;
      if (selectedMinAmmount) filterQuery.amountRange.from = selectedMinAmmount;
    }
    options.setFilterQuery(filterQuery);
  }, [
    selectedAccounts,
    selectedCategories,
    selectedLabels,
    selectedRecordType,
    selectedMinAmmount,
    selectedMaxAmmount,
    selectedStartDate,
    selectedEndDate,
  ]);

  useEffect(() => {
    switch (dateSelectedType) {
      case 'Today':
        setSelectedStartDate(new Date());
        setSelectedEndDate(new Date());
        break;
      case 'Last 7 Days':
        setSelectedStartDate(new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000));
        setSelectedEndDate(new Date());
        break;
      case 'Last Month':
        setSelectedStartDate(new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000));
        setSelectedEndDate(new Date());
        break;
      case 'Last 12 Months':
        setSelectedStartDate(new Date(new Date().getTime() - 365 * 24 * 60 * 60 * 1000));
        setSelectedEndDate(new Date());
        break;
    }
  }, [dateSelectedType]);

  return (
    <div className="space-y-8">
      {/* White box */}
      <div className="bg-white shadow-lg rounded-sm border border-slate-200 p-5 min-w-80">
        <div className="grid md:grid-cols-2 xl:grid-cols-1 gap-6">
          {/* Accounts */}
          <div>
            <AccordionBasic
              children={
                <CheckboxList
                  filterOptions={options.accounts}
                  selectedFilters={selectedAccounts}
                  setSelectedFilters={setSelectedAccounts}
                  setDisplayValue={(t) => t.name}
                ></CheckboxList>
              }
              title={'Accounts'}
              show={true}
            ></AccordionBasic>
          </div>
          {/* Categories */}
          <div>
            <AccordionBasic
              children={
                <CheckboxList
                  filterOptions={options.categories}
                  selectedFilters={selectedCategories}
                  setSelectedFilters={setSelectedCategories}
                  setDisplayValue={(t) => t.title}
                ></CheckboxList>
              }
              title={'Categories'}
              show={true}
            ></AccordionBasic>
          </div>
          {/* Labels */}
          <div>
            <AccordionBasic
              children={
                <CheckboxList
                  filterOptions={options.labels}
                  selectedFilters={selectedLabels}
                  setSelectedFilters={setSelectedLabels}
                  setDisplayValue={(t) => t.value}
                ></CheckboxList>
              }
              title={'Labels'}
              show={true}
            ></AccordionBasic>
          </div>
          {/* Record Type */}
          <AccordionBasic
            children={
              <CheckboxList
                filterOptions={[enums.RecordType.Expense, enums.RecordType.Income, enums.RecordType.Transfer]}
                selectedFilters={selectedRecordType}
                setSelectedFilters={setSelectedRecordType}
                setDisplayValue={(t) => {
                  switch (t) {
                    case enums.RecordType.Expense:
                      return 'Expense';
                    case enums.RecordType.Income:
                      return 'Income';
                    case enums.RecordType.Transfer:
                      return 'Transfer';
                  }
                }}
              />
            }
            title={'Record Type'}
            show={true}
          ></AccordionBasic>
          {/* Amount */}
          <div>
            <AccordionBasic
              title={'Amount'}
              children={<MinMaxAmountInput setSelectedMinAmmount={setSelectedMinAmmount} setSelectedMaxAmmount={setSelectedMaxAmmount} />}
              show={true}
            ></AccordionBasic>
          </div>
          {/* Date*/}
          <div>
            <div className="text-sm text-slate-800 font-medium">Date</div>
            <DateSelect onChange={setDateSelectedType}></DateSelect>
            <br />
            {dateSelectedType === 'Custom' ? (
              <div>
                <div className="text-sm text-slate-800 font-medium">Custom Date</div>
                <Datepicker align={'middle'} setSelectedStartDate={setSelectedStartDate} setSelectedEndDate={setSelectedEndDate}></Datepicker>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionsFilterBar;
