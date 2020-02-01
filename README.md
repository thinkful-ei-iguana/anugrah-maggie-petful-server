# Pawsibilities
Petful assignment, built by Anugrah Lambogo and Maggie McClellan

Cat and dog lovers, gather 'round! The newest member of your family can't wait to meet you. Join the queue of hopeful adopters, and when it's your turn, click on a dog or cat to select the pet you'd like to take home.

## Check Pawsibilities out for yourself!
[Live app](https://pawsibilities-app.now.sh/ "Pawsibilities")
[GitHub repository (client)](https://github.com/thinkful-ei-iguana/anugrah-maggie-petful-client "Pawsibilities client repo")

## Technology used

**Front-End:** *ReactJS | CSS*

**Back-End:** *NodeJS | ExpressJS*

**Testing:** *Mocha | Chai*

## API Documentation

| **HTTP Verb** | **Path**                           | **Used for**         |
| --------- |:--------------------------------------:| --------------------:|
| GET       | /cats | return all available cats     |
| GET       | /dogs  | return all available dogs    |
| GET       | /humans  | return all humans in line to adopt    |
| DELETE  | /cats   | remove dog from front of line (adds same dog to the back of the line) |
| DELETE | /dogs | remove dog from front of line (adds same dog to the back of the line) |
| DELETE | /humans | remove human from the front of the line (adds to the back of line)|
| POST | /humans  | adds user to the back of the line  |


