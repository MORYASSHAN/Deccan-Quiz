export const quizData = [
    {
        category: "HTML",
        questions: [
            {
                id: 1,
                question: "What does HTML stand for?",
                options: [
                    "Hyper Text Markup Language",
                    "Home Tool Markup Language",
                    "Hyperlinks and Text Markup Language",
                    "Hyper Tool Markup Language",
                ],
                answer: "Hyper Text Markup Language",
            },
            {
                id: 2,
                question: "Who is making the Web standards?",
                options: [
                    "Mozilla",
                    "Microsoft",
                    "The World Wide Web Consortium",
                    "Google",
                ],
                answer: "The World Wide Web Consortium",
            },
            {
                id: 3,
                question: "Choose the correct HTML element for the largest heading:",
                options: ["<h6>", "<heading>", "<h1>", "<head>"],
                answer: "<h1>",
            },
            {
                id: 4,
                question: "What is the correct HTML element for inserting a line break?",
                options: ["<lb>", "<br>", "<break>", "<newline>"],
                answer: "<br>",
            },
            {
                id: 5,
                question: "What is the correct HTML for adding a background color?",
                options: [
                    "<body style=\"background-color:yellow;\">",
                    "<background>yellow</background>",
                    "<body bg=\"yellow\">",
                    "<body style=\"bg-color:yellow;\">",
                ],
                answer: "<body style=\"background-color:yellow;\">",
            },
        ],
    },
    {
        category: "CSS",
        questions: [
            {
                id: 1,
                question: "What does CSS stand for?",
                options: [
                    "Creative Style Sheets",
                    "Cascading Style Sheets",
                    "Computer Style Sheets",
                    "Colorful Style Sheets",
                ],
                answer: "Cascading Style Sheets",
            },
            {
                id: 2,
                question: "Where in an HTML document is the correct place to refer to an external style sheet?",
                options: [
                    "In the <body> section",
                    "At the end of the document",
                    "In the <head> section",
                    "In the <footer> section",
                ],
                answer: "In the <head> section",
            },
            {
                id: 3,
                question: "Which HTML tag is used to define an internal style sheet?",
                options: ["<css>", "<script>", "<style>", "<design>"],
                answer: "<style>",
            },
            {
                id: 4,
                question: "Which property is used to change the background color?",
                options: ["color", "bgcolor", "background-color", "bg-color"],
                answer: "background-color",
            },
            {
                id: 5,
                question: "Which CSS property is used to change the text color of an element?",
                options: ["fgcolor", "color", "text-color", "font-color"],
                answer: "color",
            },
        ],
    },
    {
        category: "JavaScript",
        questions: [
            {
                id: 1,
                question: "Inside which HTML element do we put the JavaScript?",
                options: ["<javascript>", "<scripting>", "<script>", "<js>"],
                answer: "<script>",
            },
            {
                id: 2,
                question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
                options: [
                    "<script src=\"xxx.js\">",
                    "<script href=\"xxx.js\">",
                    "<script name=\"xxx.js\">",
                ],
                answer: "<script src=\"xxx.js\">",
            },
            {
                id: 3,
                question: "How do you write 'Hello World' in an alert box?",
                options: [
                    "msg('Hello World');",
                    "alertBox('Hello World');",
                    "msgBox('Hello World');",
                    "alert('Hello World');",
                ],
                answer: "alert('Hello World');",
            },
            {
                id: 4,
                question: "How do you create a function in JavaScript?",
                options: [
                    "function:myFunction()",
                    "function = myFunction()",
                    "function myFunction()",
                ],
                answer: "function myFunction()",
            },
            {
                id: 5,
                question: "How do you call a function named 'myFunction'?",
                options: [
                    "call function myFunction()",
                    "call myFunction()",
                    "myFunction()",
                ],
                answer: "myFunction()",
            },
        ],
    },
    {
        category: "React",
        questions: [
            {
                id: 1,
                question: "What is a React component?",
                options: [
                    "A function or class that accepts input and returns a React element",
                    "A CSS file",
                    "A database query",
                    "An HTML tag",
                ],
                answer: "A function or class that accepts input and returns a React element",
            },
            {
                id: 2,
                question: "What is JSX?",
                options: [
                    "JavaScript XML",
                    "Java Syntax Extension",
                    "JSON Xchange",
                    "JavaScript Xhtml",
                ],
                answer: "JavaScript XML",
            },
            {
                id: 3,
                question: "How do you handle state in a functional component?",
                options: ["useState hook", "this.state", "setState", "useStatus"],
                answer: "useState hook",
            },
            {
                id: 4,
                question: "What is the virtual DOM?",
                options: [
                    "A lightweight copy of the real DOM",
                    "A video game",
                    "A browser extension",
                    "A server-side technology",
                ],
                answer: "A lightweight copy of the real DOM",
            },
            {
                id: 5,
                question: "Which hook is used for side effects?",
                options: ["useEffect", "useSideEffect", "useLifecycle", "useAuRevoir"],
                answer: "useEffect",
            },
        ],
    },
];
