// from part 42

//part 46
//Template Union Types
type SupportedLangs = "en" | "pt" | "zh";
type FooterLocaleIDs = "header" | "footer";

type AllLocaleIDs = `${SupportedLangs}_${FooterLocaleIDs}`;

//AllLocaleIDs : A new union type generated using a template string:
// The template string ${SupportedLangs}_${FooterLocaleIDs} combines every possible value from SupportedLangs with every possible value from FooterLocaleIDs, separated by an underscore (_).
// The resulting AllLocaleIDs type is:
// "en_header" | "en_footer" | "pt_header" | "pt_footer" | "zh_header" | "zh_footer"

//part 45
//Type from Func Return
{/* 
function createFixtures() {
  return {
    x: 1,
    y: 2,
  };
}

type Fixtures = ReturnType<typeof createFixtures>;

// createFixtures is a function that returns an object with two properties:
// x: number
// y: number
// Using typeof createFixtures, TypeScript infers the type of the function createFixtures.
// The ReturnType utility type extracts the return type of the function. In this case, the return type is:

// {
//   x: number;
//   y: number;
// }

// The resulting type Fixtures is exactly the same as the inferred return type of createFixtures.
*/}

//part 44
{/* 
// Type from Value
// The cheat sheet shows an example of deriving a type from a value:
const data = { small: 1, medium: 2, large: 3 };
type Size = typeof data;

// Explanation:
// data is an object with three properties:
// small: number
// medium: number
// large: number
// Using typeof data, TypeScript infers the type of data as:
// {
//   small: number;
//   medium: number;
//   large: number;
// }

// The resulting type Size is exactly the same as the inferred type of data.
*/}


//part 43
//Type Indexing
//You can use square bracket notation ([]) to access a property by its key and get its type.
{/* 
type Person = {
  name: string;
  age: number;
};

// Get the type of the 'name' property
type NameType = Person["name"]; // string   Here, Person["name"] extracts the type of the name property, which is string.
*/}

//part 42
//Discriminated Union
// Discriminated unions are a powerful pattern in TypeScript that allows you to model values that can be one of several types, with type-safe handling based on a common literal property (called the discriminant ).

// They are especially useful when dealing with state management or data structures where different kinds of data can appear in different forms.

// ✅ Key Concepts
// A discriminated union consists of:

// A common property (usually a string or numeric literal type) used to differentiate between the types.
// Each variant of the union has a different literal value for that discriminant.
// TypeScript uses this discriminant to narrow the type within conditional blocks.

// 🚫 Problem Without Discriminated Unions
// Let’s say we have two types of users: User and Admin.

// ❌ Regular Union (No Discriminant)
{/* 
interface User {
  name: string;
  email: string;
}

interface Admin {
  name: string;
  privileges: string[];
}

type Person = User | Admin;

const ProfileCard = ({ person }: { person: Person }) => {
  return (
    <div>
      <h2>{person.name}</h2>
     
      //  ❌ ERROR: Property 'email' does not exist on type 'Person'. 
      {person.email && <p>Email: {person.email}</p>}
      //  {'email' in person && <p>Email: {person.email}</p>} 

      //  ❌ ERROR: Property 'privileges' does not exist on type 'Person'. 
      {person.privileges && <p>Privileges: {person.privileges.join(', ')}</p>}
    </div>
  );
};

// TypeScript will throw errors because it doesn't know which variant of Person we're working with. You'd have to use type guards , but even then, they’re not always reliable or clean.

// You might try runtime checks like:
if ('email' in person) {   //{'email' in person && <p>Email: {person.email}</p>} 
  // treat as User
}
// But this is fragile and scales poorly if more variants are added later.


// ✅ Solution With Discriminated Unions
// We solve this by adding a common discriminant property — usually called type.

// ✅ Define with Discriminant (type)
interface User {
  type: 'user';
  name: string;
  email: string;
}

interface Admin {
  type: 'admin';
  name: string;
  privileges: string[];
}

type Person = User | Admin;

const ProfileCard = ({ person }: { person: Person }) => {
  return (
    <div>
      <h2>{person.name}</h2>

      {person.type === 'user' && (
        <p>Email: {person.email}</p>
      )}

      {person.type === 'admin' && (
        <p>Privileges: {person.privileges.join(', ')}</p>
      )}
    </div>
  );
};

// ✅ No errors!
// ✅ TypeScript knows exactly what properties are available based on the type.
// ✅ This is safe, scalable, and readable.

//  Why This Matters in React Apps
// In real-world React apps, you often deal with:

// Multiple user roles (e.g., User, Admin)
// Different API response states (loading, success, error)
// Complex form states (editing, submitting, submitted, error)
// UI variations (e.g., different kinds of alerts or cards)
// Using discriminated unions ensures your components behave correctly for each case, and TypeScript helps enforce that correctness.

// 🛠️ Bonus: Exhaustiveness Check
// To make sure you handle all cases, add an exhaustiveness check using never:

function logPersonDetails(person: Person) {
  switch (person.type) {
    case 'user':
      console.log('User:', person.email);
      break;
    case 'admin':
      console.log('Admin:', person.privileges);
      break;
    default:
      const _exhaustiveCheck: never = person;
      return _exhaustiveCheck;
  }
}

// If you add another type to Person without updating this function, TypeScript will warn you!
*/}



