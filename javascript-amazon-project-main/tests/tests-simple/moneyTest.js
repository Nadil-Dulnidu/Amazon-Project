import { formatCurrency } from "../../utils/money.js";

console.log('test suite: format currency');

console.log('coverts cents in to dollers');

if (formatCurrency(2095) === '20.95'){

  console.log('passed');

}else{

  console.log('Failed');
}


console.log('works with 0');

if (formatCurrency(0) === '0.00'){

  console.log('passed');

}else{

  console.log('Failed');
}


console.log('rounds up to the nearest cents (1)');

if (formatCurrency(2000.5) === '20.01'){

  console.log('passed');

}else{

  console.log('Failed');
}


console.log('rounds up to the nearest cents (2)');

if (formatCurrency(2000.4) === '20.00'){

  console.log('passed');

}else{

  console.log('Failed');
}