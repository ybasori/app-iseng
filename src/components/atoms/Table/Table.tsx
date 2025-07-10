import { useState } from "react";
import { ITable } from "./Table.type";

const Table: React.FC<ITable> = ({ columns, data, loading }) => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const isAllSelected =
    selectedItems.length > 0 &&
    data.length > 0 &&
    selectedItems.length === data.length;

  const handleCheckboxChange = (id: number, isChecked: boolean) => {
    setSelectedItems((prevSelected) => {
      if (isChecked) {
        return [...prevSelected, id];
      } else {
        return prevSelected.filter((item) => item !== id);
      }
    });
  };

  const handleHeaderCheckboxChange = (isChecked: boolean) => {
    if (isChecked) {
      const allIds = data.map((_, index) => index); // Get all row IDs dynamically from data
      setSelectedItems(allIds); // Select all items
    } else {
      setSelectedItems([]); // Deselect all items
    }
  };
  const nestedField = (row: any, field: string) => {
    const splited = field.split(".");
    if (splited.length > 1) {
      let dt = row[splited[0]];

      for (let i = 1; i < splited.length; i++) {
        if (dt[splited[i]]) {
          dt = dt[splited[i]];
        } else {
          dt = null;
          i += splited.length;
        }
      }

      return dt;
    } else {
      return row[field];
    }
  };

  return (
    <>
      <div className="table-container">
        <table className="table is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>
                <label className="checkbox">
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleHeaderCheckboxChange(e.currentTarget.checked)
                    }
                    checked={isAllSelected}
                  />
                </label>
              </th>
              {columns.map((item, key) => (
                <th key={key}>{item.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length}>
                  <i className="fa-solid fa-circle-notch fa-spin"></i>
                </td>
              </tr>
            ) : (
              <>
                {data.map((item, key) => (
                  <tr key={key}>
                    <td>
                      <label className="checkbox">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(key)}
                          onChange={(e) =>
                            handleCheckboxChange(key, e.currentTarget.checked)
                          }
                        />
                      </label>
                    </td>
                    {columns.map((column, key) => (
                      <td key={key}>
                        {!!column.render
                          ? column.render(
                              !!column.field
                                ? nestedField(item, column.field)
                                : null,
                              item
                            )
                          : !!column.field
                          ? nestedField(item, column.field)
                          : null}
                      </td>
                    ))}
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
