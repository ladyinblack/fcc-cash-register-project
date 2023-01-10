// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>Cash Register</h1>`;

/**
 * Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.
 * cid is a 2D array listing available currency.
 * The checkCashRegister() function should always return an object with a status key and a change key.
 * Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.
 * Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the for the key change if it is equal to the change due.
 * Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.
 *    =====================================
 *    ||Currency Unit             Amount ||
 *    =====================================
 *        Penny                   $0.01 (PENNY)
 *        Nickel                  $0.05 (NICKEL)
 *        Dime                    $0.1 (DIME)
 *        Quarter                 $0.25 (QUARTER)
 *        Dollar                  $1 (ONE)
 *        Five Dollars            $5 (FIVE)
 *        Ten Dollars             $10 (TEN)
 *        Twenty Dollars          $20 (TWENTY)
 *        One-hundred Dollars     $100 (ONE HUNDRED)
 * See below for an example of a cash-in-drawer array:
 * [
 *    ["NICKEL", 2.05],
 *    ["DIME", 3.1],
 *    ["QUARTER", 4.25],
 *    ["ONE", 90],
 *    ["FIVE", 55],
 *    ["TEN", 20],
 *    ["TWENTY", 60],
 *    ["ONE HUNDRED", 100]
 * ]
 */

function checkCashRegister(price, cash, cid) {
  let change = cash - price;
  let retOutput = { status: null, change: [] };
  const status = ['INSUFFICIENT_FUNDS', 'CLOSED', 'OPEN'];
  const register = cid.reduce(
    (a, c) => {
      a.total += c[1];
      a[c[0]] = c[1];
      return a;
    },
    { total: 0 }
  );
  if (register.total === change) {
    retOutput.status = status[1];
    retOutput.change = cid;
    return retOutput;
  }
  if (register.total < change) {
    retOutput.status = status[0];
    return retOutput;
  }
  const retChange = denominations.reduce((a, c) => {
    let value = 0;
    while (register[c.name] > 0 && change >= c.val) {
      change -= c.val;
      register[c.name] -= c.val;
      value += c.val;
      change = Math.round(change * 100) / 100;
    }
    if (value > 0) {
      a.push([c.name, value]);
    }
    return a;
  }, []);
  if (retChange.length < 1 || change > 0) {
    retOutput.status = status[0];
    return retOutput;
  }
  retOutput.status = status[2];
  retOutput.change = retChange;

  return retOutput;
}

const denominations = [
  { name: 'ONE HUNDRED', val: 100 },
  { name: 'TWENTY', val: 20 },
  { name: 'TEN', val: 10 },
  { name: 'FIVE', val: 5 },
  { name: 'ONE', val: 1 },
  { name: 'QUARTER', val: 0.25 },
  { name: 'DIME', val: 0.1 },
  { name: 'NICKEL', val: 0.05 },
  { name: 'PENNY', val: 0.01 },
];

console.log(
  checkCashRegister(19.5, 20, [
    ['PENNY', 1.01],
    ['NICKEL', 2.05],
    ['DIME', 3.1],
    ['QUARTER', 4.25],
    ['ONE', 90],
    ['FIVE', 55],
    ['TEN', 20],
    ['TWENTY', 60],
    ['ONE HUNDRED', 100],
  ])
);
console.log(
  checkCashRegister(19.5, 20, [
    ['PENNY', 1.01],
    ['NICKEL', 2.05],
    ['DIME', 3.1],
    ['QUARTER', 4.25],
    ['ONE', 90],
    ['FIVE', 55],
    ['TEN', 20],
    ['TWENTY', 60],
    ['ONE HUNDRED', 100],
  ])
);
console.log(
  checkCashRegister(3.26, 100, [
    ['PENNY', 1.01],
    ['NICKEL', 2.05],
    ['DIME', 3.1],
    ['QUARTER', 4.25],
    ['ONE', 90],
    ['FIVE', 55],
    ['TEN', 20],
    ['TWENTY', 60],
    ['ONE HUNDRED', 100],
  ])
);
console.log(
  checkCashRegister(19.5, 20, [
    ['PENNY', 0.01],
    ['NICKEL', 0],
    ['DIME', 0],
    ['QUARTER', 0],
    ['ONE', 0],
    ['FIVE', 0],
    ['TEN', 0],
    ['TWENTY', 0],
    ['ONE HUNDRED', 0],
  ])
);
console.log(
  checkCashRegister(19.5, 20, [
    ['PENNY', 0.01],
    ['NICKEL', 0],
    ['DIME', 0],
    ['QUARTER', 0],
    ['ONE', 1],
    ['FIVE', 0],
    ['TEN', 0],
    ['TWENTY', 0],
    ['ONE HUNDRED', 0],
  ])
);
console.log(
  checkCashRegister(19.5, 20, [
    ['PENNY', 0.5],
    ['NICKEL', 0],
    ['DIME', 0],
    ['QUARTER', 0],
    ['ONE', 0],
    ['FIVE', 0],
    ['TEN', 0],
    ['TWENTY', 0],
    ['ONE HUNDRED', 0],
  ])
);
