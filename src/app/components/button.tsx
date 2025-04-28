//from part 15

//part 17
//when we hover on the ComponentProps, it says that it's better to use the "ComponentPropsWithRef" or "ComponentPropsWithoutRef" instead of "ComponentProps". In the part 16 , is better to use the "ComponentPropsWithoutRef"
import React, { forwardRef, ComponentPropsWithRef } from "react";

type ButtonProps = ComponentPropsWithRef<"button">;

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  <button ref={ref} {...props} />
));
Button.displayName = 'Button';
export default Button;





//part 16
//if we have hundreds of these attributes, and we don't want to pass all of them individually one by one, so we can use a helper type called Component.Props and in the <> (anchor tag) we define which element it should be. In TypeScript, you can use the ComponentProps utility type from React to get the props type of a specific component or element, such as a <button>.
{
  /*import React, { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> // now we can accept all the attributes that the button element accepts
// type ButtonProps = ComponentProps<"a"> //for a tag



export default function Button(props: ButtonProps) {
  return (
    <div className="flex justify-center items-center h-screen">
      <button {...props}>
        Click Me!
       </button>
    </div>
  );
}*/
}

//part 15
// use the default attributes

{
  /*import React from "react";

type ButtonProps = {
  type?: "button" | "submit" | "reset"; //default value is button
  autoFocus?: boolean; //default value is false
};

export default function Button({ type, autoFocus }: ButtonProps) {//we need to pass these attributes as props
  return (
    <div className="flex justify-center items-center h-screen">
      <button type={type} autoFocus={autoFocus}>
        Click Me!
      </button>
    </div>
  );
}
  */
}

//part14
//difference between interface and type alias
// import React from "react";

//In both type and interface, we can define the shape of an object.

// type ButtonProps = {
//   text:string;
//   count:number;
// };

// interface ButtonProps {
//   text: string; //text prop
//   count: number; //count prop
// }

//with interface you can only define objects. For example in this URL example, we can't use the interface
// type  URL = string;
// const url : URL = 'https://example.com';

//you can define union types just with type alias not interface
//  type Color = "red" | "blue" | "green" | "yellow" | "purple";

// export default function Button(props: ButtonProps) {
//   return (
//     <div className="flex justify-center items-center h-screen">
//       <button>click me</button>
//     </div>
//   );
// }

//part13
//you can have prop with defaqult value and we don't need to give it type, because when you hover on that typescript caqn infer the type of the prop. If you have default values, you don't need to specify the type
{
  /*import React from 'react'

export default function button({count=0}) {
  return (
    <div>button</div>
  )
}
*/
}

//part 12
// The Dispatch<React.SetStateAction<number>> type in your code is a TypeScript type that describes the signature of a state-updating function returned by the useState hook in React.
// The Dispatch<React.SetStateAction<number>> type ensures that the setCount function is used correctly. It explicitly defines what kinds of arguments setCount can accept:

// A value of type number.
// Or a function that takes the current state (number) and returns a new state (number). For example: setCount((prevCount) => prevCount + 1).
// Without this type, TypeScript wouldn't know whether setCount accepts a value, a function, or both. Using Dispatch<React.SetStateAction<number>> provides clarity and prevents invalid usage.

// import React, { Dispatch } from "react";

// type ButtonProps = {
//   setCount: Dispatch<React.SetStateAction<number>>; //when we hover on useState in page file it shows us the type of setCount is Dispatch<React.SetStateAction<number>>
// };

// export default function Button({ setCount }: ButtonProps) {
//   return (
//     <div className="flex justify-center items-center gap-4">
//       <button
//         className="px-4 py-2 bg-red-500 text-white rounded"
//         onClick={() => setCount(0)}
//       >
//         Reset to 0
//       </button>

//       <button
//         className="px-4 py-2 bg-blue-500 text-white rounded"
//         onClick={() => setCount(prev => prev + 1)}
//       >
//         Increment
//       </button>

//       <button
//         className="px-4 py-2 bg-green-500 text-white rounded"
//         onClick={() => setCount(prev => prev - 1)}
//       >
//         Decrement
//       </button>

//       <button
//         className="px-4 py-2 bg-purple-500 text-white rounded"
//         onClick={() => setCount(100)}
//       >
//         Set to 100
//       </button>
//     </div>
//   );
// }

//part11
//JSX.Element is a TypeScript type that represents a valid JSX element (e.g., <div>, <span>, or custom components).

// import React from "react";

// type ButtonProps = {
//   children: React.JSX.Element; //children prop
// };

// export default function Button({children}:ButtonProps) {
//   return (
//     <div className="flex justify-center items-center h-screen">
//       <button>{children}</button>
//     </div>
//   );
// }

//part10
// a. Children Prop
// The children prop is a built-in feature of React that allows you to pass content (text, elements, or components) between the opening and closing tags of a component.
// In this example, the children prop is used to dynamically render the content inside the <button> element.

// Using React.ReactNode for the children prop ensures that the component can accept any valid React content.
// React.ReactNode is a TypeScript type that represents any valid content that can be rendered inside a React component. This includes:
// Strings ("Click me"),
// Numbers (42),
// JSX elements (<span>Click me</span>),
// Arrays of these types,
// Or even null or undefined.

// import React from "react";

// type ButtonProps = {
//   children: React.ReactNode; //children prop
// };

