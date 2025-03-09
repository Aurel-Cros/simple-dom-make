# Simple DOM builder
Lightweight, no headache JSON to DOM utility.

## What is does
Feed it a JS object, get a DOM element back.

## What is doesn't
Replace a templating engine, or any kind of state management. This was never meant to replace React or anything.

## Why use it ?
No config, lightweight, and does the heavy lifting for building a DOM from JS.

Nice to use for vanilla JS websites that need to remain nice and simple.

## Usage

### Most basic
```js
import DomTreeBuilder from 'simple-dom-make';

// Get your root element
const rootElement = document.querySelector("#root");

// Build the inside as an object literal
const tree = {
    tag: "div",
    attributes: {
        "class": "container"
    },
    children: [
        {
            tag:"p",
            content: "A text paragraph"
        },
        {
            tag: "p",
            children: [
                {
                    tag: "TEXTNODE",
                    content: "The start of this phrase, "
                },
                {
                    tag: "b",
                    content: "followed by bold words"
                },
                {
                    tag: "TEXTNODE",
                    content: " to make a statement."
                }
            ]
        }
    ]
}
// Tada.
rootElement.append(DomTreeBuilder.make(tree));
```
This would output the following HTML in your browser :
```html
<div class="container">
    <p>A text paragraph</p>
    <p>The start of this phrase, <b>followed by bold words</b> to make a statement."</p>
</div>
```


### Dynamic
Use any kind of logic to build your tree.
```js
const users = [
    {
        id: 35,
        name: "John Doe"
    },
    
    {
        id: 53,
        name: "Jane Don't"
    }
]

const usersTree = {
    tag: "div",
    attributes: {
        "class": "container"
    },
    children: users.map(user => ({
        tag: "div",
        attributes: {
            "class": "card",
            "data-user-id": user.id
        },
        children: [
            {
                tag: "h4",
                content: user.name
            }
        ]
    }))
}
rootElement.append(DomTreeBuilder.make(usersTree));
```
This would output the following HTML in your browser :
```html
<div class="container">
    <div class="card" data-user-id="35">
        <h4>John Doe</h4>
    </div>
    <div class="card" data-user-id="53">
        <h4>Jane Don't</h4>
    </div>
</div>
```

## The JS object in details
What you can feed the make method with.
| Property                | Type   | Note                                                                                          |
| ----------------------- | ------ | --------------------------------------------------------------------------------------------- |
| tag                     | string | Should be an HTML tag (a, abbr, div...) or "TEXTNODE" if you only want to give it plain text. |
| attributes *(optional)* | object | Key value pairs, where the key is the attribute name, and the value its value.                |
| content *(optional)*    | string | Text content of the element - shortcut for putting a TEXTNODE as a child element              |
| children *(optional)*   | array  | An array of that same structure                                                               |