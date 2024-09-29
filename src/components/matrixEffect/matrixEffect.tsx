import React, {useState} from "react";


const generateSequence = (): Array<number> => {
  let qty = Math.ceil(Math.random() * 10 + 6);
  return Array.from({ length: qty }, () => Math.floor(Math.random()*2));
};

export default function MatrixEffect() {
  const [sequence, _] = useState(generateSequence());  

  return (
    <div>
      {sequence.map((el: number) => (
        <p
          className="text-emerald-700 -my-2 px-1"
          style={{
            textShadow: "0 0 6px green",
          }}
        >
          {el}
        </p>
      ))}
    </div>
  );
}
