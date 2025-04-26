
//now we can pass any css properties that we want
import React from "react";
import Button from "../components/button";

export default function page() {
  return (
    <div>
      {" "}
      <Button
        borderRadius={{
          topLeft: 10,
          topRight: 20, 
          bottomLeft: 30,
          bottomRight: 40,
        }}
        backgroundColor="yellow"
      />
    </div>
  );
}


//part6
{/*
//now we can pass any css properties that we want
import React from "react";
import Button from "../components/button";

export default function page() {
  return (
    <div>
      {" "}
      <Button
        style={{
          backgroundColor: "yellow",
          fontSize: 40,
          // textColor: "white", //this is not a valid css property
          color: "white", //this is a valid css property
          padding: "10px 20px", 
          borderRadius: "5px", 
          // borderColor: 5,//if we pass a number instead of string it will give us an error because the css properties will specify that you need to pass a string

        }}
      />
    </div>
  );
}
   */}

//part5
{/*
  import React from "react";
import Button from "../components/button";

export default function page() {
  return (
    <div>
      {" "}
      <Button
        style={{
          backgroundColor: "yellow",
          fontSize: 40,
          textColor: "white",
        }}
      />
    </div>
  );
}
  */}




//part4,part3
{
  /*
import React from "react";
import Button from "../components/button";

export default function page() {
  return (
    <div>
      {" "}
      <Button
        backgroundColor="yellow"
        fontSize={30}
        textColor="green"
        padding={[5, 10, 20, 50]}
      />
    </div>
  );
}
   */
}


//part1,part2
{/*
  import React from "react";
import Button from "../components/button";

export default function page() {
  return (
    <div>
      {" "}
      <Button
        backgroundColor="yellow"
        fontSize={30}
      />
    </div>
  );
}
  */}