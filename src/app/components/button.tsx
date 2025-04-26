//if we want one prop for border radius
import React from "react";

type ButtonProps = {
  borderRadius: {
    topLeft: number;
    topRight: number;
    bottomLeft: number;
    bottomRight: number;
  };

  backgroundColor: string;
};

export default function Button({ borderRadius,backgroundColor }: ButtonProps) {
  //style object as a prop
  return (
    <div className="flex justify-center items-center h-screen">
      <button
        style={{
          borderRadius: `${borderRadius.topLeft}px ${borderRadius.topRight}px ${borderRadius.bottomLeft}px ${borderRadius.bottomRight}px`, backgroundColor
        }}
      >
        Click me
      </button>
    </div>
  );
}

//part6
{
  /*
  //if we have hundred of properties, defining them like part 5 is so time consuming. So we use some types that we get from react: React.CSSProperties
import React from "react";

type ButtonProps = {
  style: React.CSSProperties; //react specify object for us
  };

export default function Button({ style }: ButtonProps) { //style object as a prop
  return (
    <div className="flex justify-center items-center h-screen">
      <button
        style={style}
      >
        Click me
      </button>
    </div>
  );
}
  */
}

//part5
{
  /*
  import React from "react";

type ButtonProps = {
  style:{
  backgroundColor: string;
  fontSize: number;
  textColor: string;
}};

export default function Button({ style }: ButtonProps) { //style object as a prop
  return (
    <div className="flex justify-center items-center h-screen">
      <button
        style={style}
      >
        Click me
      </button>
    </div>
  );
}
  */
}

//part4
{
  /*
  import React from "react";

type Color = "red" | "blue" | "green" | "yellow" | "purple";

type ButtonProps = {
  backgroundColor: Color;
  textColor: Color;
  fontSize: number;
  padding: [number, number, number, number]; // Tuple of 4 numbers
};

export default function Button(props: ButtonProps) {
  return (
    <div className="flex justify-center items-center h-screen">
      <button
        style={{
          backgroundColor: props.backgroundColor,
          color: props.textColor,
          fontSize: `${props.fontSize}px`,
          padding: `${props.padding[0]}px ${props.padding[1]}px ${props.padding[2]}px ${props.padding[3]}px`,
        }}
        className="hover:bg-opacity-80 focus:ring-4 focus:ring-blue-300 rounded-lg focus:outline-none"
      >
        Click me
      </button>
    </div>
  );
}
  */
}

//part3
{
  /*
 import React from "react";

type Color = "red" | "blue" | "green" | "yellow" | "purple";

type ButtonProps = {
  backgroundColor: Color;
  textColor: Color;
  fontSize: number;
  // pillShape?: boolean;
  padding: [number, number, number, number]; //tuple of 4 numbers
  // padding: number[]; //array of numbers: by this way we can pass any number of padding values but just we want 4 values
};

export default function Button({
 
  backgroundColor,
  fontSize,
  // pillShape,
  textColor,
  padding,
}: ButtonProps) {
  return (
    <div className="flex justify-center items-center h-screen">
      <button style={{ backgroundColor:backgroundColor, color: textColor , fontSize:fontSize,padding:`${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px`}} >
        Click me
      </button>
    </div>
  );
}
  */
}

//part2
{
  /*
  import React from "react";

export default function Button({
  backgroundColor,
  fontSize
}: {
  backgroundColor: string;
  fontSize: number;
}) {
  return (
    <div className="flex justify-center items-center h-screen">
      <button style={{ backgroundColor:backgroundColor , fontSize:fontSize}}>
        Click me
      </button>
    </div>
  );
}
  */
}

//part1
{
  /*
import React from "react";

export default function Button(props: {
  backgroundColor: string;
  fontSize: number;
}) {
  const { backgroundColor, fontSize } = props;
  return (
    <div className="flex justify-center items-center h-screen">
      <button style={{ backgroundColor:backgroundColor , fontSize:fontSize}} >
        Click me
      </button>
    </div>
  );
}
    */
}
