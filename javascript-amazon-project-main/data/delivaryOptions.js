import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export const delivaryOptions = [{
  id: '1',
  delivaryDays: 7,
  priceCents: 0
},{
  id:'2',
  delivaryDays: 3,
  priceCents: 499
},{
  id: '3',
  delivaryDays: 1,
  priceCents: 999
}];

export function getDelivaryOptions(delivaryOptionId){

  let delivaryOption;

    delivaryOptions.forEach(option => {

      if (option.id === delivaryOptionId){

        delivaryOption = option;
      }

    });

    return delivaryOption || delivaryOptions[0];
};

export function calculateDelivaryDate(delivaryOption){

  const today = dayjs();
  const delivaryDate = today.add(delivaryOption.delivaryDays, 'days');
  const dateString = delivaryDate.format('dddd, MMMM, D');
  
  return dateString;
};