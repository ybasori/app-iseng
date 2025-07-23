import Navbar from "../../molecules/Navbar/Navbar";

const TemplateLoggedIn: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <Navbar />
      {children}
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

export default TemplateLoggedIn;
