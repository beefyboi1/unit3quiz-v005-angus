import Papa from 'papaparse';

// Month names mapping
const monthNames = {
  1: 'January', 2: 'February', 3: 'March', 4: 'April',
  5: 'May', 6: 'June', 7: 'July', 8: 'August',
  9: 'September', 10: 'October', 11: 'November', 12: 'December'
};

export async function loadSalesData() {
  try {
    // Try both paths - root and public folder
    let response = await fetch('/Warehouse_and_Retail_Sales.csv');
    if (!response.ok) {
      response = await fetch('./Warehouse_and_Retail_Sales.csv');
    }
    if (!response.ok) {
      throw new Error('CSV file not found');
    }
    const csvText = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const data = results.data.map(row => ({
            year: parseInt(row.YEAR),
            month: parseInt(row.MONTH),
            monthName: monthNames[parseInt(row.MONTH)],
            supplier: row.SUPPLIER,
            itemCode: row['ITEM CODE'],
            itemDescription: row['ITEM DESCRIPTION'],
            itemType: row['ITEM TYPE'],
            retailSales: parseFloat(row['RETAIL SALES']) || 0,
            retailTransfers: parseFloat(row['RETAIL TRANSFERS']) || 0,
            warehouseSales: parseFloat(row['WAREHOUSE SALES']) || 0,
            totalSales: (parseFloat(row['RETAIL SALES']) || 0) + 
                       (parseFloat(row['RETAIL TRANSFERS']) || 0) + 
                       (parseFloat(row['WAREHOUSE SALES']) || 0)
          })).filter(row => row.year && row.month);
          
          resolve(data);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error('Error loading CSV:', error);
    throw error;
  }
}

export function aggregateByMonth(data) {
  const monthlyData = {};
  
  data.forEach(row => {
    const key = `${row.year}-${row.month}`;
    if (!monthlyData[key]) {
      monthlyData[key] = {
        year: row.year,
        month: row.month,
        monthName: row.monthName,
        retailSales: 0,
        retailTransfers: 0,
        warehouseSales: 0,
        totalSales: 0
      };
    }
    
    monthlyData[key].retailSales += row.retailSales;
    monthlyData[key].retailTransfers += row.retailTransfers;
    monthlyData[key].warehouseSales += row.warehouseSales;
    monthlyData[key].totalSales += row.totalSales;
  });
  
  return Object.values(monthlyData).sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return a.month - b.month;
  });
}

export function aggregateByItemType(data) {
  const typeData = {};
  
  data.forEach(row => {
    const type = row.itemType || 'OTHER';
    if (!typeData[type]) {
      typeData[type] = {
        itemType: type,
        retailSales: 0,
        retailTransfers: 0,
        warehouseSales: 0,
        totalSales: 0
      };
    }
    
    typeData[type].retailSales += row.retailSales;
    typeData[type].retailTransfers += row.retailTransfers;
    typeData[type].warehouseSales += row.warehouseSales;
    typeData[type].totalSales += row.totalSales;
  });
  
  return Object.values(typeData).sort((a, b) => b.totalSales - a.totalSales);
}

export function aggregateByMonthAndType(data) {
  const monthlyTypeData = {};
  
  data.forEach(row => {
    const key = `${row.year}-${row.month}-${row.itemType}`;
    if (!monthlyTypeData[key]) {
      monthlyTypeData[key] = {
        year: row.year,
        month: row.month,
        monthName: row.monthName,
        itemType: row.itemType,
        retailSales: 0,
        retailTransfers: 0,
        warehouseSales: 0,
        totalSales: 0
      };
    }
    
    monthlyTypeData[key].retailSales += row.retailSales;
    monthlyTypeData[key].retailTransfers += row.retailTransfers;
    monthlyTypeData[key].warehouseSales += row.warehouseSales;
    monthlyTypeData[key].totalSales += row.totalSales;
  });
  
  return Object.values(monthlyTypeData).sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    if (a.month !== b.month) return a.month - b.month;
    return a.itemType.localeCompare(b.itemType);
  });
}

export const itemTypeColors = {
  'WINE': '#8B0000',
  'LIQUOR': '#FFD700',
  'BEER': '#FFA500',
  'KEGS': '#4169E1',
  'STR_SUPPLIES': '#808080',
  'OTHER': '#9370DB'
};

