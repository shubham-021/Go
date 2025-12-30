# Rust

A comprehensive guide to Rust fundamentals and core concepts.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Variables and Mutability](#variables-and-mutability)
3. [Data Types](#data-types)
4. [Ownership](#ownership)
5. [References and Borrowing](#references-and-borrowing)
6. [Structs](#structs)
7. [Enums and Pattern Matching](#enums-and-pattern-matching)
8. [Error Handling](#error-handling)
9. [Option Type](#option-type)
10. [Generics](#generics)
11. [Traits](#traits)
12. [Lifetimes](#lifetimes)
13. [Copy and Clone Traits](#copy-and-clone-traits)
14. [Macros](#macros)
15. [Common Collections](#common-collections)

---

## Getting Started

### Project Setup

```bash
# Install Rust using rustup
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Create a new project
cargo new project_name
cd project_name

# Build and run
cargo build           # Compile the project
cargo run             # Build and run
cargo check           # Check for errors without building
cargo build --release # Build with optimizations
```

### Project Structure

```
project_name/
├── Cargo.toml    # Project manifest (dependencies, metadata)
├── Cargo.lock    # Exact dependency versions
└── src/
    └── main.rs   # Entry point
```

### Hello World

```rust
fn main() {
    println!("Hello, World!");
}
```

---

## Variables and Mutability

By default, variables in Rust are immutable. This is a key safety feature.

### Immutable Variables

```rust
fn main() {
    let x = 5;
    // x = 6;  // Error: cannot assign twice to immutable variable
    println!("{}", x);
}
```

### Mutable Variables

Use `mut` to make a variable mutable:

```rust
fn main() {
    let mut x = 5;
    println!("x = {}", x);
    x = 6;  // This is allowed
    println!("x = {}", x);
}
```

### Constants

Constants are always immutable and must have a type annotation:

```rust
const MAX_POINTS: u32 = 100_000;
const PI: f64 = 3.14159;
```

### Shadowing

You can declare a new variable with the same name, which shadows the previous one:

```rust
fn main() {
    let x = 5;
    let x = x + 1;      // Shadows previous x
    let x = x * 2;      // Shadows again
    println!("{}", x);  // Output: 12

    // Shadowing allows type changes
    let spaces = "   ";
    let spaces = spaces.len();  // Now an integer
}
```

---

## Data Types

### Scalar Types

```rust
fn main() {
    // Integers (signed: i8, i16, i32, i64, i128, isize)
    let a: i32 = -42;

    // Unsigned integers (u8, u16, u32, u64, u128, usize)
    let b: u32 = 42;

    // Floating point (f32, f64)
    let c: f64 = 3.14;

    // Boolean
    let d: bool = true;

    // Character (4 bytes, Unicode)
    let e: char = 'Z';
    let emoji: char = '🦀';
}
```

### Compound Types

```rust
fn main() {
    // Tuple - fixed size, different types
    let tup: (i32, f64, char) = (500, 6.4, 'a');
    let (x, y, z) = tup;                // Destructuring
    let first = tup.0;                  // Access by index

    // Array - fixed size, same type
    let arr: [i32; 5] = [1, 2, 3, 4, 5];
    let first = arr[0];

    // Array with repeated values
    let zeros = [0; 5];  // [0, 0, 0, 0, 0]
}
```

### String Types

```rust
fn main() {
    // String slice (borrowed, immutable reference)
    let s1: &str = "Hello";

    // String (owned, heap-allocated, growable)
    let s2: String = String::from("Hello");
    let s3: String = "Hello".to_string();

    // Concatenation
    let mut s = String::from("Hello");
    s.push_str(" World");
    s.push('!');  // Single character
}
```

---

## Ownership

Ownership is Rust's most unique feature. It enables memory safety without garbage collection.

### Ownership Rules

1. Each value in Rust has an owner
2. There can only be one owner at a time
3. When the owner goes out of scope, the value is dropped

### Move Semantics

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1;  // s1 is moved to s2

    // println!("{}", s1);  // Error: s1 is no longer valid
    println!("{}", s2);     // This works
}
```

### Ownership with Functions

```rust
fn main() {
    let s = String::from("hello");
    takes_ownership(s);     // s is moved into the function

    // println!("{}", s);   // Error: s is no longer valid

    let x = 5;
    makes_copy(x);          // i32 implements Copy, so x is still valid
    println!("{}", x);      // This works
}

fn takes_ownership(some_string: String) {
    println!("{}", some_string);
}  // some_string is dropped here

fn makes_copy(some_integer: i32) {
    println!("{}", some_integer);
}
```

### Returning Ownership

```rust
fn main() {
    let s1 = gives_ownership();
    let s2 = String::from("hello");
    let s3 = takes_and_gives_back(s2);
}

fn gives_ownership() -> String {
    String::from("yours")
}

fn takes_and_gives_back(s: String) -> String {
    s  // Returned and moved to caller
}

// Returning multiple values with tuple
fn get_length(s: String) -> (String, usize) {
    let length = s.len();
    (s, length)
}
```

---

## References and Borrowing

References allow you to refer to a value without taking ownership.

### Immutable References

```rust
fn main() {
    let s = String::from("hello");
    let len = get_length(&s);  // Borrow s
    println!("Length of '{}' is {}", s, len);  // s is still valid
}

fn get_length(s: &String) -> usize {
    s.len()
}  // s goes out of scope but nothing is dropped (we don't own it)
```

### Mutable References

```rust
fn main() {
    let mut s = String::from("hello");
    change(&mut s);
    println!("{}", s);  // Output: hello world
}

fn change(s: &mut String) {
    s.push_str(" world");
}
```

### Borrowing Rules

1. You can have either one mutable reference OR any number of immutable references
2. References must always be valid (no dangling references)

```rust
fn main() {
    let mut s = String::from("hello");

    let r1 = &s;     // OK
    let r2 = &s;     // OK - multiple immutable references
    println!("{} and {}", r1, r2);

    let r3 = &mut s; // OK - r1 and r2 are no longer used
    println!("{}", r3);
}
```

### String Slices

```rust
fn main() {
    let s = String::from("hello world");

    let hello: &str = &s[0..5];   // "hello"
    let world: &str = &s[6..11];  // "world"

    // Shorthand
    let hello = &s[..5];   // From beginning
    let world = &s[6..];   // To end
    let whole = &s[..];    // Entire string
}

fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();
    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[..i];
        }
    }
    &s[..]
}
```

---

## Structs

Structs group related data together.

### Defining and Instantiating

```rust
struct User {
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool,
}

fn main() {
    // Create instance
    let user1 = User {
        email: String::from("user@example.com"),
        username: String::from("user123"),
        active: true,
        sign_in_count: 1,
    };

    // Access fields
    println!("{}", user1.username);

    // Mutable instance
    let mut user2 = User {
        email: String::from("another@example.com"),
        username: String::from("another"),
        active: true,
        sign_in_count: 1,
    };
    user2.email = String::from("new@example.com");
}
```

### Struct Update Syntax

```rust
let user2 = User {
    email: String::from("another@example.com"),
    ..user1  // Use remaining fields from user1
};
```

### Tuple Structs

```rust
struct Color(i32, i32, i32);
struct Point(i32, i32, i32);

fn main() {
    let black = Color(0, 0, 0);
    let origin = Point(0, 0, 0);
}
```

### Unit-Like Structs

```rust
struct AlwaysEqual;  // No fields

fn main() {
    let subject = AlwaysEqual;
}
```

### Methods with impl

```rust
struct Rect {
    width: f32,
    height: f32,
}

impl Rect {
    // Method (takes &self)
    fn area(&self) -> f32 {
        self.width * self.height
    }

    // Method that mutates
    fn scale(&mut self, factor: f32) {
        self.width *= factor;
        self.height *= factor;
    }

    // Associated function (no self - like static method)
    fn square(size: f32) -> Rect {
        Rect {
            width: size,
            height: size,
        }
    }
}

fn main() {
    let rect = Rect {
        width: 10.0,
        height: 20.0,
    };

    println!("Area: {}", rect.area());

    // Call associated function
    let square = Rect::square(5.0);
}
```

---

## Enums and Pattern Matching

Enums define a type by enumerating its possible variants.

### Basic Enums

```rust
enum Direction {
    North,
    South,
    East,
    West,
}

fn main() {
    let dir = Direction::North;
    move_player(dir);
}

fn move_player(dir: Direction) {
    match dir {
        Direction::North => println!("Moving north"),
        Direction::South => println!("Moving south"),
        Direction::East => println!("Moving east"),
        Direction::West => println!("Moving west"),
    }
}
```

### Enums with Data

Each variant can hold different types and amounts of data:

```rust
enum Message {
    Quit,                       // No data
    Move { x: i32, y: i32 },    // Named fields
    Write(String),              // Single value
    ChangeColor(i32, i32, i32), // Multiple values
}

enum Shape {
    Circle(f32),           // radius
    Square(f32),           // side
    Rectangle(f32, f32),   // width, height
}
```

### Pattern Matching with match

```rust
use std::f32::consts::PI;

enum Shape {
    Circle(f32),
    Square(f32),
    Rectangle(f32, f32),
}

impl Shape {
    fn area(&self) -> f32 {
        match self {
            Shape::Circle(r) => PI * r * r,
            Shape::Square(side) => side * side,
            Shape::Rectangle(w, h) => w * h,
        }
    }
}

fn main() {
    let circle = Shape::Circle(10.0);
    println!("Area: {}", circle.area());
}
```

### Catch-All Pattern

```rust
fn get_direction(dir: Direction) {
    match dir {
        Direction::North => println!("North"),
        Direction::South => println!("South"),
        _ => println!("Horizontal direction"),  // Catch all others
    }
}
```

### if let Syntax

A shorter way to match a single pattern:

```rust
let some_value = Some(5);

// Instead of this:
match some_value {
    Some(x) => println!("Value: {}", x),
    _ => {}
}

// You can write:
if let Some(x) = some_value {
    println!("Value: {}", x);
}

// With else:
if let Some(x) = some_value {
    println!("Value: {}", x);
} else {
    println!("No value");
}
```

---

## Error Handling

Rust groups errors into two categories: recoverable and unrecoverable.

### Unrecoverable Errors with panic!

```rust
fn main() {
    panic!("crash and burn");  // Program terminates immediately
}
```

### Recoverable Errors with Result

```rust
use std::fs::File;
use std::io::{self, Read};

fn main() {
    let file_result = File::open("hello.txt");

    let file = match file_result {
        Ok(file) => file,
        Err(error) => {
            println!("Error opening file: {:?}", error);
            return;
        }
    };
}
```

### The Result Enum

```rust
enum Result<T, E> {
    Ok(T),   // Success case with value of type T
    Err(E),  // Error case with error of type E
}
```

### Propagating Errors

```rust
use std::fs::File;
use std::io::{self, Read};

fn read_username_from_file() -> Result<String, io::Error> {
    let mut file = File::open("hello.txt")?;  // ? propagates error
    let mut username = String::new();
    file.read_to_string(&mut username)?;
    Ok(username)
}

// Chained version
fn read_username_short() -> Result<String, io::Error> {
    let mut username = String::new();
    File::open("hello.txt")?.read_to_string(&mut username)?;
    Ok(username)
}

// Shortest version
fn read_username_shortest() -> Result<String, io::Error> {
    std::fs::read_to_string("hello.txt")
}
```

### unwrap and expect

```rust
// unwrap: panics if Err
let file = File::open("hello.txt").unwrap();

// expect: panics with custom message
let file = File::open("hello.txt").expect("Failed to open hello.txt");
```

---

## Option Type

Rust uses `Option` instead of null to represent the absence of a value.

### The Option Enum

```rust
enum Option<T> {
    Some(T),  // Value exists
    None,     // No value
}
```

### Using Option

```rust
fn main() {
    let some_number: Option<i32> = Some(5);
    let no_number: Option<i32> = None;

    // Must handle both cases
    match some_number {
        Some(n) => println!("Number: {}", n),
        None => println!("No number"),
    }
}
```

### Practical Example

```rust
fn find_first_a(s: &str) -> Option<usize> {
    for (i, ch) in s.chars().enumerate() {
        if ch == 'a' {
            return Some(i);
        }
    }
    None
}

fn main() {
    let result = find_first_a("Shubham");

    match result {
        Some(index) => println!("First 'a' at index {}", index),
        None => println!("No 'a' found"),
    }

    // Using if let
    if let Some(index) = find_first_a("hello") {
        println!("Found at {}", index);
    }
}
```

### Option Methods

```rust
fn main() {
    let x: Option<i32> = Some(5);

    // unwrap: panics if None
    let value = x.unwrap();

    // unwrap_or: default if None
    let value = x.unwrap_or(0);

    // unwrap_or_else: compute default lazily
    let value = x.unwrap_or_else(|| compute_default());

    // map: transform the value if Some
    let doubled: Option<i32> = x.map(|n| n * 2);

    // and_then: chain operations
    let result: Option<i32> = x.and_then(|n| Some(n * 2));

    // is_some / is_none
    if x.is_some() {
        println!("Has value");
    }
}
```

---

## Generics

Generics allow you to write code that works with multiple types.

### Generic Functions

```rust
fn largest<T: PartialOrd>(list: &[T]) -> &T {
    let mut largest = &list[0];
    for item in list {
        if item > largest {
            largest = item;
        }
    }
    largest
}

fn main() {
    let numbers = vec![34, 50, 25, 100, 65];
    println!("Largest: {}", largest(&numbers));

    let chars = vec!['y', 'm', 'a', 'q'];
    println!("Largest: {}", largest(&chars));
}
```

### Generic Structs

```rust
struct Point<T> {
    x: T,
    y: T,
}

// Multiple type parameters
struct Pair<T, U> {
    first: T,
    second: U,
}

fn main() {
    let integer_point = Point { x: 5, y: 10 };
    let float_point = Point { x: 1.0, y: 4.0 };
    let mixed = Pair { first: 5, second: "hello" };
}
```

### Generic Methods

```rust
struct Point<T> {
    x: T,
    y: T,
}

impl<T> Point<T> {
    fn x(&self) -> &T {
        &self.x
    }
}

// Implement only for specific types
impl Point<f32> {
    fn distance_from_origin(&self) -> f32 {
        (self.x.powi(2) + self.y.powi(2)).sqrt()
    }
}
```

### Generic Enums

```rust
// Option and Result are generic enums
enum Option<T> {
    Some(T),
    None,
}

enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

---

## Traits

Traits define shared behavior, similar to interfaces in other languages.

### Defining Traits

```rust
trait Summary {
    fn summarize(&self) -> String;

    // Default implementation
    fn default_summary(&self) -> String {
        String::from("(Read more...)")
    }
}
```

### Implementing Traits

```rust
struct NewsArticle {
    headline: String,
    author: String,
    content: String,
}

impl Summary for NewsArticle {
    fn summarize(&self) -> String {
        format!("{}, by {}", self.headline, self.author)
    }
}

struct Tweet {
    username: String,
    content: String,
}

impl Summary for Tweet {
    fn summarize(&self) -> String {
        format!("{}: {}", self.username, self.content)
    }
}
```

### Traits as Parameters

```rust
// Using impl Trait
fn notify(item: &impl Summary) {
    println!("Breaking news! {}", item.summarize());
}

// Trait bound syntax (more flexible)
fn notify<T: Summary>(item: &T) {
    println!("Breaking news! {}", item.summarize());
}

// Multiple trait bounds
fn notify<T: Summary + Display>(item: &T) {
    // ...
}

// where clause for clarity
fn some_function<T, U>(t: &T, u: &U) -> i32
where
    T: Display + Clone,
    U: Clone + Debug,
{
    // ...
}
```

### Returning Types that Implement Traits

```rust
fn returns_summarizable() -> impl Summary {
    Tweet {
        username: String::from("horse_ebooks"),
        content: String::from("of course, as you probably already know, people"),
    }
}
```

### Practical Example

```rust
use std::f32::consts::PI;

trait Shape {
    fn area(&self) -> f32;
    fn perimeter(&self) -> f32;
}

struct Circle {
    radius: f32,
}

struct Rectangle {
    width: f32,
    height: f32,
}

impl Shape for Circle {
    fn area(&self) -> f32 {
        PI * self.radius * self.radius
    }

    fn perimeter(&self) -> f32 {
        2.0 * PI * self.radius
    }
}

impl Shape for Rectangle {
    fn area(&self) -> f32 {
        self.width * self.height
    }

    fn perimeter(&self) -> f32 {
        2.0 * (self.width + self.height)
    }
}

fn print_shape_info<T: Shape>(shape: &T) {
    println!("Area: {}", shape.area());
    println!("Perimeter: {}", shape.perimeter());
}

fn main() {
    let circle = Circle { radius: 10.0 };
    let rect = Rectangle { width: 10.0, height: 20.0 };

    print_shape_info(&circle);
    print_shape_info(&rect);
}
```

---

## Lifetimes

Lifetimes ensure that references are valid for as long as they need to be.

### The Problem

```rust
// This won't compile - dangling reference
fn main() {
    let r;
    {
        let x = 5;
        r = &x;  // x goes out of scope here
    }
    // println!("{}", r);  // r would be invalid
}
```

### Lifetime Annotations

```rust
// 'a is a lifetime parameter
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}

fn main() {
    let s1 = String::from("long string is long");
    let s2 = String::from("xyz");

    let result = longest(&s1, &s2);
    println!("Longest: {}", result);
}
```

### Lifetime Rules (Elision)

The compiler can often infer lifetimes:

1. Each input reference gets its own lifetime
2. If there's one input lifetime, it's assigned to all output references
3. If `&self` is a parameter, its lifetime is assigned to output references

```rust
// These are equivalent:
fn first_word(s: &str) -> &str { /* ... */ }
fn first_word<'a>(s: &'a str) -> &'a str { /* ... */ }
```

### Lifetimes in Structs

```rust
struct ImportantExcerpt<'a> {
    part: &'a str,  // Must live as long as the struct
}

fn main() {
    let novel = String::from("Call me Ishmael. Some years ago...");
    let first_sentence = novel.split('.').next().unwrap();

    let excerpt = ImportantExcerpt {
        part: first_sentence,
    };
}
```

### Static Lifetime

```rust
// Lives for the entire program duration
let s: &'static str = "I have a static lifetime.";
```

---

## Copy and Clone Traits

Understanding when values are copied vs moved.

### Copy Trait

Types that implement `Copy` are duplicated instead of moved:

```rust
fn main() {
    let x = 5;
    let y = x;  // Copy, not move
    println!("{} {}", x, y);  // Both valid
}
```

Types that implement `Copy`:
- All integer types (i32, u64, etc.)
- Boolean (bool)
- Floating point types (f32, f64)
- Character (char)
- Tuples of Copy types
- Arrays of Copy types
- References (&T)

### Types That Cannot Be Copy

- String
- Vec<T>
- Box<T>
- Any type containing heap-allocated data

### Clone Trait

`Clone` provides explicit deep copying:

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1.clone();  // Explicit deep copy
    println!("{} {}", s1, s2);  // Both valid
}
```

### Deriving Copy and Clone

```rust
// Only works if all fields implement Copy
#[derive(Debug, Clone, Copy)]
struct Point {
    x: i32,
    y: i32,
}

// Clone only (contains String which doesn't implement Copy)
#[derive(Debug, Clone)]
struct User {
    name: String,
    age: u32,
}

fn main() {
    let p1 = Point { x: 1, y: 2 };
    let p2 = p1;  // Copy
    println!("{:?} {:?}", p1, p2);

    let u1 = User {
        name: String::from("Alice"),
        age: 30,
    };
    let u2 = u1.clone();  // Must explicitly clone
    println!("{:?} {:?}", u1, u2);
}
```

| Type                     | Behavior                  | Implements Copy? |
| ------------------------ | ------------------------- | ---------------- |
| i32, u8, bool, f64, char | Copied                    | Yes              |
| String, Vec<T>, Box<T>   | Moved                     | No               |
| &T (references)          | Copied (just the pointer) | Yes              |
| Custom structs           | Depends on fields         | Must derive      |

---

## Macros

Macros allow metaprogramming - code that writes code.

### Declarative Macros (macro_rules!)

```rust
macro_rules! say_hello {
    () => {
        println!("Hello!");
    };
}

macro_rules! create_function {
    ($func_name:ident) => {
        fn $func_name() {
            println!("Function {:?} called", stringify!($func_name));
        }
    };
}

create_function!(foo);
create_function!(bar);

fn main() {
    say_hello!();
    foo();
    bar();
}
```

### Common Built-in Macros

```rust
fn main() {
    // println! - print with newline
    println!("Hello, {}!", "world");

    // print! - print without newline
    print!("No newline");

    // format! - create String
    let s = format!("x = {}", 42);

    // vec! - create Vec
    let v = vec![1, 2, 3];

    // panic! - crash with message
    // panic!("Something went wrong");

    // assert! - panic if false
    assert!(1 + 1 == 2);

    // assert_eq! / assert_ne!
    assert_eq!(4, 2 + 2);
    assert_ne!(4, 3);

    // dbg! - debug print with file/line
    let x = dbg!(5 * 2);  // Prints: [src/main.rs:X] 5 * 2 = 10

    // todo! - mark unfinished code
    // todo!("implement this later");

    // unreachable! - mark unreachable code
    // unreachable!("this should never happen");
}
```

### Procedural Macros

There are three types:

1. **Custom derive macros** - Add functionality to structs/enums

```rust
#[derive(Debug, Clone, PartialEq)]
struct Point {
    x: i32,
    y: i32,
}
```

2. **Attribute-like macros** - Create custom attributes

```rust
#[route(GET, "/")]
fn index() { }
```

3. **Function-like macros** - Look like function calls

```rust
let sql = sql!(SELECT * FROM posts WHERE id=1);
```

### Display and Debug Traits

```rust
use std::fmt::{Display, Formatter, Result};

struct User {
    name: String,
    age: u32,
}

// Implement Display for user-friendly output
impl Display for User {
    fn fmt(&self, f: &mut Formatter) -> Result {
        write!(f, "{} ({} years old)", self.name, self.age)
    }
}

// Or use derive for Debug
#[derive(Debug)]
struct Point {
    x: i32,
    y: i32,
}

fn main() {
    let user = User {
        name: String::from("Alice"),
        age: 30,
    };

    println!("{}", user);    // Display: Alice (30 years old)

    let point = Point { x: 1, y: 2 };
    println!("{:?}", point);  // Debug: Point { x: 1, y: 2 }
    println!("{:#?}", point); // Pretty debug (multiline)
}
```

### Expanding Macros

To see what macros expand to:

```bash
cargo install cargo-expand
cargo expand
```

---

## Common Collections

### Vectors

```rust
fn main() {
    // Create
    let mut v: Vec<i32> = Vec::new();
    let v2 = vec![1, 2, 3];

    // Add elements
    v.push(1);
    v.push(2);
    v.push(3);

    // Access elements
    let third = &v[2];       // Panics if out of bounds
    let third = v.get(2);    // Returns Option<&T>

    // Iterate
    for i in &v {
        println!("{}", i);
    }

    // Iterate and mutate
    for i in &mut v {
        *i += 10;
    }

    // Remove
    let last = v.pop();  // Returns Option<T>
}
```

### Hash Maps

```rust
use std::collections::HashMap;

fn main() {
    let mut scores = HashMap::new();

    // Insert
    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Yellow"), 50);

    // Access
    let team_name = String::from("Blue");
    let score = scores.get(&team_name);  // Returns Option<&V>

    // Iterate
    for (key, value) in &scores {
        println!("{}: {}", key, value);
    }

    // Insert only if key doesn't exist
    scores.entry(String::from("Red")).or_insert(25);

    // Update based on old value
    let text = "hello world wonderful world";
    let mut word_count = HashMap::new();
    for word in text.split_whitespace() {
        let count = word_count.entry(word).or_insert(0);
        *count += 1;
    }
}
```

### Strings

```rust
fn main() {
    // Create
    let mut s = String::new();
    let s = "initial contents".to_string();
    let s = String::from("initial contents");

    // Concatenate
    let s1 = String::from("Hello, ");
    let s2 = String::from("world!");
    let s3 = s1 + &s2;  // s1 is moved, s2 is borrowed

    // format! macro (doesn't take ownership)
    let s1 = String::from("tic");
    let s2 = String::from("tac");
    let s3 = String::from("toe");
    let s = format!("{}-{}-{}", s1, s2, s3);

    // Iterate over characters
    for c in "hello".chars() {
        println!("{}", c);
    }

    // Iterate over bytes
    for b in "hello".bytes() {
        println!("{}", b);
    }
}
```

---

## Additional Resources

- [The Rust Programming Language Book](https://doc.rust-lang.org/book/)
- [Rust by Example](https://doc.rust-lang.org/rust-by-example/)
- [Rustlings Exercises](https://github.com/rust-lang/rustlings)
- [Rust Standard Library Docs](https://doc.rust-lang.org/std/)
- [Rust Playground](https://play.rust-lang.org/)