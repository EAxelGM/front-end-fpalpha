const Card = ({ title, content, icon, color }) => {
  return (
    <div className="w-full">
      <div className=" shadow-md p-3 rounded-lg ">
        <div className="flex gap-3 items-center">
          <div className="text-[30px]" style={{ color: color }}>
            {icon}
          </div>
          <div>
            <h2 className="text-lg">{title}</h2>
          </div>
        </div>
        <div className="text-[50px] text-center">{content}</div>
      </div>
    </div>
  );
};

export default Card;
