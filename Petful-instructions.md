---
title: 'Challenge: Petful'
author: Thinkful
team: grading
uuid: ae5c8a07-1bb2-4bb5-8d4d-df60afc40f54
---

**Objective:** By the end of this checkpoint, you can implement data structures and algorithms in a web app.

In this checkpoint, we'll bring together the concepts you've learned in this module and apply them to building web apps.

## Data Structure and Algorithms: Full Stack Project

You've been asked to create a site for an animal shelter which allows adoption of cats and dogs. These are the only 2 animals allowed in the shelter. The adoption process works strictly on a "First-In, First-Out" basis. The FIFO is based on the animals that came to the shelter first. People can adopt a cat, or a dog, or both, but they may only adopt the animal that came to the shelter first is the one to be adopted first. In addition, people who wants to adopt are also put in a Queue so they can adopt when its their turn.  

If you’re the sort of person who likes a working example, you can see [the working app](....). Understand that your app does not have to look like this one...this is just an example. 


### User stories


##### user story #1: 
```
As a pet lover, I want to go to the FIFO pet adoption site so that I can get more information about the adoption process

Accesptance criteria

When I type the url of the FIFO adoption agency on my browser

I am taken to the site
The site has a description of the adoption process
It has a meaningful picture that matches its description
A button indicating that I can start the adoption process

```

##### user story #2: 
```
As a user interested in adopting pets, I want to get more information on the pet so that I can make an informed decision

Accesptance criteria

When I go to the adoption page 

I am provided the imformation of pet such as:
* an image of the pet;
* a physical description of the pet;
* its name, sex, age, and breed; and
* a story of its journey to the shelter.

```

##### user story #3: 
```
As a user interested in adopting pets, I want to have a way to clearly see the pet(s) that I can adopt 
so that I am not distracted by other pets that are not on the line for adoption

Accesptance criteria

When I go to the adoption page I should be able to only see the pet that is next in line to be adopted. 
If there are other pets in line I could see them but I should not be able to adopt them other than the one next in line to be adopted.
```

##### user story #4: 
```
As a user interested in adopting pets, I want to know where I am on line so I know how long I have to wait

Accesptance criteria

When I go to the adoption page, I should be able to see my place in line and anyone else who is on the line before me.
I should not be able to start the adoption process unless its my turn. 

```

##### user story #5: 
```
As a user interested in adopting pets, I want to be able to see the pets that are being adopted by other pet lovers and removed from the shelter 
so that I know that the pet I am interested in may no longer be available for adoption

Accesptance criteria

When I go to the adoption page, 

I should be able to see my place in line and anyone else who is in line before me.
I should not be able to start the adoption process unless its my turn. 
```


## Helpful starting point

This app will use 2 distinct repositories: 1 for the client, and 1 for the server. 
* Create the parent directory for your app on your local machine: `mkdir Petful`.
* Move into the directory: `cd Petful`.

#### Set up the server    

* Clone the server template repository:
  ```js
  git clone https://github.com/tparveen/DSA-Petful 
  ```
* Install the dependencies: `npm install`.
* Install `npm-check-updates` with `npm i -g npm-check-updates`.
* Run `ncu` to see the diff in the version numbers in your `package.json`.
* Run `ncu -u` to apply the new version numbers.
* Run `npm i` to install all your new dependencies.
* Create a new repo called `petful-server` on GitHub
* You can now `git push` to the `origin master` branch to save this repo on your GitHub.

#### Set up the client

* Move back to the project directory: `cd ..`.
* Use `create-react-app` for your client:
  ```js
  npm install -g create-react-app && create-react-app petful-client/
  ```
* Move into the client directory: `cd petful-client`
* To execute the create-react-app script, use the command: ```js npm start``` 
* Create an `.eslintrc` file that uses `create-react-app`'s preset:
  ```js
  echo '{"extends":"react-app"}' >> .eslintrc`
  ```
* Initialize a git repo
* Create a new repo on GitHub called `petful-client` and commit your changes to github
* Push your changes up to GitHub

#### Create and test API endpoints

Your app should be able to show us the cat or dog that has been in the shelter the longest, and also be able to remove an animal from the shelter after it has been adopted. This will require `GET`ing the pet information to show and and `DELETE`ing, the pet from the shelter when it is adopted.

##### Getting an animal

* In the server add a `GET` endpoint at `api/cat` which returns the following cat information as JSON:
``` javascript
  {
    imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg', 
    imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
    name: 'Fluffy',
    sex: 'Female',
    age: 2,
    breed: 'Bengal',
    story: 'Thrown on the street'
  }
```
* Run the server: `npm start`.
* Go to `http://localhost:8080/api/cat` and look at your cat! 
* Now add another `GET` endpoint at `api/dog` which returns a dog as JSON. You can use the following information: 
``` javascript
  {
    imageURL: 'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
    imageDescription: 'A smiling golden-brown golden retreiver listening to music.',
    name: 'Zeus',
    sex: 'Male',
    age: 3,
    breed: 'Golden Retriever',
    story: 'Owner Passed away'
  }
```
* Go to `http://localhost:8080/api/dog` and say "hi" to your dog! 


#### Other requirements

* Use a Queue data struture that is implemented with either a singly linked list or doubly linked list.
* Deploy your server using Zeit
* Deploy your client using heroku
* Test the functionality of your code often! Make incremental changes and see that they're working in the browser before you move on. 
* Apply the same approach to accessibility. Resolve any accesibility warnings your linter generates, and run aXe when you write new markup and styles. 

#### Deploy your server


#### Deploy your client


#### Document your app

Now that all the core features of your app are in place, you should have a pretty good idea of how you would explain the app to a user. Do that! Add some copy to your client's dashboard that gives your app a name and explains what its purpose is and how to use it. You could even put this introductory content into its own component on the dashboard to make it easier to show and hide later. 

Both repos in this project should have `README.md` files. 
* Put all your team members names on the README.md for both client and server
* The client's README should reflect the introduction present in your app, and link to the live app.
  * Include screenshots if you can!
* The server's README should explain how other developers would consume (or use) your API, and provide example requests and responses. 
* _Both_ READMEs should also explain the tech stacks used in the repo, for the benefit of developers who might want to work on your project.


### Look beyond deployment

Now that your app is deployed, you have an opportunity to make some improvements.

##### Allow users to add animals

* Add functionality to your backend and frontend which allows the shelter to add a new cat or dog to its respective queue. Use a form and all of its appropriate tags to ensure keyboard usability and general accessibility.


