
//part 15
//use the default attributes
import React from "react";
import Button from "../components/button";


export default function page() {
 
  return (
    <div>
      {" "}
      <Button type="submit" autoFocus={true}/>
    </div>
  );
}







//part 12
{/*'use client';
import { useState } from 'react';
import Button from '../components/button';

export default function Home() {
  const [count, setCount] = useState<number>(0);
  
  return (
    <main>
      <h1 className="text-2xl text-center mb-4">Count: {count}</h1>
      <Button setCount={setCount} />
    </main>
  );
}*/}

//part 11
{
  /*
import React from "react";
import Button from "../components/button";


export default function page() {
 
  return (
    <div>
      {" "}
      <Button><div></div></Button>
      {/* <Button><span>Click me!!!</span></Button> */
}
{
  /* <Button><i></i></Button> */
}
{
  /* <Button>click</Button>*/
}
{
  /*it throws error because of the text is string not a jsx element */
}
// </div>
// )}

//part10
{
  /*import React from "react";
import Button from "../components/button";


export default function page() {
  // const icon = <i></i>;
 
  return (
    <div>
      {" "}
      <Button>Click me!!!</Button>
      {/* <Button><></></Button>*/
}
{
  /*it gives jsx element and t doesn't throw any error because it is the type of react.node */
}
{
  /* <Button><div></div></Button> */
}
{
  /* it accepts JSX element because of react.node*/
}
{
  /* <Button><span>Click me!!!</span></Button> */
}
{
  /* <Button>{icon}</Button>*/
}
{
  /*it accepts JSX element because of react.node */
}

//     </div>
//   );
// }

{
  /*"use client";
//part9
//onClick function
import React from "react";
import Button from "../components/button";


export default function page() {
  const onClick = () => {
    console.log("Button clicked");
  };
  return (
    <div>
      {" "}
      <Button
        onClick={onClick}
      />
    </div>
  );
}
  */
}

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
