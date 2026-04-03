import React from "react";

export default function SeqTable({ data }) {
  if (!data) return null; // Handle empty data gracefully
  const { headers, rows } = data;
  const keys = headers.map((header) => header.toLowerCase());

  return (
    <div className="seq-table-wrap">
      <table className="seq-table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {keys.map((key, i) => (
                <td key={i}>{row[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