//part 41
{/* 
//Assertion Functions: TypeScript assertion functions (also known as type assertion functions ) are a powerful tool in TypeScript that allow you to force the type system to treat a value as a specific type , and if it’s not, throw an error at runtime . For exampled for Validating data from API responses. 
function assertIsString(value: any): asserts value is string {
  if (typeof value !== 'string') {
    throw new Error('Not a string!');
  }
}

//  Validate API Response
// You might fetch data from an API, and want to make sure the structure is correct before proceeding.
interface User {
  id: number;
  name: string;
}

function assertIsUser(data: any): asserts data is User {
  if (!data || typeof data.id !== 'number' || typeof data.name !== 'string') {
    throw new Error('Invalid user data');
  }
}

// Then in a React component:
useEffect(() => {
  fetch('/api/user')
    .then(res => res.json())
    .then(data => {
      assertIsUser(data); // Ensures data is of type User
      setUser(data);
    });
}, []);
// If the data doesn’t match the expected shape, an error is thrown at run time


// TypeScript primarily does its job at compile time — it helps you catch type-related bugs before your code runs.
// However, once your code is compiled to JavaScript, there’s no more type checking unless you add runtime checks .
// That’s where:
// Assertion functions
// Runtime validation libraries like Zod or Yup
// come into play.

//  How Do We Validate Types at Runtime?
// There are two common approaches:

// 1. TypeScript Assertion Functions
// These are handwritten functions that throw errors if a value doesn’t match a type.

function assertIsString(value: any): asserts value is string {
  if (typeof value !== 'string') {
    throw new Error('Expected a string');
  }
}
const data = JSON.parse('{ "name": 123 }');
assertIsString(data.name); // Will throw error at runtime



// 2. Runtime Validation Libraries (like Zod, Yup, Joi)
// These are full-featured libraries designed specifically for schema-based validation at runtime .

// Example with Zod:
import { z } from 'zod';

const UserSchema = z.object({
  name: z.string(),
});

type User = z.infer<typeof UserSchema>;

function validateUser(data: unknown): User {
  return UserSchema.parse(data);
}

const data = JSON.parse('{ "name": 123 }');
const user = validateUser(data); // Throws error if invalid

// When Should You Use Each?
// Scenario                                       Recommended Tool

// Small project / simple check                   Assertion functions
// Complex app with many APIs                     Zod
// Backend validation + frontend types            Zod
// Quick null/undefined check                     Assertion function (assertNotNullish)
// Form validation                                Zod


//  Concept                                          Description
// TypeScript                                   Catches type issues at compile time
// Assertion Functions                          Manually enforce types at runtime
// Zod / Yup                                    Automatically validate complex types at runtime, with rich tooling
// Best Practice                                Use Zod for robust apps, assertion functions for small cases
*/}



//part 40
{/* 
//if statement (The Three Patterns Shown)
// 1. typeof Type Guards (for primitives)
const input = getUserInput();  // input: string | number

if (typeof input === "string") {
    // Within this block, TypeScript knows input must be string
    input;  // type: string
}
// Works with JavaScript's typeof operator
// Checks primitive types: "string", "number", "boolean", "symbol", "undefined", "object", "function"
// After the check, TypeScript narrows the type within the block

//2. "property" in object Checks (for objects)
const input = getUserInput();  // input: string | { error: ... }

// type ApiResponse = 
//   | { data: string; timestamp: number }  // Success case
//   | { error: { message: string; code: number }; status: "failed" }; // Error case

if ("error" in input) {
    // the error is object
    input;  // type: { error: ... }
}
// Checks for property existence in objects
// Useful when you have object types with different properties

//3. Type Guard Functions (for custom checks)

Type Guard Functions (for custom checks)
typescript
const input = getUserInput();  // input: number | number[]

if (Array.isArray(input)) {
    // Within this block, TypeScript knows input must be an array
    input;  // type: number[]
}

Uses functions that return type predicates (val is Type)
TypeScript understands many built-in guards like Array.isArray()
You can write your own custom type guards


// Type Guard Functions in TypeScript: Advanced Examples
// Type guard functions are custom functions that perform runtime checks and tell TypeScript to narrow types. They must return a type predicate in the form value is Type.
// Basic Structure
function isType(value: any): value is SpecificType {
  // return boolean
}
// 1. Basic Type Guard
interface Cat {
  meow(): void;
}
interface Dog {
  bark(): void;
}

function isCat(animal: Cat | Dog): animal is Cat {
  return 'meow' in animal;
}

function handleAnimal(animal: Cat | Dog) {
  if (isCat(animal)) {
    animal.meow(); // TypeScript knows it's a Cat
  } else {
    animal.bark(); // TypeScript knows it's a Dog
  }
}

*/}
//part 39
// Mapped Types in TypeScript

