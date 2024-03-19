import React from 'react'

export default function Signin() {
  return (
    <div className="flex flex-col items-end">
    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4">Button</button>
    <div className="border border-blue-500 rounded-lg overflow-hidden">
      <table className="table-auto">
        <thead>
          <tr>
            <th className="border border-blue-500 bg-blue-100 px-8 py-4">Report ID</th>
            <th className="border border-blue-500 bg-blue-100 px-8 py-4">Report created by</th>
            <th className="border border-blue-500 bg-blue-100 px-8 py-4">Report created Date</th>
            <th className="border border-blue-500 bg-blue-100 px-8 py-4">Month</th>
            <th className="border border-blue-500 bg-blue-100 px-8 py-4">Year</th>
            <th className="border border-blue-500 bg-blue-100 px-8 py-4">Last edited</th>
            <th className="border border-blue-500 bg-blue-100 px-8 py-4">Overall missing stocks</th>
            <th className="border border-blue-500 bg-blue-100 px-8 py-4">View</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-blue-500 px-8 py-4 w-258 h-90"></td>
            <td className="border border-blue-500 px-8 py-4 w-258 h-90"></td>
            <td className="border border-blue-500 px-8 py-4 w-258 h-90"></td>
            <td className="border border-blue-500 px-8 py-4 w-258 h-90"></td>
            <td className="border border-blue-500 px-8 py-4 w-258 h-90"></td>
            <td className="border border-blue-500 px-8 py-4 w-258 h-90"></td>
            <td className="border border-blue-500 px-8 py-4 w-258 h-90"></td>
            <td className="border border-blue-500 px-8 py-4 w-258 h-90"></td>
          </tr>
          {/* Repeat the above row 5 times */}
        </tbody>
      </table>
    </div>
  </div>
  )
}
