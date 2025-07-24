import Link from "@src/components/atoms/Link/Link";
import Navbar from "../../molecules/Navbar/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "@src/_states/types";

const TemplateDashboard: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const route = useSelector((state: RootState) => state.route);
  return (
    <>
      <Navbar />

      <>
        <div className="container is-fluid">
          <div className="columns">
            <div className="column is-one-fifth">
              <div className="card">
                <div className="card-content">
                  <aside className="menu">
                    <p className="menu-label">General</p>
                    <ul className="menu-list">
                      <li>
                        <Link to="/dashboard">Dashboard</Link>
                      </li>
                      <li>
                        <a>Customers</a>
                      </li>
                      <li>
                        <Link to="/dashboard/blog" className="is-active">
                          Blog
                        </Link>
                        <ul>
                          <li>
                            <Link to="/dashboard/blog">Main</Link>
                          </li>
                          <li>
                            <Link to="/dashboard/blog/content">Contents</Link>
                          </li>
                          <li>
                            <Link to="/dashboard/blog/category">
                              Categories
                            </Link>
                          </li>
                          <li>
                            <Link to="/dashboard/blog/tag">Tags</Link>
                          </li>
                          <li>
                            <Link to="/dashboard/blog/comment">Comment</Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </aside>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="container">
                <nav className="breadcrumb is-small" aria-label="breadcrumbs">
                  <ul>
                    <li>
                      <a href="#">Bulma</a>
                    </li>
                    <li>
                      <a href="#">Documentation</a>
                    </li>
                    <li>
                      <a href="#">Components</a>
                    </li>
                    <li className="is-active">
                      <a href="#" aria-current="page">
                        Breadcrumb
                      </a>
                    </li>
                  </ul>
                </nav>

                <div className="card">
                  <header className="card-header">
                    <p className="card-header-title">{route.name}</p>
                    {/* <button className="card-header-icon" aria-label="more options">
                  <span className="icon">
                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button> */}
                  </header>
                  <div className="card-content">
                    <div className="content">{children}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>

      <footer className="footer">
        <div className="content has-text-centered">
          <p>
            <strong>Webivert</strong> by{" "}
            <a href="https://jgthms.com">Yusuf Basori</a>.
          </p>
        </div>
      </footer>
    </>
  );
};

export default TemplateDashboard;