// Mapped types are a powerful TypeScript feature that allows you to create new types by transforming properties of existing types. They work similarly to how `map` works for arrays, but for object types.

// Basic Syntax

// The basic syntax for a mapped type is:

{/*
type NewType = {
  [Property in ExistingType]: NewValueType;
};

//  4. Changing Property Types


type Stringify<T> = {
  [P in keyof T]: string; //This is a generic mapped type that transforms all properties of type T to have type string.
};

interface Person {
  name: string;
  age: number;
  isAdmin: boolean;
}

type StringifiedPerson = Stringify<Person>;

// The resulting StringifiedPerson type would be equivalent to:
// {
//   name: string;    // was string, remains string
//   age: string;     // was number, now string
//   isAdmin: string; // was boolean, now string
// }

// Common Use Cases

//  1. Making All Properties Optional


type Partial<T> = {
  [P in keyof T]?: T[P];
};

//  2. Making All Properties Required


type Required<T> = {
  [P in keyof T]-?: T[P];
};


// 3. Making All Properties Readonly


type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};



//  Built-in Mapped Types

// TypeScript includes several useful mapped types:

// 1. `Partial<T>` - Makes all properties optional
// 2. `Required<T>` - Makes all properties required
// Makes all properties of a type required (removes optionality).
interface Config {
  apiUrl?: string;
  timeout?: number;
}

type RequiredConfig = Required<Config>;
// Equivalent to:
// {
//   apiUrl: string;
//   timeout: number;
// }

// 3. `Readonly<T>` - Makes all properties readonly
// 4. `Pick<T, K>` - Selects specific properties
// Creates a type by picking a set of properties from another type.
type UserNameAndAge = Pick<User, 'name' | 'age'>;
// Equivalent to:
// {
//   name: string;
//   age: number;
// }

// 5. `Record<K, T>` - Creates a type with specified keys and value type
// 6. `Omit<T, K>` - Excludes specified properties

//  Example:

interface User {
  id: number;
  name: string;
  age?: number;
}

// Create a read-only version of User
type ReadonlyUser = Readonly<User>;

// Create a type where all properties are strings
type UserStrings = {
  [K in keyof User]: string;
};

*/}



//part 38 ######
{/* 
enum Direction {
  North,
  East,
  South,
  West
}

console.log(Direction.North); // Output: 0
console.log(Direction.West);  // Output: 3


enum Status {
  Started = 1,
  InProgress,
  Completed
}

// console.log(Status.Started);     // Output: 1
// console.log(Status.Completed);   // Output: 3

enum HttpStatus {
  NotFound = 404,
  Success = 200,
  Accepted = 202,
  BadRequest = 400
}

console.log(HttpStatus.NotFound); // Output: 404
console.log(HttpStatus.Success);  // Output: 200
*/}



//part 37
//never type
//in grok: https://grok.com/share/c2hhcmQtMg%3D%3D_e77eec21-f9c1-4d33-b633-e851ae7ba3fe

// type Animal = 'dog' | 'cat' | 'bird'; // Added 'bird'

// function makeSound(animal: Animal): string {
//     if (animal === 'dog') return 'Woof';
//     if (animal === 'cat') return 'Meow';
//     const unreachable: never = animal; // TypeScript error
//     console.log(unreachable)
//     throw new Error('Unknown animal');
// }

// makeSound("bird")

{
  /* 
type Animal = 'dog' | 'cat';

function makeSound(animal: Animal): string {
    if (animal === 'dog') return 'Woof';
    // Removed: if (animal === 'cat') return 'Meow';
    const _unreachable: never = animal; // TypeScript error
    throw new Error('Unknown animal');
}
makeSound("dog")
*/
}
//part 36
//next-env.d.ts file

// the next-env.d.ts file is a crucial piece of the puzzle when you combine Next.js with TypeScript. Think of it as a declaration file that tells the TypeScript compiler about the types and ambient modules that are specific to the Next.js environment.

// Here's a breakdown of its key uses:

// Providing Type Definitions for Next.js Globals and Modules: Next.js introduces its own set of global variables, special modules (like next/router, next/link, next/image), and environment variables. TypeScript needs to know the types of these to provide proper type checking and autocompletion. next-env.d.ts typically contains type declarations for these Next.js specific elements.

// The next plugin uses the type information: The next plugin, when active, leverages the type definitions provided by files like next-env.d.ts. This allows the plugin to perform more accurate and context-aware type checking and provide better code intelligence specifically for Next.js code.

//part 35
//typescript + next.js
// tsconfig file
{
  /* 
import React from "react";
import { useState } from "react";

type User = {
  name: string;
  email: string;
};

export default function Button() {
  const [user, setUser] = useState<User | null>(null);
  const name = user.name; // if we change the strict value in the tsconfig file from true to false the error gone

  const fun = () => setUser({ name: "", email: "" });
  return console.log(name, fun);
}

*/
}

