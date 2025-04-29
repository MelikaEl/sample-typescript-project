"use client";

//part 19 , 20
{
  /*import React from "react";
import SuperButton from "../components/button";


export default function page() {
 
  return (
    <div>
      {" "}
      <SuperButton type="submit" size="large" autoFocus={true}/>
    </div>
  );
}
*/
}

//part 18
{
  /*import React from "react";
import Button from "../components/button";


export default function page() {
 
  return (
    <div>
      {" "}
      <Button variant="secondary" type="submit" autoFocus={true} disabled={false} name="button" title="click me"/>
    </div>
  );
}
  */
}

//part 17
{
  /*import React, { useRef } from "react";
import Button from "../components/button";

export default function MyComponent() {
  const buttonRef = useRef<HTMLButtonElement>(null);
//   Creates a ref object called buttonRef.
// The type <HTMLButtonElement> tells TypeScript that this ref will point to a DOM <button> element.
// The initial value is null because the button isn't mounted yet.

  const handleClick = () => {
    if (buttonRef.current) {
      buttonRef.current.focus(); // Focus the button
    }
  };
//   Defines a function handleClick.
// When invoked, it checks if buttonRef.current exists (i.e., the button is mounted).
// If so, it calls .focus() on the button DOM node, moving keyboard focus to it.

  return (
    <div style={{ padding: "20px" }}>
    
      <Button ref={buttonRef} onClick={handleClick} style={{ padding: "10px 20px" }}>
        Click to focus me
      </Button>

      
      <p>Click the button, then see the focus outline appear.</p>

    
      <style>
        {`
          
          button:focus {
            outline: 3px solid blue; 
            outline-offset: 4px;
            background-color: #eef;
          }
        `}
      </style>
    </div>
  );
}
  */
}

// part 16;
{
  /*import React from "react";
import Button from "../components/button";


export default function page() {
 
  return (
    <div>
      {" "}
      <Button type="submit" autoFocus={true} disabled={false} name="button" title="click me"/>
    </div>
  );
}
  */
}

//part 15
//use the default attributes
{
  /*import React from "react";
import Button from "../components/button";


export default function page() {
 
  return (
    <div>
      {" "}
      <Button type="submit" autoFocus={true}/>
    </div>
  );
}*/
}

//part 12
// 'use client';
// import { useState } from 'react';
// import Button from '../components/button';

// export default function Home() {
//   const [count, setCount] = useState<number>(0);

//   return (
//     <main>
//       <h1 className="text-2xl text-center mb-4">Count: {count}</h1>
//       <Button setCount={setCount} />
//     </main>
//   );
// }

//part 11

// import React from "react";
// import Button from "../components/button";

// export default function page() {
//   return (
//     <div>
//       {" "}
{
  /* <Button>
        <div></div>
      </Button> */
}
{
  /* <Button><span>Click me!!!</span></Button> */
}
{
  /* <Button><i></i></Button> */
}
{
  /* <Button>click</Button> */
}
{
  /*it throws error because of the text is string not a jsx element */
}
//     </div>
//   );
// }

//part10
// import React from "react";
// import Button from "../components/button";

// export default function page() {
//    const icon = <i></i>;

//   return (
//     <div>
//       {" "}
//       {/* <Button>Click me!!!</Button> */}
//        {/* <Button><></></Button> */}

// {
//   /*it gives jsx element and t doesn't throw any error because it is the type of react.node */
// }
// {
//   /* <Button><div></div></Button> */
// }
// {
//   /* it accepts JSX element because of react.node*/
// }
// {
//   /* <Button><span>Click me!!!</span></Button> */
// }
// {
//    <Button>{icon}</Button>
// }
// {
//   /*it accepts JSX element because of react.node */
// }

//      </div>
//    );
//  }

//part9
//onClick function
// import React from "react";
// import Button from "../components/button";

// export default function page() {
//   const onClick = () => {
//     console.log("Button clicked");
//   };
//   return (
//     <div>
//       {" "}
//       <Button
//         onClick={onClick}
//       />
//     </div>
//   );
// }

//part8
//now we can pass any css properties that we want
// import React from "react";
// import Button from "../components/button";

// export default function page() {
//   return (
//     <div>
//       {" "}
//       <Button
//         borderRadius={{
//           topLeft: 10,
//           topRight: 20,
//           bottomLeft: 30,
//           bottomRight: 40,
//         }}
//         backgroundColor="yellow"
//       />
//     </div>
//   );
// }

//part7
//now we can pass any css properties that we want
// import React from "react";
// import Button from "../components/button";

// export default function page() {
//   return (
//     <div>
//       {" "}
//       <Button
//         borderRadius={{
//           topLeft: 10,
//           topRight: 20,
//           bottomLeft: 30,
//           bottomRight: 40,
//         }}
//         backgroundColor="yellow"
//       />
//     </div>
//   );
// }

//part6

//now we can pass any css properties that we want
// import React from "react";
// import Button from "../components/button";

// export default function page() {
//   return (
//     <div>
//       {" "}
//       <Button
//         style={{
//           backgroundColor: "yellow",
//           fontSize: 40,
//           // textColor: "white", //this is not a valid css property
//           color: "white", //this is a valid css property
//           padding: "10px 20px",
//           borderRadius: "5px",
//           borderColor: 5,//if we pass a number instead of string it will give us an error because the css properties will specify that you need to pass a string

//         }}
//       />
//     </div>
//   );
// }

//part5

//   import React from "react";
// import Button from "../components/button";

// export default function page() {
//   return (
//     <div>
//       {" "}
//       <Button
//         style={{
//           backgroundColor: "yellow",
//           fontSize: 40,
//           textColor: "white",
//         }}
//       />
//     </div>
//   );
// }

//part4,part3

// import React from "react";
// import Button from "../components/button";

// export default function page() {
//   return (
//     <div>
//       {" "}
//       <Button
//         backgroundColor="yellow"
//         fontSize={30}
//         textColor="green"
//         padding={[5, 10, 20, 50]}
//       />
//     </div>
//   );
// }

//part1,part2

//   import React from "react";
// import Button from "../components/button";

// export default function page() {
//   return (
//     <div>
//       {" "}
//       <Button
//         backgroundColor="yellow"
//         fontSize={30}
//       />
//     </div>
//   );
// }
