const Banner = (props) => {
  return (
    <div className="relative mb-16">
      <img
        src="src\assets\banner1.jpg"
        alt="banner"
        className="mx-auto w-4/5"
      />
      <div className="absolute left-60 top-24">
        <p className="pb-3 uppercase italic tracking-widest text-slate-400">
          new inspiration 2020
        </p>
        <p className="pb-3 text-3xl font-normal uppercase italic">
          20% off on new <br /> season
        </p>
        <button
          onClick={props.onClick}
          className="bg-slate-800 px-4 py-2 text-lg font-light italic text-slate-200"
        >
          Browse collections
        </button>
      </div>
    </div>
  );
};

export default Banner;