{
  /*
  It tells the TypeScript compiler how to take your .ts and .tsx files and transform them into JavaScript.

   Specifying TypeScript files to compile: You can explicitly list the files or use glob patterns  in the include and exclude arrays to tell the compiler which files should be part of the compilation process. This helps you manage larger projects and avoid accidentally compiling unnecessary files.

   Configuring compiler options: 

   target: The ECMAScript version to which your TypeScript code should be down-leveled (e.g., es5, es2016, esnext). This ensures compatibility with your target JavaScript environment.   

   strict: Enables a collection of strict type-checking options for better code quality and fewer runtime errors. This is highly recommended!

   baseUrl and paths: These are incredibly useful in Next.js for setting up absolute imports. Instead of relative paths like ../../../components/Button, you can configure baseUrl to your project's root and then define paths to create cleaner imports like @/components/Button. Next.js respects these settings.



"plugins": [
  {
    "name": "next"
  }
],
Improved Type Safety for Next.js Specifics: This plugin understands Next.js's conventions and APIs. It can provide more accurate type checking and suggestions for things like:

next/link: Ensuring the href prop is correctly typed and that you're passing valid route parameters.
next/router: Providing better type hints and checks for router-related functions and properties.
next/image: Offering improved type checking for the various props of the next/image component, such as src, width, height, and layout modes.
Server-Side Rendering (SSR) and Server-Side Props (getServerSideProps): Potentially offering better type inference and checks related to data fetching and server-side logic.
API Routes: Providing better type checking for request and response objects within your API routes.
  */
}

//part 34
{
  /*
import React from "react";

type ButtonProps = {
  // children: React.CSSProperties
  children: React.ReactNode; //this is the type that we get from react. Where are these types coming from? node_modules => @types folder.  DefinitelyTyped Repository: this is a big collection of types for third party libraries. with this repository a lot of the most popular third party libraries like react and other ones get some types from this repository
  //   Type definitions like React.ReactNode are part of the @types/react package , which originated from the DefinitelyTyped repository
  // .
  // While the TypeScript team provides the infrastructure for type definitions, they do not maintain the React-specific ones directly.
  // The React team now collaborates with the DefinitelyTyped community to help maintain and improve these types for better accuracy and compatibility
  // .
  // So yes, it's a collaborative ecosystem : TypeScript enables the system, React uses it, and DefinitelyTyped serves as the distribution platform — with overlapping contributions from multiple teams.
  // This collaborative model has allowed TypeScript to support a vast ecosystem of JavaScript libraries beyond just React, including Vue, Angular, Lodash, and many others
  
};

export default function Button(props: ButtonProps) {
  return <button> click me!</button>;
}
*/
}

//part 33   #####
//unknown type

// 1. unknown Type
// Safer alternative to any (introduced in TypeScript 3.0).

// Forces type checking before use, making it more restrictive.

// Represents "I don't know the type yet, but I’ll check it later."

// 2. any Type
// Opts out of type checking entirely (disables TypeScript safety).

// Allows any operation without errors (like plain JavaScript).

// Represents "I don’t care about the type."

// What is it for?
// While both any and unknown can hold values of any type , they differ significantly in how you can interact with them:

// FEATURE                                ANY                                          UNKNOWN

// Type checking                          ✅ Bypasses type checking                   ❌ Requires explicit type checking
// Safe                                   ❌ Not safe                                 ✅ Safe
// Use case                               When you don't care about type               When you want to ensure type checks

// Why prefer unknown over any?
// Using unknown forces developers to check the type before performing operations , making your code safer.

// let value: unknown;

// // value.toUpperCase(); // it gives error because we did operation on the unknown type
// // value.toFixed(2); // it gives error because we did operation on the unknown type

// if (typeof value === "string") {//You must first check the type:
//   value.toUpperCase(); // ✅ OK
// }

//USE CASE
// In fetching data from API, the data that we get back from an API by default is inferred as type of any in typescript (when we hover on data, it shows the type of any) but its better to prevent the type any when we use typescript. The problem here is that we don't know what we are getting back here, we may have some idea of what we're getting back but we don't know for sure. There could be an error on the server, we maybe using the wrong URL, you can never trust what you are getting back from API and if we use any we get a lot of bugs, the more appropriate type is unknown so you can just start using it

// import React from 'react'
// import { useEffect } from 'react';

// export default function Button() {
// useEffect (()=> {
//   fetch ("https://example.com/todos/1")
//   .then((response)=> response.json())
//   .then(data => console.log(data))
// },[])

//   return (
//     <div>button</div>
//   )
// }

// import React from 'react'
// import { useEffect } from 'react';

