/* Program Data

  in this file you can declare variables to store important data for your program
  the data can only be primitives, objects or arrays
  do not store dom elements in these variables!!!!

  these variables will be imported by your handlers when necessary
    not by your logic
    not by your listeners
*/

export const quizData = {
  currentQuestionIndex: 0,
  // the questions in the quiz
  questions: [
    {
      text:
        'Which of the following data types is not a primitive type in JavaScript?',
      answers: {
        a: 'String',
        b: 'Number',
        c: 'Object',
      },
      correct: 'c',
      selected: null,
      links: [
        {
          text: 'javascript.info',
          href: 'https://javascript.info/variables',
        },
        {
          text: 'Tyler McGinnis',
          href: 'https://ui.dev/var-let-const/',
        },
      ],
    },
    {
      text:
        'Which of the following methods is used to convert a JSON object to a string in JavaScript?',
      answers: {
        a: 'JSON.parse()',
        b: 'JSON.stringify()',
        c: 'JSON.toString()',
        d: 'JSON.convert()',
      },
      correct: 'b',
      selected: null,
      links: [
        {
          text: 'javascript.info',
          href: 'https://javascript.info/types#type-typeof',
        },
        {
          text: 'MDN',
          href:
            'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof',
        },
      ],
    },
    {
      text:
        'Which of the following statements about the scope of var, let, and const in JavaScript is true?',
      answers: {
        a: 'var is function-scoped, while let and const are block-scoped',
        b: 'var and let are both block-scoped, while const is function-scoped',
        c: 'let and const are function-scoped, while var is block-scoped',
        d: 'var, let, and const are all block-scoped',
      },
      correct: 'a',
      selected: null,
      links: [
        {
          text: 'javascript.info',
          href: 'https://javascript.info/types#type-typeof',
        },
        {
          text: 'MDN',
          href:
            'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof',
        },
      ],
    },
    {
      text:
        'Which method is used to round a number to the nearest integer in JavaScript?',
      answers: {
        a: 'Math.round()',
        b: 'Math.floor()',
        c: 'Math.ceil()',
        d: 'Math.random()',
      },
      correct: 'a',
      selected: null,
      links: [
        {
          text: 'javascript.info',
          href: 'https://javascript.info/types#type-typeof',
        },
        {
          text: 'MDN',
          href:
            'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof',
        },
      ],
    },
    {
      text: 'In JavaScript, what does the === operator compare?',
      answers: {
        a: 'Values only',
        b: 'Values and types',
        c: 'References only',
        d: 'Memory addresses',
      },
      correct: 'b',
      selected: null,
      links: [
        {
          text: 'javascript.info',
          href: 'https://javascript.info/types#type-typeof',
        },
        {
          text: 'MDN',
          href:
            'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof',
        },
      ],
    },
    {
      text:
        'Which method is used to remove whitespace from both ends of a string in JavaScript?',
      answers: {
        a: 'trim()',
        b: 'strip()',
        c: 'cut()',
        d: 'slice()',
      },
      correct: 'a',
      selected: null,
      links: [
        {
          text: 'javascript.info',
          href: 'https://javascript.info/types#type-typeof',
        },
        {
          text: 'MDN',
          href:
            'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof',
        },
      ],
    },
    {
      text:
        'Which of the following is used to handle exceptions in JavaScript?',
      answers: {
        a: 'catch',
        b: 'error',
        c: 'exception',
        d: 'try-catch',
      },
      correct: 'd',
      selected: null,
      links: [
        {
          text: 'javascript.info',
          href: 'https://javascript.info/types#type-typeof',
        },
        {
          text: 'MDN',
          href:
            'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof',
        },
      ],
    },
    {
      text:
        'Which of the following methods adds a new element to the end of an array?',
      answers: {
        a: 'push()',
        b: 'pop()',
        c: 'shift()',
        d: 'unshift()',
      },
      correct: 'a',
      selected: null,
      links: [
        {
          text: 'javascript.info',
          href: 'https://javascript.info/types#type-typeof',
        },
        {
          text: 'MDN',
          href:
            'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof',
        },
      ],
    },
    {
      text:
        'Which of the following functions is used to call a function after a specified delay in JavaScript?',
      answers: {
        a: 'setInterval()',
        b: 'setTimeout()',
        c: 'delay()',
        d: 'wait()',
      },
      correct: 'b',
      selected: null,
      links: [
        {
          text: 'javascript.info',
          href: 'https://javascript.info/types#type-typeof',
        },
        {
          text: 'MDN',
          href:
            'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof',
        },
      ],
    },
    {
      text:
        'Which of the following is the correct way to check if a variable x is an array in JavaScript?',
      answers: {
        a: 'x.isArray()',
        b: 'Array.isArray(x)',
        c: 'x.type() === "array"',
        d: ' typeof x === "array"',
      },
      correct: 'b',
      selected: null,
      links: [
        {
          text: 'javascript.info',
          href: 'https://javascript.info/types#type-typeof',
        },
        {
          text: 'MDN',
          href:
            'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof',
        },
      ],
    },
  ],
};
