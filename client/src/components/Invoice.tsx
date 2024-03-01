import React, { useState } from "react";

interface ProductType {
  id: number;
  productName: string;
  quantity: number;
  rate: number;
  total: number;
}

const Invoice: React.FC = () => {
  const [items, setItems] = useState<ProductType[]>([
    {
      id: 1,
      productName: 'Apple MacBook Pro 17"',
      quantity: 1,
      rate: 2999,
      total: 2999,
    },
    // Add more items as needed
  ]);

  const handleInputChange = (
    index: number,
    fieldName: keyof ProductType,
    value: string | number,
  ) => {
    const updatedItems = [...items];
    updatedItems[index][fieldName] = value;
    setItems(updatedItems);
  };

  const handleAddItem = () => {
    setItems((prevItems) => [
      ...prevItems,
      {
        id: prevItems.length + 1,
        productName: "",
        quantity: 0,
        rate: 0,
        total: 0,
      },
    ]);
  };
  const calculateGrandTotal = () => {
    const total = items.reduce((acc, item) => acc + item.total, 0);
    const gst = (total * 0.18).toFixed(2); // Assuming 18% GST, adjust as needed
    const grandTotal = (total + parseFloat(gst)).toFixed(2);
    return { total, gst, grandTotal };
  };

  const { total, gst, grandTotal } = calculateGrandTotal();
  return (
    <>
      <div className="flex items-center justify-between mx-10">
        <h1 className="text-4xl font-bold text-center text-indigo-800 mb-8">
          Invoice Generator
        </h1>
        <img
          className="w-25 h-20 mr-10"
          src="https://levitation.in/wp-content/uploads/2023/04/levitation-Infotech.png"
          alt="logo"
        />
      </div>
      <div className="flex flex-col items-center justify-between px-6 py-8 mt-20 mx-auto md:h-screen lg:py-0">
        <table className="relative w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Rate
              </th>
              <th scope="col" className="px-6 py-3">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="max-h-80 overflow-y-auto">
            {items.map((item, index) => (
              <tr
                key={item.id}
                className="border-b border-gray-200 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                >
                  <input
                    className="border-none focus:outline-none w-full bg-gray-100 dark:bg-gray-700 p-2 rounded"
                    type="text"
                    value={item.productName}
                    onChange={(e) =>
                      handleInputChange(index, "productName", e.target.value)
                    }
                  />
                </th>
                <td className="px-6 py-4">
                  <input
                    className="border-none focus:outline-none w-full  p-2 rounded"
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "quantity",
                        parseInt(e.target.value, 10),
                      )
                    }
                  />
                </td>
                <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                  <input
                    className="border-none focus:outline-none w-full bg-gray-100 dark:bg-gray-700 p-2 rounded"
                    type="number"
                    value={item.rate}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "rate",
                        parseInt(e.target.value, 10),
                      )
                    }
                  />
                </td>
                <td className="px-6 py-4">{item.total}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td
                colSpan={3}
                className="text-right px-6 py-3 bg-gray-50 dark:bg-gray-800"
              >
                Total
              </td>
              <td className="px-6 py-3">{total}</td>
            </tr>
            <tr>
              <td
                colSpan={3}
                className="text-right px-6 py-3 bg-gray-50 dark:bg-gray-800"
              >
                GST (18%)
              </td>
              <td className="px-6 py-3">{gst}</td>
            </tr>
            <tr>
              <td
                colSpan={3}
                className="text-right px-6 py-3 bg-gray-50 dark:bg-gray-800"
              >
                Grand Total
              </td>
              <td className="px-6 py-3">{grandTotal}</td>
            </tr>
          </tfoot>
          <div className="absolute top-1/15 left-1/2 mt-10 transform -translate-x-1/2 -translate-y-1/2">
            <img
              width="40"
              height="40"
              src="https://img.icons8.com/ultraviolet/40/plus--v1.png"
              alt="plus--v1"
              onClick={handleAddItem}
            />
          </div>
        </table>
      </div>
    </>
  );
};

export default Invoice;
