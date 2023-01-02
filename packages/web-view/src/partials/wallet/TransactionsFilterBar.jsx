import React, { useState } from 'react';
import AccordionBasic from '../../components/AccordionBasic';
import Datepicker from '../../components/Datepicker';
import DateSelect from '../../components/DateSelect';
import CheckboxList from './CheckboxList';

function TransactionsFilterBar() {
  const [dateSelectType, setDateSelectType] = useState('');

  const amountMinMax = (
    <div>
      <label className="block text-sm font-medium mb-1" htmlFor="placeholder">
        Min
      </label>
      <input id="placeholder" className="form-input w-full" type="text" placeholder="" />
      <label className="block text-sm font-medium mb-1" htmlFor="placeholder">
        Max
      </label>
      <input id="placeholder" className="form-input w-full" type="text" placeholder="" />
    </div>
  );

  return (
    <div className="space-y-8">
      {/* White box */}
      <div className="bg-white shadow-lg rounded-sm border border-slate-200 p-5 min-w-80">
        <div className="grid md:grid-cols-2 xl:grid-cols-1 gap-6">
          {/* Accounts */}
          <div>
            {/* <div className="text-sm text-slate-800 font-semibold mb-3">Accounts</div> */}
            <AccordionBasic
              children={<CheckboxList checks={['All Accounts', 'Cash', 'Axis']}></CheckboxList>}
              title={'Accounts'}
              show={true}
            ></AccordionBasic>
          </div>
          {/* Categories */}
          <div>
            {/* <div className="text-sm text-slate-800 font-semibold mb-3">Accounts</div> */}
            <AccordionBasic
              children={<CheckboxList checks={['All Categories', 'Food', 'Transport']}></CheckboxList>}
              title={'Categories'}
              show={true}
            ></AccordionBasic>
          </div>
          {/* Labels */}
          <div>
            {/* <div className="text-sm text-slate-800 font-semibold mb-3">Accounts</div> */}
            <AccordionBasic
              children={<CheckboxList checks={['All Labels', 'useless', 'impulse']}></CheckboxList>}
              title={'Labels'}
              show={true}
            ></AccordionBasic>
          </div>
          {/* Record Type */}
          <AccordionBasic
            children={<CheckboxList checks={['All Records ', 'Expense', 'Income', 'Transfer']}></CheckboxList>}
            title={'Record Type'}
            show={true}
          ></AccordionBasic>
          {/* Amount 2 */}
          <div>
            <AccordionBasic title={'Amount'} children={amountMinMax} show={true}></AccordionBasic>
          </div>
          {/* Date*/}
          <div>
            <div className="text-sm text-slate-800 font-medium">Date</div>
            <DateSelect onChange={setDateSelectType}></DateSelect>
            <br />
            {dateSelectType === 'Custom' ? (
              <div>
                <div className="text-sm text-slate-800 font-medium">Custom Date</div>
                <Datepicker></Datepicker>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionsFilterBar;