// export default function Button() {
// useEffect (()=> {
//   fetch ("https://example.com/todos/1")
//   .then((response)=> response.json())
//   .then((data:unknown)=>{
//     data.name.toUpperCase();// it gives us error on data because we do operation on the type of unknown. So before start using this method, we need to verify what we get back here. So here we cn use schemas like zod.
//   })
// },[])

//   return (
//     <div>button</div>
//   )
// }

// zod: it will tell us whether that data is indeed that particular shape, once you've done that, you can use it and do something with the data
//1. TypeScript helps you while writing code
// Catches mistakes in your logic
// But once your app runs in the browser or on a server, TypeScript no longer exists — it gets compiled to plain JavaScript.

// 2. Zod ensures safety at runtime
// With Zod, you validate the shape of the data when you receive it

{
  /*
import React, { useEffect } from "react";
import { z } from "zod";

// 🔹 Define the expected shape of the data using Zod. todoSchema defines what a valid response looks like. You can think of this as a contract : “If you give me some data, I will only accept it if it has these fields and they are the right types.”


const todoSchema = z.object({
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
});

// 🔹 Define TypeScript type inferred from the schema (optional but useful). This line creates a TypeScript type called Todo that matches the shape of data validated by your Zod schema (todoSchema).
// This means:

// "A valid todo object must have:

// id which is a number,
// title which is a string,
// completed which is a boolean."

// Example Without z.infer
// Without using z.infer, you'd do this:

// // Schema for runtime validation
// const todoSchema = z.object({
//   id: z.number(),
//   title: z.string(),
//   completed: z.boolean(),
// });

// // Type for compile-time typing
type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

// With z.infer, you can remove the type Todo = { ... } entirely — it's inferred from the schema!

// Why Is This Useful?
// ✅ DRY Principle (Don't Repeat Yourself)
// You only define the shape once — in the schema — and get both:

// Runtime validation via Zod
// Compile-time type safety via TypeScript
// ✅ Auto-updating types
// If you change your schema later, your type automatically updates too.

// Example:

// const todoSchema = z.object({
//   id: z.number(),
//   title: z.string(),
//   completed: z.boolean(),
//   createdAt: z.date().optional(), // new field
// });

export type Todo = z.infer<typeof todoSchema>; //Now you can use Todo anywhere else in your app. I import in the page file

export default function Button() {
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: unknown) => {
        // ✅ Safe parsing with Zod
        const parsedData = todoSchema.parse(data);
        //What does .parse() do?
        // It tries to validate the input (data) against the schema:

        // ✅ If it matches → returns a value of type { id: number; title: string; completed: boolean }
        // ❌ If it doesn't match → throws an error
        // This is the type guard at runtime , similar to how TypeScript enforces types at compile time.

        // Now TypeScript knows the shape of `parsedData`
        console.log("Parsed Todo:", parsedData);
      })
      .catch((error: unknown) => {
        if (error instanceof Error) {
          console.error("Failed to fetch or parse todo:", error.message);
        } else {
          console.error("Unknown error:", error);
        }
      });
  }, []);

  return <div>button</div>;
}
  */
}
// If you don't want to manually do this typing from any to unknown yourself, you can use ts-reset package from matt pocock, with this package it will make sure that whenever you fetch data, the data will automatically be of that unknown type

//part 32      ########
//d.ts vs ts files and import types. type definition for global use across the project.

// Feature	  .ts File	                   .d.ts File
// Contains	  Executable code + types	     Only type declarations
// Output	    Compiled to .js	             Never emitted to JS
// Purpose	  Implementation	             Type definitions only

//for example colors are related to the theme and can be used across several components. We need to define this outside this component.

//we can define this type in a file with .d.ts suffix and these files with these suffixes treated as declaration files also we can define these types in a file with .ts suffix.

// import React from 'react'

// type Color = "red" | "blue" | "green"

// export default function Button(props : Color) {
//   return (
//     <div>button</div>
//   )
// }
{
  /*}
import React from 'react'
// import {Color} from "@/app/lib/index" 
//now this look like a normal javascript variable that I can import here so for solving this problem we can write type in front of it to make it clear that this is a typescript type and it remind us that we shouldn't treated as a normal javascript variable.

import {type Color} from "@/app/lib/index" 

 type ButtonProps = {
  color : Color
  size : string
 }


export default function Button(props : ButtonProps) {
  return (
    <div>button</div>
  )
}
*/
}

//part 31 with page file     ########
//Generics of typescript in react
//with generics we specifying a relationship,  the input is going to be of the same type as what you get in the output and instead of hard coding string or boolean, we make it more general with generics
{
  /*
import React from "react";

// type ButtonProps = {
//   countValue: number; //maybe we want the types also be string or other values too. we have relationships between these two props. If the countValue is a number, the countHistory should be an array of numbers. If the countValue is a string, the countHistory should be an array of strings. So we use generics to make this realtionship so we should use type parameter (T)
//   countHistory: number[];
// };

//the count value should be the same type as the count history

type ButtonProps<T> = {
  countValue: T;
  countHistory: T[];// the history of the count values
};

// export default function Button<T>({

//   countValue,
//   countHistory,
// }: ButtonProps<T>) {
//   return (
//     <button countValue={countValue} countHistory={countHistory}>
//       click me
//     </button>
//   );
// }
  */
}

