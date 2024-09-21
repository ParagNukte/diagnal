/* eslint-disable react/prop-types */


function PosterCard({ posterImage, posterName }) {
  return (
    <div className="flex flex-col aaspect-2/3">
      <img src={`https://test.create.diagnal.com/images/${posterImage}`} />
      <div className="text-white text-sm">{posterName}</div>
    </div>
  );
}

export default PosterCard;
