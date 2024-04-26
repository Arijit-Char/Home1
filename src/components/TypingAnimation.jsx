import TypeIt from "typeit-react";

const TypingAnimation = ({about}) => {
  return (
    <span className="type-it">
      <TypeIt
        options={{
          speed: 200,
          loop: true,
          strings: [about.title],
          breakLines: false,
        }}
      />
    </span>
  );
};
export default TypingAnimation;