//part 30   #######
//as
{
  /*
import React, { useEffect } from "react";

type ButtonColor = "red" | "blue" | "green";
type ButtonColor = string | boolean | number;


export default function Button() {
  // useEffect(() => {
  //   const previousButtonColor = localStorage.getItem("buttonColor"); // when we hover on the previousButtonColor, it shows us the type of it as string | null. It can be null because if we don't have any value in the local storage, it will return null.
  //   if (previousButtonColor) {
  //     console.log(`Previous button color: ${previousButtonColor}`);
  //   } else {
  //     console.log("No previous button color found.");
  //   }
  // }, []);

  useEffect(() => {
    const previousButtonColor = localStorage.getItem("buttonColor") as ButtonColor; //we can use as to tell typescript that we know better than it. We are sure that the value of previousButtonColor is one of the values of ButtonColor type.
    if (previousButtonColor) {
      console.log(`Previous button color: ${previousButtonColor}`);
    } else {
      console.log("No previous button color found.");
    }
  }, [])

  return <button>Click me!</button>;
}
*/
}

//part 29 #######
//omit
{
  /* 
import React from 'react'

type User = {
  name: string;
  sessionId: string;
}


type Guest = Omit<User, "name">; //Omit is a utility type in TypeScript that creates a new type by picking all properties from an existing type except for the specified ones. In this case, it creates a new type Guest that has all properties of User except for name. when we hover on the Guest, it doesn't show us the name property.
//if the user is not registered yet, we don't have it's name but we have the sessionId.

export default function button(user : Guest) {
  return (
    <button>

    </button>
  )
}
  */
}

//part 28  ###### 
//as const
//not using as const:  when we hover on the option, the typescript infers the type of that as string but after we used the (as const) the typescript infers the type as static definitions and read only
//not using as const: when we hover on the buttonTextOptions, it shows us the type of it as string[] but after we used the (as const) the typescript infers the type as readonly ["Click me", "Click me again", "Click me one more time"] and it makes the array readonly.
// readonly: means that the array cannot be modified after its creation. You can't add, remove, or change elements in the array. This is useful for ensuring that the array remains constant and prevents accidental modifications.

{
  /*
import React from "react";

// const buttonTextOptions = [
//   "Click me",
//   "Click me again",
//   "Click me one more time",
// ];


const buttonTextOptions = [
  "Click me",
  "Click me again", 
  "Click me one more time", 
] as const; //as const makes the array readonly and infers the type of each element as a literal type (literal types in TypeScript are quite neat! They allow you to be much more precise about the exact values that a variable can hold. Instead of just saying a variable is a string, you can say it must be the exact string "hello") instead of a general string type.

//these are the errors that we get because of (as const) is read only
// This will cause a TypeScript error:
buttonTextOptions.push("Another option");

// This will also cause a TypeScript error:
buttonTextOptions[0] = "New text";

export default function Button() {
  return (
    <button>
      {buttonTextOptions.map((option) => {
        return option;
      })}
    </button>
  );
}

*/
}


// Literal Types vs. Union Types in TypeScript
// Literal Types
// Literal types allow you to specify exact values as types. They come in three forms:

// String Literal Types
{/* 
type Direction = "north" | "south" | "east" | "west";
let move: Direction = "north"; // Only these exact strings allowed


// Numeric Literal Types

type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;
let roll: DiceRoll = 3; // Only numbers 1-6 allowed
*/}



//part 27
// useContext
// take example from perplexity
// https://www.perplexity.ai/search/i-want-you-to-give-me-an-examp-qCe2IuyuRJiO5j5vOqGavw

//part 26
//what is the use of React.FC

