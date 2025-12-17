import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { loadSalesData, aggregateByMonth, aggregateByItemType, aggregateByMonthAndType, itemTypeColors } from '../utils/csvParser';
import ChartWrapper from './ChartWrapper';
import '../styles/DataVisualization.css';

function DataVisualization() {
  const [selectedItemType, setSelectedItemType] = useState('All');
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSalesData()
      .then(data => {
        setRawData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading data:', err);
        setError('Failed to load sales data');
        setLoading(false);
      });
  }, []);

  // Aggregate data
  const monthlyData = useMemo(() => aggregateByMonth(rawData), [rawData]);
  const itemTypeData = useMemo(() => aggregateByItemType(rawData), [rawData]);
  const monthlyTypeData = useMemo(() => aggregateByMonthAndType(rawData), [rawData]);

  // Get unique years and months
  const years = useMemo(() => {
    const uniqueYears = [...new Set(rawData.map(d => d.year))].sort();
    return uniqueYears;
  }, [rawData]);

  const months = useMemo(() => {
    const uniqueMonths = [...new Set(rawData.map(d => d.monthName))].sort((a, b) => {
      const monthOrder = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
      return monthOrder.indexOf(a) - monthOrder.indexOf(b);
    });
    return uniqueMonths;
  }, [rawData]);

  const itemTypes = useMemo(() => {
    return ['All', ...itemTypeData.map(d => d.itemType)];
  }, [itemTypeData]);

  // Filter data based on selections
  const filteredData = useMemo(() => {
    let data = monthlyTypeData;

    if (selectedItemType !== 'All') {
      data = data.filter(d => d.itemType === selectedItemType);
    }

    if (selectedYear !== 'All') {
      data = data.filter(d => d.year === parseInt(selectedYear));
    }

    if (selectedMonth !== 'All') {
      data = data.filter(d => d.monthName === selectedMonth);
    }

    return data;
  }, [monthlyTypeData, selectedItemType, selectedYear, selectedMonth]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalRetailSales = monthlyData.reduce((sum, d) => sum + d.retailSales, 0);
    const totalWarehouseSales = monthlyData.reduce((sum, d) => sum + d.warehouseSales, 0);
    const totalSales = monthlyData.reduce((sum, d) => sum + d.totalSales, 0);
    const avgMonthlySales = monthlyData.length > 0 ? (totalSales / monthlyData.length).toFixed(2) : 0;
    const topItemType = itemTypeData.length > 0 ? itemTypeData[0] : null;

    return {
      totalRetailSales,
      totalWarehouseSales,
      totalSales,
      avgMonthlySales,
      topItemType: topItemType?.itemType || 'N/A',
      topItemTypeSales: topItemType?.totalSales || 0
    };
  }, [monthlyData, itemTypeData]);

  // Prepare monthly chart data
  const monthlyChartData = useMemo(() => {
    return monthlyData.map(d => ({
      month: `${d.monthName} ${d.year}`,
      'Retail Sales': d.retailSales,
      'Warehouse Sales': d.warehouseSales,
      'Retail Transfers': d.retailTransfers,
      'Total Sales': d.totalSales
    }));
  }, [monthlyData]);

  // Prepare item type chart data
  const itemTypeChartData = useMemo(() => {
    return itemTypeData.map(d => ({
      itemType: d.itemType,
      'Retail Sales': d.retailSales,
      'Warehouse Sales': d.warehouseSales,
      'Total Sales': d.totalSales
    }));
  }, [itemTypeData]);

  // Prepare monthly breakdown by item type
  const monthlyByTypeData = useMemo(() => {
    const grouped = {};
    monthlyTypeData.forEach(d => {
      const key = `${d.monthName} ${d.year}`;
      if (!grouped[key]) {
        grouped[key] = { month: key };
      }
      grouped[key][d.itemType] = d.totalSales;
    });
    return Object.values(grouped);
  }, [monthlyTypeData]);

  if (loading) {
    return (
      <div className="visualization-container">
        <div className="loading-message">Loading sales data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="visualization-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="visualization-container">
      <h2 className="viz-title">Warehouse & Retail Sales Analysis</h2>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Retail Sales</h3>
          <p className="stat-number">${stats.totalRetailSales.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
        </div>
        <div className="stat-card">
          <h3>Total Warehouse Sales</h3>
          <p className="stat-number">${stats.totalWarehouseSales.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
        </div>
        <div className="stat-card">
          <h3>Total Sales</h3>
          <p className="stat-number">${stats.totalSales.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
        </div>
        <div className="stat-card">
          <h3>Avg Monthly Sales</h3>
          <p className="stat-number">${stats.avgMonthlySales}</p>
        </div>
        <div className="stat-card">
          <h3>Top Category</h3>
          <p className="stat-number">{stats.topItemType}</p>
        </div>
        <div className="stat-card">
          <h3>Top Category Sales</h3>
          <p className="stat-number">${stats.topItemTypeSales.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="filters">
        <div className="filter-group">
          <label htmlFor="item-type-select">Filter by Item Type:</label>
          <select
            id="item-type-select"
            value={selectedItemType}
            onChange={(e) => setSelectedItemType(e.target.value)}
            className="filter-select"
          >
            {itemTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="year-select">Filter by Year:</label>
          <select
            id="year-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="filter-select"
          >
            <option value="All">All Years</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="month-select">Filter by Month:</label>
          <select
            id="month-select"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="filter-select"
          >
            <option value="All">All Months</option>
            {months.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Overall Monthly Sales Trend */}
      <div className="chart-section">
        <h3>Total Sales by Month (All Categories)</h3>
        <Suspense fallback={<div style={{color: '#b0bec5', padding: '2rem', textAlign: 'center'}}>Loading chart...</div>}>
          <ChartWrapper>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={monthlyChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="Retail Sales" stackId="1" stroke="#8B0000" fill="#8B0000" />
                <Area type="monotone" dataKey="Warehouse Sales" stackId="1" stroke="#4169E1" fill="#4169E1" />
                <Area type="monotone" dataKey="Retail Transfers" stackId="1" stroke="#FFA500" fill="#FFA500" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartWrapper>
        </Suspense>
      </div>

      {/* Sales by Item Type */}
      <div className="chart-section">
        <h3>Total Sales by Item Type</h3>
        <Suspense fallback={<div style={{color: '#b0bec5', padding: '2rem', textAlign: 'center'}}>Loading chart...</div>}>
          <ChartWrapper>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={itemTypeChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="itemType" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Retail Sales" fill="#8B0000" />
                <Bar dataKey="Warehouse Sales" fill="#4169E1" />
              </BarChart>
            </ResponsiveContainer>
          </ChartWrapper>
        </Suspense>
      </div>

      {/* Monthly Sales by Item Type */}
      <div className="chart-section">
        <h3>Monthly Sales Breakdown by Item Type</h3>
        <Suspense fallback={<div style={{color: '#b0bec5', padding: '2rem', textAlign: 'center'}}>Loading chart...</div>}>
          <ChartWrapper>
            <ResponsiveContainer width="100%" height={500}>
              <BarChart data={monthlyByTypeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Legend />
                {itemTypeData.map(type => (
                  <Bar 
                    key={type.itemType} 
                    dataKey={type.itemType} 
                    fill={itemTypeColors[type.itemType] || '#9370DB'} 
                    name={type.itemType}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </ChartWrapper>
        </Suspense>
      </div>

      {/* Individual Item Type Trend */}
      {selectedItemType !== 'All' && selectedMonth === 'All' && (
        <div className="chart-section">
          <h3>{selectedItemType} Sales Trend Over Time</h3>
          <Suspense fallback={<div style={{color: '#b0bec5', padding: '2rem', textAlign: 'center'}}>Loading chart...</div>}>
            <ChartWrapper>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="monthName" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="totalSales"
                    stroke={itemTypeColors[selectedItemType] || '#9370DB'}
                    strokeWidth={3}
                    name={`${selectedItemType} Total Sales`}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartWrapper>
          </Suspense>
        </div>
      )}

      {/* Data Tables */}
      {selectedMonth !== 'All' && selectedItemType === 'All' && (
        <div className="data-table">
          <h3>{selectedMonth} Sales by Item Type</h3>
          <table>
            <thead>
              <tr>
                <th>Item Type</th>
                <th>Retail Sales</th>
                <th>Warehouse Sales</th>
                <th>Total Sales</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{item.itemType}</td>
                  <td>${item.retailSales.toFixed(2)}</td>
                  <td>${item.warehouseSales.toFixed(2)}</td>
                  <td>${item.totalSales.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DataVisualization;