// export default function Button({children}:ButtonProps) {
//   return (
//     <div className="flex justify-center items-center h-screen">
//       <button>{children}</button>
//     </div>
//   );
// }

//part9
//onClick function
// import React from "react";

// type ButtonProps = {
//   onClick: () => void; //onClick function
// };

// export default function Button({ onClick }: ButtonProps) {
//   return (
//     <div className="flex justify-center items-center h-screen">
//       <button
//         onClick={onClick}
//       >
//         Click me
//       </button>
//     </div>
//   );
// }

//part 8
//if we want one prop for border radius
// import React from "react";

// type ButtonProps = {
//   borderRadius: Record<string, number>; // Record<string, number> allows us to pass any number of properties with string keys and number values

//   backgroundColor: string;
// };

// export default function Button({ borderRadius,backgroundColor }: ButtonProps) {
//   //style object as a prop
//   return (
//     <div className="flex justify-center items-center h-screen">
//       <button
//         style={{
//           borderRadius: `${borderRadius.topLeft}px ${borderRadius.topRight}px ${borderRadius.bottomLeft}px ${borderRadius.bottomRight}px`, backgroundColor
//         }}
//       >
//         Click me
//       </button>
//     </div>
//   );
// }

//part7
// if we want one prop for border radius
// import React from "react";

// type ButtonProps = {
//   borderRadius: {
//     topLeft: number;
//     topRight: number;
//     bottomLeft: number;
//     bottomRight: number;
//   };

//   backgroundColor: string;
// };

// export default function Button({ borderRadius,backgroundColor }: ButtonProps) {
//   //style object as a prop
//   return (
//     <div className="flex justify-center items-center h-screen">
//       <button
//         style={{
//           borderRadius: `${borderRadius.topLeft}px ${borderRadius.topRight}px ${borderRadius.bottomLeft}px ${borderRadius.bottomRight}px`, backgroundColor
//         }}
//       >
//         Click me
//       </button>
//     </div>
//   );
// }

//part6

//if we have hundred of properties, defining them like part 5 is so time consuming. So we use some types that we get from react: React.CSSProperties
// import React from "react";

// type ButtonProps = {
//   style: React.CSSProperties; //react specify object for us
//   };

// export default function Button({ style }: ButtonProps) { //style object as a prop
//   return (
//     <div className="flex justify-center items-center h-screen">
//       <button
//         style={style}
//       >
//         Click me
//       </button>
//     </div>
//   );
// }

//part5

//   import React from "react";

// type ButtonProps = {
//   style:{
//   backgroundColor: string;
//   fontSize: number;
//   textColor: string;
// }};

// export default function Button({ style }: ButtonProps) { //style object as a prop
//   return (
//     <div className="flex justify-center items-center h-screen">
//       <button
//         style={style}
//       >
//         Click me
//       </button>
//     </div>
//   );
// }

//part4

//   import React from "react";

// type Color = "red" | "blue" | "green" | "yellow" | "purple";

// type ButtonProps = {
//   backgroundColor: Color;
//   textColor: Color;
//   fontSize: number;
//   padding: [number, number, number, number]; // Tuple of 4 numbers
// };

// export default function Button(props: ButtonProps) {
//   return (
//     <div className="flex justify-center items-center h-screen">
//       <button
//         style={{
//           backgroundColor: props.backgroundColor,
//           color: props.textColor,
//           fontSize: `${props.fontSize}px`,
//           padding: `${props.padding[0]}px ${props.padding[1]}px ${props.padding[2]}px ${props.padding[3]}px`,
//         }}
//         className="hover:bg-opacity-80 focus:ring-4 focus:ring-blue-300 rounded-lg focus:outline-none"
//       >
//         Click me
//       </button>
//     </div>
//   );
// }

//part3

//  import React from "react";

// type Color = "red" | "blue" | "green" | "yellow" | "purple";

// type ButtonProps = {
//   backgroundColor: Color;
//   textColor: Color;
//   fontSize: number;
//   // pillShape?: boolean;
//   padding: [number, number, number, number]; //tuple of 4 numbers
//   // padding: number[]; //array of numbers: by this way we can pass any number of padding values but just we want 4 values
// };

// export default function Button({

//   backgroundColor,
//   fontSize,
//   // pillShape,
//   textColor,
//   padding,
// }: ButtonProps) {
//   return (
//     <div className="flex justify-center items-center h-screen">
//       <button style={{ backgroundColor:backgroundColor, color: textColor , fontSize:fontSize,padding:`${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px`}} >
//         Click me
//       </button>
//     </div>
//   );
// }

//part2

//   import React from "react";

// export default function Button({
//   backgroundColor,
//   fontSize
// }: {
//   backgroundColor: string;
//   fontSize: number;
// }) {
//   return (
//     <div className="flex justify-center items-center h-screen">
//       <button style={{ backgroundColor:backgroundColor , fontSize:fontSize}}>
//         Click me
//       </button>
//     </div>
//   );
// }

//part1

// import React from "react";

// export default function Button(props: {
//   backgroundColor: string;
//   fontSize: number;
// }) {
//   const { backgroundColor, fontSize } = props;
//   return (
//     <div className="flex justify-center items-center h-screen">
//       <button style={{ backgroundColor:backgroundColor , fontSize:fontSize}} >
//         Click me
//       </button>
//     </div>
//   );
// }
