import "./directory-item.style.scss";

const DirectoryItem = ({ category }) => {
  const { imageUrl, title } = category;
  console.log(imageUrl);
  return (
    <div className="directory-item-container">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>
      <div className="body">
        <h1>{title}</h1>
        <p>Shop Now</p>
      </div>
    </div>
  );
};
export default DirectoryItem;