//part 25
// question about react and typescript
{
  /*
  Am I understand correctly that that the react defines these types for just being using by typescript?
  The primary and overwhelmingly significant reason React defines these types (like React.MouseEvent and ComponentProps) is for use by TypeScript. 
  Think of it this way:

React's Core is JavaScript: React's fundamental runtime is written in JavaScript. It doesn't inherently "understand" or enforce types on its own.
TypeScript's Role: TypeScript is a separate language that adds static typing to JavaScript. To effectively work with React's APIs and structures in a type-safe way, TypeScript needs type definitions that describe those APIs.
React Provides the Descriptions: React provides these .d.ts (declaration) files, which contain the type definitions for its components, props, events, and other internal structures. These definitions tell TypeScript what to expect when you're using React in a TypeScript project.

In essence, React provides the "map" (the type definitions) so that TypeScript can effectively navigate and verify the "territory" (the React codebase).

So, to answer your question directly and concisely: Yes, you are correct. The main purpose of React defining these types is to enable seamless and type-safe integration with TypeScript. The benefits you experience with these types are primarily benefits within a TypeScript project.


so why typescript itself doesn't provide these types and react defines these types?

The reason TypeScript itself doesn't provide these React-specific types is because TypeScript is a general-purpose language that knows nothing inherently about the specifics of the React library.

Think of it this way:

TypeScript is the language police: It sets the rules for how data types should be used in JavaScript code. It understands core JavaScript concepts and provides syntax for adding type annotations.

React is a specific library: It's a set of tools and conventions for building user interfaces. It has its own concepts like components, props, state, events, and a virtual DOM.

TypeScript's Generality:

TypeScript is designed to be adaptable to any JavaScript library or framework. If TypeScript were to include type definitions for every popular library out there (React, Angular, Vue, Node.js built-in modules, browser APIs, etc.), it would become:

Bloated: The TypeScript language service and compiler would become huge, containing definitions for countless external dependencies that a particular project might not even use.

React's Responsibility (and the Community's):

Therefore, the responsibility of providing accurate type definitions for a specific library like React falls on:

The React team itself: As the creators and maintainers of React, they have the most in-depth understanding of its internal workings and API. They are best positioned to provide and maintain the official type definitions (which they do, often bundled or published separately).

React provides the specific type definitions that describe its own unique API and concepts, allowing TypeScript to understand and type-check React code effectively. 
  */
}

// part 24
// useRef hook
// import React, { useRef } from "react";

// export default function Button() {
//   const ref = useRef<HTMLButtonElement>(null); //HTMLButtonElement is a type in TypeScript (and JavaScript's DOM API). when using useRef, we specify the type of the element we expect to reference. In this case, it's a button element. The type of the useRef hook is "React.RefObject" that when we hover on the useRef, it shows that. We don't specify the "React.RefObject" type for useRef because typescript can infer it's type.

//   return <button ref={ref}> Click me!</button>;
// }

//part 23
//for useEffect we don't have to assume type

//part 22  ########
// hooks
// import React from 'react'

// type User = {
//   name?: string;
//   age?: number;
// }

// export default function button() {
//   //  const [count, setCount] = React.useState(0); //when we hover on count, the typescript infers the type of it as number based on the initial value 0.

//   // const [count, setCount] = React.useState<number>(0);//here we define the type of count as number explicitly.
//   // const [count, setCount] = React.useState<string>(0);//here if we define the type of count as string explicitly, it shows us an error because the initial value is 0 which is a number.

//   // const [user, setUser] = React.useState(null); //we give it's initial value null
// // const name = user.name //it gives error on user, because user is null and we can't access name property of null.

// // const [user, setUser] = React.useState<User>(null);//we define the optional type User, so when we hover on user, it shows us the type of it as User, but we get the error on null when we hover on it. So for resolve this issue we use or.
// // const name = user.name

// // const [user, setUser] = React.useState<User | null>(null);
// // const name = user.name //here it gives us error on user, because it can be null, so we resolve this issue with optional chaining.

// const [user, setUser] = React.useState<User | null>(null);
// const name = user?.name

//   return (
//     <div>button</div>
//   )
// }

//part 21   #######
// event handlers: onChange, onSubmit, onClick

// import React from "react";

// export default function Button() {
//   return (
//     //when we hover on the e parameter, it shows us the type of the event :
//     // React.MouseEvent<HTMLButtonElement, MouseEvent>
//     //typescript can infers the type of the event
//     <button onClick={(e) => console.log("Button clicked!")}>Click Me!</button>

//   );
// }

// import React from "react";

// export default function Button() {
//   //here when we hover on the e parameter, it can't infer the type of it, because we can use this function elsewhere and typescript can't realize that we only use the function for the event handler, so we should define the type of it here.
//   const handleClick = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
//     e.preventDefault(); //to prevent the default behavior of the button, which is to submit a form or refresh the page
//     console.log("Button clicked!")
//   return (
//     <button onClick={handleClick}>Click Me!</button>
//   );
// }

//part 20 #########
// with interface we do the same thing as part 19 but with extend
// import React from "react";

// interface ButtonProps  {
//   type: "button" | "submit" | "reset";
//   autoFocus?: boolean; //default value is false
// }

// interface SuperButtonProps extends ButtonProps {
//   size: "small" | "medium" | "large";
// }

// function Button(props: ButtonProps) {
//   return (
//     <div className="flex justify-center items-center h-screen">
//       <button  {...props}>
//         Click Me!
//        </button>
//     </div>
//   );
// }

// export default function SuperButton(props: SuperButtonProps) {
//   return (
//     <div className="flex justify-center items-center h-screen">
//       <button {...props}>
//        second button
//        </button>

//        <Button {...props}/>

//     </div>
//   );
// }

//part 19  #######
// Intersection Types
// if we have another component and want to define props for that component too but it has the props of the previous component too.
// import React from "react";

