import React, { useEffect, useState } from 'react';
import AccordionBasic from '../../components/AccordionBasic';
import Datepicker from '../../components/Datepicker';
import DateSelect from '../../components/DateSelect';
import CheckboxList from './CheckboxList';
import MinMaxAmountInput from './MinMaxAmountInput';

/* TO DO 
    Refactoring
*/

function TransactionsFilterBar({ accounts, categories, label }) {
  const [dateSelectedType, setDateSelectedType] = useState('');
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [selectedRecordType, setSelectedRecordType] = useState([]);
  const [selectedMinAmmount, setSelectedMinAmmount] = useState();
  const [selectedMaxAmmount, setSelectedMaxAmmount] = useState();
  const [selectedStartDate, setSelectedStartDate] = useState();
  const [selectedEndDate, setSelectedEndDate] = useState();

  // console.log("Start Date: ", selectedStartDate);
  // console.log("End Date: ", selectedEndDate);

  useEffect(() => {
    switch (dateSelectedType) {
      case 'Today':
        setSelectedStartDate(new Date());
        setSelectedEndDate(new Date());
        break;
      case 'Last 7 Days':
        setSelectedStartDate(new Date(new Date().getTime() - (6 * 24 * 60 * 60 * 1000)));
        setSelectedEndDate(new Date());
        break;
      case 'Last Month':
        setSelectedStartDate(new Date(new Date().getTime() - (30 * 24 * 60 * 60 * 1000)));
        setSelectedEndDate(new Date());
        break;
      case 'Last 12 Months':
        setSelectedStartDate(new Date(new Date().getTime() - (365 * 24 * 60 * 60 * 1000)));
        setSelectedEndDate(new Date());
        break;
      case 'All Time':
        setSelectedStartDate();
        setSelectedEndDate();
        break;
      case 'Custom':
        break;
      default:
        setSelectedStartDate();
        setSelectedEndDate();
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
                  filterOptions={['Cash', 'Axis']}
                  selectedFilters={selectedAccounts}
                  setSelectedFilters={setSelectedAccounts}
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
                  filterOptions={['Food', 'Transport']}
                  selectedFilters={selectedCategories}
                  setSelectedFilters={setSelectedCategories}
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
                  filterOptions={['useless', 'impulse']}
                  selectedFilters={selectedLabels}
                  setSelectedFilters={setSelectedLabels}
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
                filterOptions={['Expense', 'Income', 'Transfer']}
                selectedFilters={selectedRecordType}
                setSelectedFilters={setSelectedRecordType}
              ></CheckboxList>
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
                <Datepicker setSelectedStartDate={setSelectedStartDate} setSelectedEndDate={setSelectedEndDate}></Datepicker>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionsFilterBar;
