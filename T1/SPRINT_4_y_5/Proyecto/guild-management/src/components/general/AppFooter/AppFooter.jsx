import "./AppFooter.css";

export const AppFooter = () => {
    return (
        <div className="footer">
            © {new Date().getFullYear()} Developed with React
        </div>
    );
};