// type ButtonProps = {
//   type: "button" | "submit" | "reset";
//   autoFocus?: boolean; //default value is false
// }

// type SuperButtonProps = ButtonProps & {
//   size: "small" | "medium" | "large";
// }

// function Button(props: ButtonProps) {
//   return (
//     <div className="flex justify-center items-center h-screen">
//       <button  {...props}>
//         Click Me!
//        </button>
//     </div>
//   );
// }

// export default function SuperButton(props: SuperButtonProps) {
//   return (
//     <div className="flex justify-center items-center h-screen">
//       <button {...props}>
//        second button
//        </button>

//        <Button {...props}/>

//     </div>
//   );
// }

// part 18
// import React, {  ComponentPropsWithoutRef } from "react";

// type ButtonProps = ComponentPropsWithoutRef<"button"> & {
//   variant?: "primary" | "secondary"; //variant prop
// }
// // with ComponentPropsWithoutRef, we accept all the attributes that the button element accepts, and nothing else. If want to pass a prop that is not a button attribute, we use & (ampersand) that is called intersecting.

// export default function Button(props: ButtonProps) {
//   return (
//     <div className="flex justify-center items-center h-screen">
//       <button {...props}>
//         Click Me!
//        </button>
//     </div>
//   );
// }

//part 17
//when we hover on the ComponentProps, it says that it's better to use the "ComponentPropsWithRef" or "ComponentPropsWithoutRef" instead of "ComponentProps". In the part 16 , is better to use the "ComponentPropsWithoutRef"

// forwardRef: A React function that allows your component to accept a ref prop and forward it to a child component or DOM element.
// ComponentPropsWithRef: A TypeScript utility type that extracts the props of a component (or element) including the ref prop.

// import React, { forwardRef, ComponentPropsWithRef } from "react";

// type ButtonProps = ComponentPropsWithRef<"button">;
// // It represents all the props that a native <button> element accepts including the ref.

// const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
//   <button ref={ref} {...props} />
// ));
// // forwardRef: Wraps a functional component to allow it to accept a ref prop.
// // Type parameters:
// // <HTMLButtonElement, ButtonProps>:
// // HTMLButtonElement: The type of the DOM node the ref will point to.
// // ButtonProps: The props the component accepts.
// // Function parameters:
// // (props, ref):
// // props: All the props passed to the component (like onClick, type, etc.).
// // ref: The ref object passed from the parent, which will be attached to the <button> element.
// // Component body:
// // Returns a <button> element.
// // ref={ref}: Attaches the forwarded ref to the DOM <button>.
// // {...props}: Spreads all other props onto the <button>.

// Button.displayName = "Button";
// // Why?:
// // When using forwardRef, React components don't automatically get a displayName, which makes debugging and React DevTools less clear.
// // Setting displayName explicitly helps identify the component in DevTools and improves error messages.

// export default Button;

//part 16  #########
//if we have hundreds of these attributes, and we don't want to pass all of them individually one by one, so we can use a helper type called Component.Props and in the <> (anchor tag) we define which element it should be. In TypeScript, you can use the ComponentProps utility type from React to get the props type of a specific component or element, such as a <button>.

// import React, { ComponentProps } from "react";

// type ButtonProps = ComponentProps<"button"> // now we can accept all the attributes that the button element accepts
// // type ButtonProps = ComponentProps<"a"> //for a tag

// export default function Button(props: ButtonProps) {
//   return (
//     <div className="flex justify-center items-center h-screen">
//       <button {...props}>
//         Click Me!
//        </button>
//     </div>
//   );
// }

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

//part14   ######
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

//part 12   ########
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

//part11   #######
//JSX.Element is a TypeScript type that represents a valid JSX element (e.g., <div>, <span>, or custom components).

{
  /*import React from "react";

type ButtonProps = {
  children: React.JSX.Element; //children prop
};

export default function Button({children}:ButtonProps) {
  return (
    <div className="flex justify-center items-center h-screen">
      <button>{children}</button>
    </div>
  );
}
  */
}

//part10  #######
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

//part 8   #########
//if we want one prop for border radius
// import React from "react";

// type ButtonProps = {
//   borderRadius: Record<string, number>; // Record<string, number> allows us to pass any number of properties with string keys and number values

//   backgroundColor: string;
// };

// type AppConfig = Record<string, string | number | boolean>;

// const config: AppConfig = {
//   apiUrl: "https://api.example.com",
//   timeout: 5000,
//   debugMode: true
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

//part7 #######
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

//part3 #######
{/* 
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

// Tuples in TypeScript are a special kind of array type where:

// The length is fixed

// Each position has a specific type

// Basic Tuple Syntax
// typescript
let userInfo: [string, number, boolean];
userInfo = ["Alice", 30, true]; // Valid
userInfo = [30, "Alice", true]; // Error - wrong types
userInfo = ["Alice", 30]; // Error - missing element
userInfo = ["Alice", 30, true, "extra"]; // Error - too many elements

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
*/}

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
