import React, { useState } from "react";
import "./index.css";

const Table = () => {
  const [rows, setRows] = useState([
    { id: 1, label1: "Default Option", label2: [] },
  ]);
  const [multiSelectOptions, setMultiSelectOptions] = useState([
    "Option 1",
    "Option 2",
    "Option 3",
  ]);
  const [selectedOptions] = useState([]);

  // Handle single-select dropdown changes
  const handleLabel1Change = (id, value) => {
    setRows(rows.map(row => (row.id === id ? { ...row, label1: value } : row)));
  };

  // Handle multi-select dropdown changes
  const handleLabel2Change = (id, value) => {
    setRows(
      rows.map(row =>
        row.id === id
          ? {
              ...row,
              label2: row.label2.includes(value)
                ? row.label2.filter(item => item !== value) // Remove if already selected
                : [...row.label2, value], // Add if not selected
            }
          : row
      )
    );
  };

  // Add new option to multi-select dropdown
  const handleAddNewOption = (newOption) => {
    if (newOption && !multiSelectOptions.includes(newOption)) {
      setMultiSelectOptions([...multiSelectOptions, newOption]);
    }
  };

  // Add new row
  const handleAddRow = () => {
    const newRow = { id: rows.length + 1, label1: "", label2: [] };
    setRows([...rows, newRow]);
  };

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Label 1</th>
            <th>Label 2</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>
                <select
                  value={row.label1}
                  onChange={(e) => handleLabel1Change(row.id, e.target.value)}
                >
                  <option value="">Select an option</option>
                  {["Option A", "Option B", "Option C"].map((option) => (
                    <option
                      key={option}
                      value={option}
                      disabled={selectedOptions.includes(option)}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <div className="multi-select-container">
                  {multiSelectOptions.map((option) => (
                    <label key={option}>
                      <input
                        type="checkbox"
                        checked={row.label2.includes(option)}
                        onChange={() => handleLabel2Change(row.id, option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
                {/* Selected items with "X" */}
                <div className="selected-items">
                  {row.label2.map((item) => (
                    <span key={item} className="selected-item">
                      {item}
                      <button
                        onClick={() => handleLabel2Change(row.id, item)}
                        className="remove-btn"
                      >
                        X
                      </button>
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Add new option input */}
      <div className="add-option-container">
        <input
          type="text"
          placeholder="Add new item"
          id="newOptionInput"
          className="new-option-input"
        />
        <button
          onClick={() =>
            handleAddNewOption(
              document.getElementById("newOptionInput").value.trim()
            )
          }
          className="add-option-btn"
        >
          + Add
        </button>
      </div>
      {/* Add new row button */}
      <div className="add-row-container">
        <button onClick={handleAddRow} className="add-row-btn">
          + Add New Row
        </button>
      </div>
    </div>
  );
};

export default Table;
