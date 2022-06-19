export default function ButtonConnect({ className, icon, title }) {
  return (
    <center>
      <div className={`home-btn-wrapper ${className}`}>
        <div>
          <img
            src={icon}
            alt=""
            height="30px"
            style={{ margin: "0" }}
          />
        </div>
        <p>{title}</p>
      </div>
    </center>
  );
}
