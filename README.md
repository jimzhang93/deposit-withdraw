Built using React-Redux and designed with Semantic UI.

Users are not allowed to deposit a non-integer with more than 2 decimal places and a string containing anything other than a "." or the digits 0 through 9. The value must be larger than 0 for both deposit and withdraw and the value cannot be larger than the account balance for withdraw.

I attempted to write tests for my React components using enzyme but I could not manage to get it to work with webpack as I've never written tests for the front-end before. They are located in the tests.js file. If I had more time available, I would have completed the tests and also added pagination for the transactions to accommodate a larger list. 
