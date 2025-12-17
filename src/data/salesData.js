// This file will be populated by loading the CSV
// For now, export empty arrays that will be populated

export let salesData = [];
export let monthlyData = [];
export let itemTypeData = [];
export let monthlyTypeData = [];

export function setSalesData(data) {
  salesData = data;
}

export function setMonthlyData(data) {
  monthlyData = data;
}

export function setItemTypeData(data) {
  itemTypeData = data;
}

export function setMonthlyTypeData(data) {
  monthlyTypeData = data;
}

export const monthOrder = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const itemTypes = ['WINE', 'LIQUOR', 'BEER', 'KEGS', 'STR_SUPPLIES'];

export const itemTypeColors = {
  'WINE': '#8B0000',
  'LIQUOR': '#FFD700',
  'BEER': '#FFA500',
  'KEGS': '#4169E1',
  'STR_SUPPLIES': '#808080',
  'OTHER': '#9370DB'
};

