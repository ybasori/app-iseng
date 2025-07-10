import Link from "@src/components/atoms/Link/Link";

const Content = () => {
    return <><div className="buttons">
        <label className="checkbox">
          <input type="checkbox" />
        </label>
        <button className="button is-info is-small">Reload</button>
        <Link className="button is-success is-small" to="/dashboard/blog/content/create">Add</Link>
        <button className="button is-danger is-small">Delete</button>
          <div className="select is-small">
            <select>
              <option>With options</option>
              <option>Select dropdown</option>
            </select>
          </div>
      </div>
      
      <div className="table-container">
        <table className="table is-bordered is-fullwidth">
          <tbody>

            <tr>
              <th className="is-link">Link th cell</th>
              <td>Two</td>
              <td className="is-link">Link td cell</td>
              <td>Four</td>
              <td>Five</td>
            </tr>
            <tr className="is-link">
              <th>Link row</th>
              <td>Two</td>
              <td>Three</td>
              <td>Four</td>
              <td>Five</td>
            </tr>

            <tr>
              <th className="is-primary">Primary th cell</th>
              <td>Two</td>
              <td className="is-primary">Primary td cell</td>
              <td>Four</td>
              <td>Five</td>
            </tr>
            <tr className="is-primary">
              <th>Primary row</th>
              <td>Two</td>
              <td>Three</td>
              <td>Four</td>
              <td>Five</td>
            </tr>

            <tr>
              <th className="is-info">Info th cell</th>
              <td>Two</td>
              <td className="is-info">Info td cell</td>
              <td>Four</td>
              <td>Five</td>
            </tr>
            <tr className="is-info">
              <th>Info row</th>
              <td>Two</td>
              <td>Three</td>
              <td>Four</td>
              <td>Five</td>
            </tr>

            <tr>
              <th className="is-success">Success th cell</th>
              <td>Two</td>
              <td className="is-success">Success td cell</td>
              <td>Four</td>
              <td>Five</td>
            </tr>
            <tr className="is-success">
              <th>Success row</th>
              <td>Two</td>
              <td>Three</td>
              <td>Four</td>
              <td>Five</td>
            </tr>

            <tr>
              <th className="is-warning">Warning th cell</th>
              <td>Two</td>
              <td className="is-warning">Warning td cell</td>
              <td>Four</td>
              <td>Five</td>
            </tr>
            <tr className="is-warning">
              <th>Warning row</th>
              <td>Two</td>
              <td>Three</td>
              <td>Four</td>
              <td>Five</td>
            </tr>

            <tr>
              <th className="is-danger">Danger th cell</th>
              <td>Two</td>
              <td className="is-danger">Danger td cell</td>
              <td>Four</td>
              <td>Five</td>
            </tr>
            <tr className="is-danger">
              <th>Danger row</th>
              <td>Two</td>
              <td>Three</td>
              <td>Four</td>
              <td>Five</td>
            </tr>

          </tbody>
        </table>
      </div>
      
      <nav className="pagination is-centered is-small" role="navigation" aria-label="pagination">
        <a href="#" className="pagination-previous">Previous</a>
        <a href="#" className="pagination-next">Next page</a>
        <ul className="pagination-list">
          <li><a href="#" className="pagination-link" aria-label="Goto page 1">1</a></li>
          <li><span className="pagination-ellipsis">&hellip;</span></li>
          <li><a href="#" className="pagination-link" aria-label="Goto page 45">45</a></li>
          <li>
            <a
              className="pagination-link is-current"
              aria-label="Page 46"
              aria-current="page"
            >46</a>
          </li>
          <li><a href="#" className="pagination-link" aria-label="Goto page 47">47</a></li>
          <li><span className="pagination-ellipsis">&hellip;</span></li>
          <li><a href="#" className="pagination-link" aria-label="Goto page 86">86</a></li>
        </ul>
      </nav></>
}

export default Content;