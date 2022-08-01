# Liskov substitution principle
Typescript exercise for the BeCode webdevelopment course. Improved the old typescript file (also in this repository) based on SOLID's Liskov Substitution principle.<br>
Link: https://jelle-vdp.github.io/typescript-liskov-substitution-principle/

## About LSP
"Objects in a program should be replaceable with instances of their subtypes without altering the correctness of that program." See also [design by contract](https://en.wikipedia.org/wiki/Design_by_contract).

### Polymorphism
You might already be aware of Polymorphism, but just to remind you, here is the short summary:
If 2 different classes use **the same interface**, so they have the same function names: the code that uses this class does not care about which one class it receives.
In short: When two objects have the same interface, they are functionally interchangeable = polymorphism.

## Your mission
Look at the old.ts file and open the index.html file, refactor the Discount class in 3 different classes with the same interface "VariableDiscount" & "FixedDiscount" & "NoDiscount"

### Discuss
Do you understand what the use is of having the class NoDiscount? This prevents us from having to write extra if-statements inside product to check if we actually have a Discount dependency. It might look strange but these null or void classes are very common in a lot of popular libraries!
