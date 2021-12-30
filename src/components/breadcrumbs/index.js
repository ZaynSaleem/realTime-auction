const BreadCrumbs = (props) => {
  return (
    <div className="vendor-container-category-wrapper">
      <div className="container-card-wrapper">
        <div className="breadcumbs-text">
          iBid <FaAngleDoubleRight /> {props.title}
        </div>
      </div>
    </div>
  );
};

export default BreadCrumbs;
